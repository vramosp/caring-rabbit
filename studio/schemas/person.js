export default {
    "type": "document",
    "name": "person",
    "title": "Person",
    "fields": [
        {
            "type": "string",
            "name": "first_name",
            "title": "First Name",
            "validation": Rule => Rule.required()
        },
        {
            "type": "string",
            "name": "last_name",
            "title": "Last Name",
            "validation": null
        },
        {
            "type": "image",
            "name": "photo",
            "title": "Image",
            "validation": null
        },
        {
            "type": "string",
            "name": "photo_alt",
            "title": "Image Alt Text",
            "validation": null
        },
        {
            "type": "markdown",
            "name": "bio",
            "title": "Bio",
            "validation": null
        },
        {
            "type": "string",
            "name": "link",
            "title": "Link",
            "description": "The link to the author page, e.g. \"blog/author/john-doe\"",
            "validation": null
        }
    ],
    "preview": {
        "select": {
            "title": "first_name"
        }
    }
}
