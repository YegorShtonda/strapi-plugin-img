# strapi-plugin-img
It's plugin for editing images (resizing / optimization / adding watermarks) in fly.

## Install
`$ npm i strapi-plugin-img`
or
`$ yarn add strapi-plugin-img`

You need to create folder `images` in your public directory.
For example: `your-strapi-project/public/images`

## Usage

### Endpoint
`/img/:your-encoded-edit-settings`

### Settings
Example:

decoded
```json
{
    "image": "your-image.jpeg",
    "webp": false,
    "resize": {
        "width": 1105,
        "height": 450
    },
    "watermark": {
        "image_light": "watermark-light.png",
        "image_dark": "watermark-dark.png",
        "top": 22,
        "left": 900,
        "resize": {
            "width": 170,
            "height": 180,
            "position": "right top",
            "fit": "inside"
        }
    }
}
```

encoded(base64)
`eyJpbWFnZSI6Ii91cGxvYWRzL2ltYWdlc...`

request
`/img/eyJpbWFnZSI6Ii91cGxvYWRzL2ltYWdlcy9vcmln...`