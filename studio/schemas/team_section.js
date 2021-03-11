export default {
    "type": "object",
    "name": "team_section",
    "title": "Team Section",
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
            "name": "team",
            "title": "Team",
            "validation": null,
            "of": [
                {
                    "type": "reference",
                    "to": [
                        {
                            "type": "person"
                        }
                    ]
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
