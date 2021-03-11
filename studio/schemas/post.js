export default {
    "type": "document",
    "name": "post",
    "title": "Post",
    "fields": [
        {
            "type": "string",
            "name": "title",
            "title": "Title",
            "description": "The title of the post",
            "validation": Rule => Rule.required()
        },
        {
            "type": "slug",
            "name": "slug",
            "title": "Slug",
            "description": "The slug of this post relative to /blog. For example, setting this field to 'hello' will publish this post under /blog/hello",
            "validation": Rule => Rule.required(),
            "options": {
                "source": "title"
            },
        },
        {
            "type": "date",
            "name": "date",
            "title": "Date",
            "description": "The publish date of the post",
            "validation": Rule => Rule.required()
        },
        {
            "type": "reference",
            "name": "author",
            "title": "Author",
            "description": "The author of the post",
            "validation": null,
            "to": [
                {
                    "type": "person"
                }
            ]
        },
        {
            "type": "array",
            "name": "categories",
            "title": "Categories",
            "description": "The categories of the post",
            "validation": null,
            "of": [
                {
                    "type": "reference",
                    "to": [
                        {
                            "type": "category"
                        }
                    ]
                }
            ]
        },
        {
            "type": "array",
            "name": "tags",
            "title": "Tags",
            "description": "The tags of the post",
            "validation": null,
            "of": [
                {
                    "type": "string"
                }
            ]
        },
        {
            "type": "image",
            "name": "image",
            "title": "Featured Image",
            "description": "The image shown in the blog post and blog feed",
            "validation": null
        },
        {
            "type": "string",
            "name": "image_alt",
            "title": "Featured Image Alt Text",
            "description": "The alt text of the featured image",
            "validation": null
        },
        {
            "type": "string",
            "name": "excerpt",
            "title": "Excerpt",
            "description": "The excerpt of the page displayed in the blog feed and meta data",
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
