<template>
	<div class="bg-gray-800 rounded-lg p-4 text-center">
		<img :src="CreateURL(author.avatar, 300, 300)" class="inline-block rounded-full w-32 h-32 mb-4" />
		<h3 class="text-xl font-bold mb-4">{{ author.full_name }}</h3>
		<p class="text-gray-400 mb-4">{{ author.short_bio }}</p>
		<router-link :to="`/author/${author._id}`" class="btn">Profile</router-link>
	</div>
</template>

<script>
import sanity from '../client'
import imageUrlBuilder from '@sanity/image-url'

const builder = imageUrlBuilder(sanity)

export default {
	props: {
		author: {
			type: Object,
			required: true
		}
	},
	setup () {
		const CreateURL = (source, width = 480, height = 320) => {
			return builder.image(source).width(width).height(height).url()
		}

		return {
			CreateURL
		}
	}
}
</script>