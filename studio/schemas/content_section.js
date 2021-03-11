export default {
    "type": "object",
    "name": "content_section",
    "title": "Content Section",
    "fields": [
        {
            "type": "string",
            "name": "title",
            "title": "Title",
            "description": "The title of the section",
            "validation": null
        },
        {
            "type": "markdown",
            "name": "content",
            "title": "Content",
            "description": "The text content of the section",
            "validation": null
        }
    ],
    "preview": {
        "select": {
            "title": "title"
        }
    }
}
