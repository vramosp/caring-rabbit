export default {
    "type": "document",
    "name": "advanced",
    "title": "Advanced Page",
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
            "type": "array",
            "name": "sections",
            "title": "Sections",
            "description": "Page sections",
            "validation": null,
            "of": [
                {
                    "type": "blog_feed_section"
                },
                {
                    "type": "contact_section"
                },
                {
                    "type": "content_section"
                },
                {
                    "type": "cta_section"
                },
                {
                    "type": "features_section"
                },
                {
                    "type": "hero_section"
                },
                {
                    "type": "team_section"
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
