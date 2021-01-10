const fs = require('fs')
const md5 = require('md5')
const sharp = require('sharp')
const mime = require('mime-types')
const { getAverageColor } = require('fast-average-color-node')

module.exports = {
  async index(ctx) {
    const inputPath = strapi.config.middleware.settings.public.path
    const outputPath = strapi.config.middleware.settings.public.path + '/images'

    const settingsBase64 = ctx.params.settings
    if (!settingsBase64) return
    const settingsUtf8 = (new Buffer.from(settingsBase64, 'base64')).toString('utf8')
    const settings = JSON.parse(settingsUtf8)

    const fileHash = await md5(settingsBase64)
    const fileMime = '.' + (settings.webp ? 'webp' : settings.image.split('.')[settings.image.split('.').length - 1])
    const fileName = fileHash + fileMime

    const path = `${outputPath}/${fileName}`

    try {
      fs.statSync(path)
      const stream = fs.createReadStream(path)
      const mimeType = mime.lookup(path)
      ctx.response.set('content-type', mimeType)
      ctx.body = stream
    } catch (err) {
      if (err.code === 'ENOENT') {
        const img = await sharp(inputPath + settings.image)

        if (settings.resize) {
          await img.resize(settings.resize)
        }
        if (settings.watermark) {
          console.log(settings.watermark)
          const imgBuffer = await img.jpeg().toBuffer()
          const imgCopy = await sharp(imgBuffer)
          const watermarkBackgroundBuffer = await imgCopy.extract({
            width: settings.watermark.resize.width,
            height: settings.watermark.resize.height,
            left: settings.watermark.left,
            top: settings.watermark.top
          }).jpeg().toBuffer()
          const avarageColor = await getAverageColor(watermarkBackgroundBuffer)
          const watermarkPath = avarageColor.isDark ? settings.watermark.image_light : settings.watermark.image_dark

          const watermarkResize = settings.watermark.resize ? settings.watermark.resize : {
            width: 100,
            height: 100,
            position: 'left top',
            fit: 'inside'
          }

          const watermark = await sharp(inputPath + watermarkPath)
            .resize(watermarkResize)
            .toBuffer()

          const watermarkSettings = {
            input: watermark,
            top: settings.watermark.top ? settings.watermark.top : 20,
            left: settings.watermark.left ? settings.watermark.left : 20
          }
          await img.composite([ watermarkSettings ])
        }
        if (settings.webp) {
          await img.webp( { quality: 90 } )
        }
        if (!settings.webp && (fileMime.toLowerCase() === '.jpg' || fileMime.toLowerCase() === '.jpeg')) {
          await img.jpeg( { quality: 90 } )
        }
        if (!settings.webp && fileMime.toLowerCase() === '.png') {
          await img.png( { quality: 90 } )
        }
        await img.toFile(path)

        const stream = fs.createReadStream(path)
        const mimeType = mime.lookup(path)
        ctx.response.set('content-type', mimeType)
        ctx.body = stream
      }
    }
  },
};
