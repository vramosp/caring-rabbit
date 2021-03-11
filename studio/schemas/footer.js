export default {
    "type": "object",
    "name": "footer",
    "title": "Footer Configuration",
    "fields": [
        {
            "type": "boolean",
            "name": "has_nav",
            "title": "Enable Navigation Menu",
            "description": "Display the secondary navigation menu in the footer",
            "initialValue": true,
            "validation": null
        },
        {
            "type": "array",
            "name": "nav_links",
            "title": "Navigation Menu Links",
            "description": "List of navigation links in footer",
            "validation": null,
            "of": [
                {
                    "type": "action"
                }
            ]
        },
        {
            "type": "boolean",
            "name": "has_social",
            "title": "Enable Social Links",
            "description": "Display social links in the footer",
            "initialValue": true,
            "validation": null
        },
        {
            "type": "array",
            "name": "social_links",
            "title": "Social Links",
            "description": "The list of social links displayed in the footer",
            "validation": null,
            "of": [
                {
                    "type": "action"
                }
            ]
        },
        {
            "type": "string",
            "name": "content",
            "title": "Footer Content",
            "description": "The copyright text displayed in the footer",
            "validation": null
        },
        {
            "type": "array",
            "name": "links",
            "title": "Links",
            "description": "A list of links displayed in the footer",
            "validation": null,
            "of": [
                {
                    "type": "action"
                }
            ]
        }
    ],
    "preview": {
        "select": {
            "title": "content"
        }
    }
}
