export default {
	title: 'Post',
	name: 'post',
	type: 'document',
	fields: [
		{
			title: 'Title',
			name: 'title',
			type: 'string',
			validation: Rule => [
				Rule.required().min(10).error("Title must be at least 10 characters long"),
				Rule.required().max(50).warning("It's better to use short snappy titles")
			]
		},
		{
			title: 'Author',
			name: 'author',
			type: 'reference',
			to: [{type: 'author'}]
		},
		{
			title: 'Excerpt',
			name: 'excerpt',
			type: 'text',
			validation: Rule => Rule.max(120).error("Excerpt must be less than 120 characters long")
		},
		{
			title: 'Content',
			name: 'content',
			type: 'text'
		},
		{
			title: 'Image',
			name: 'image',
			type: 'image'
		}
	]
}