export default {
    "type": "object",
    "name": "features_section",
    "title": "Features Section",
    "fields": [
        {
            "type": "string",
            "name": "title",
            "title": "Title",
            "description": "The title of the section",
            "validation": null
        },
        {
            "type": "array",
            "name": "features",
            "title": "Features",
            "validation": null,
            "of": [
                {
                    "type": "feature"
                }
            ]
        }
    ],
    "preview": {
        "select": {
            "title": "title"
        }
    }
}
