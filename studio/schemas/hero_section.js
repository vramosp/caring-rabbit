export default {
    "type": "object",
    "name": "hero_section",
    "title": "Hero Section",
    "fields": [
        {
            "type": "string",
            "name": "title",
            "title": "Title",
            "description": "The title of the section",
            "validation": null
        },
        {
            "type": "string",
            "name": "subtitle",
            "title": "Subtitle",
            "description": "The subtitle of the section",
            "validation": null
        },
        {
            "type": "array",
            "name": "actions",
            "title": "Action Buttons",
            "validation": null,
            "of": [
                {
                    "type": "action"
                }
            ]
        },
        {
            "type": "string",
            "name": "align",
            "title": "Align",
            "description": "The alignment of the text content",
            "initialValue": "left",
            "validation": null,
            "options": {
                "list": [
                    "left",
                    "right",
                    "center"
                ]
            }
        },
        {
            "type": "image",
            "name": "image",
            "title": "Image",
            "description": "The image of the section",
            "validation": null
        },
        {
            "type": "string",
            "name": "image_alt",
            "title": "Image Alt Text",
            "description": "The alt text of the image",
            "validation": null
        },
        {
            "type": "string",
            "name": "image_position",
            "title": "Image Position",
            "description": "The position of the image",
            "initialValue": "left",
            "validation": null,
            "options": {
                "list": [
                    "left",
                    "right"
                ]
            }
        },
        {
            "type": "boolean",
            "name": "has_background",
            "title": "Enable section background",
            "validation": null
        },
        {
            "type": "hero_background",
            "name": "background",
            "title": "Background Configuration",
            "validation": null
        }
    ],
    "preview": {
        "select": {
            "title": "title"
        }
    }
}
