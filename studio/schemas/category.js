export default {
    "type": "document",
    "name": "category",
    "title": "Category",
    "fields": [
        {
            "type": "string",
            "name": "title",
            "title": "Title",
            "validation": Rule => Rule.required()
        },
        {
            "type": "string",
            "name": "link",
            "title": "Link",
            "description": "The link to the category page, e.g. \"blog/category/news\"",
            "validation": null
        }
    ],
    "preview": {
        "select": {
            "title": "title"
        }
    }
}
