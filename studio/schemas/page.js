export default {
    "type": "document",
    "name": "page",
    "title": "Page",
    "fields": [
        {
            "type": "string",
            "name": "title",
            "title": "Title",
            "description": "The title of the page",
            "validation": Rule => Rule.required()
        },
        {
            "type": "slug",
            "name": "slug",
            "title": "Slug",
            "description": "The slug of this page relative to site root. For example, the site root page would be '/', and subpage would be 'blog/category/news'",
            "validation": Rule => Rule.required(),
            "options": {
                "source": "title"
            },
        },
        {
            "type": "string",
            "name": "excerpt",
            "title": "Excerpt",
            "description": "The excerpt of the page displayed in meta data",
            "validation": null
        },
        {
            "type": "markdown",
            "name": "content",
            "title": "Content",
            "description": "Page content",
            "validation": null
        }
    ],
    "preview": {
        "select": {
            "title": "title"
        }
    }
}
