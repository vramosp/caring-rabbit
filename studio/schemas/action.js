export default {
    "type": "object",
    "name": "action",
    "title": "Action",
    "fields": [
        {
            "type": "string",
            "name": "label",
            "title": "Label",
            "validation": Rule => Rule.required()
        },
        {
            "type": "string",
            "name": "url",
            "title": "URL",
            "validation": Rule => Rule.required()
        },
        {
            "type": "string",
            "name": "style",
            "title": "Style",
            "initialValue": "link",
            "validation": Rule => Rule.required(),
            "options": {
                "list": [
                    "link",
                    "primary",
                    "secondary"
                ]
            }
        },
        {
            "type": "boolean",
            "name": "new_window",
            "title": "Open in new tab/window",
            "validation": null
        },
        {
            "type": "boolean",
            "name": "no_follow",
            "title": "No follow",
            "description": "Add rel=\"nofollow\" attribute to the link",
            "validation": null
        }
    ],
    "preview": {
        "select": {
            "title": "label"
        }
    }
}
