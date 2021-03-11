export default {
    "type": "object",
    "name": "hero_background",
    "title": "Background Configuration",
    "fields": [
        {
            "type": "string",
            "name": "background_color",
            "title": "Background Color",
            "description": "The background color of the section",
            "initialValue": "white",
            "validation": null,
            "options": {
                "list": [
                    "white",
                    "gray",
                    "blue"
                ]
            }
        },
        {
            "type": "image",
            "name": "background_image",
            "title": "Background Image",
            "description": "The image displayed in the background of the section",
            "validation": null
        },
        {
            "type": "number",
            "name": "background_image_opacity",
            "title": "Background Image Opacity",
            "description": "An integer between 0 and 100. A lower value makes the image more transparent.",
            "validation": Rule => Rule.integer()
        },
        {
            "type": "string",
            "name": "background_image_size",
            "title": "Background Image Size",
            "description": "The size of the background image",
            "initialValue": "cover",
            "validation": null,
            "options": {
                "list": [
                    "auto",
                    "contain",
                    "cover"
                ]
            }
        },
        {
            "type": "string",
            "name": "background_image_repeat",
            "title": "Background Image Repeat",
            "description": "Repeat the image to cover the whole area.",
            "initialValue": "no-repeat",
            "validation": null,
            "options": {
                "list": [
                    "repeat",
                    "no-repeat"
                ]
            }
        }
    ]
}
