# strapi-plugin-img
It's plugin for editing images (resizing / optimization / adding watermarks) in fly.

## Install
`$ npm i strapi-plugin-img`
or
`$ yarn add strapi-plugin-img`

## Usage

### Endpoint
`/img/:your-encoded-edit-settings`

### Settings
Example:

decoded
`
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
`

encoded(base64)
`eyJpbWFnZSI6Ii91cGxvYWRzL2ltYWdlcy9vcmlnaW4vbWFpbl9mN2VhZTRmMDVkLmpwZWciLCJ3ZWJwIjpmYWxzZSwicmVzaXplIjp7IndpZHRoIjoxMTA1LCJoZWlnaHQiOjQ1MH0sIndhdGVybWFyayI6eyJpbWFnZV9saWdodCI6bnVsbCwiaW1hZ2VfZGFyayI6Ii91cGxvYWRzL2ltYWdlcy9vcmlnaW4vaW52ZXN0b3Jfc3VwZXJub3ZhXzE2Y2MwYzgwYjMucG5nIiwidG9wIjoyMiwibGVmdCI6OTAwLCJyZXNpemUiOnsid2lkdGgiOjE3MCwiaGVpZ2h0IjoxODAsInBvc2l0aW9uIjoicmlnaHQgdG9wIiwiZml0IjoiaW5zaWRlIn19fQ==`

request
`
/img/eyJpbWFnZSI6Ii91cGxvYWRzL2ltYWdlcy9vcmlnaW4vbWFpbl9mN2VhZTRmMDVkLmpwZWciLCJ3ZWJwIjpmYWxzZSwicmVzaXplIjp7IndpZHRoIjoxMTA1LCJoZWlnaHQiOjQ1MH0sIndhdGVybWFyayI6eyJpbWFnZV9saWdodCI6bnVsbCwiaW1hZ2VfZGFyayI6Ii91cGxvYWRzL2ltYWdlcy9vcmlnaW4vaW52ZXN0b3Jfc3VwZXJub3ZhXzE2Y2MwYzgwYjMucG5nIiwidG9wIjoyMiwibGVmdCI6OTAwLCJyZXNpemUiOnsid2lkdGgiOjE3MCwiaGVpZ2h0IjoxODAsInBvc2l0aW9uIjoicmlnaHQgdG9wIiwiZml0IjoiaW5zaWRlIn19fQ==
`