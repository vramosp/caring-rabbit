export default {
    "type": "object",
    "name": "blog_feed_section",
    "title": "Blog Feed Section",
    "fields": [
        {
            "type": "string",
            "name": "title",
            "title": "Title",
            "description": "The title of the section",
            "validation": null
        },
        {
            "type": "boolean",
            "name": "show_recent",
            "title": "Show recent posts",
            "description": "Show the specified number of recent posts. Should not be used with author and category filters.",
            "validation": Rule => Rule.required()
        },
        {
            "type": "number",
            "name": "recent_count",
            "title": "Number of recent posts to show",
            "validation": Rule => Rule.integer()
        },
        {
            "type": "reference",
            "name": "author",
            "title": "Author Filter",
            "description": "Filter posts by an author",
            "validation": null,
            "to": [
                {
                    "type": "person"
                }
            ]
        },
        {
            "type": "reference",
            "name": "category",
            "title": "Category Filter",
            "description": "Filter posts by category",
            "validation": null,
            "to": [
                {
                    "type": "category"
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
