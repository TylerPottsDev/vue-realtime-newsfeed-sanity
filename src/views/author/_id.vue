<template>
	<main class="post-page">
		<section v-if="author" class="container mx-auto p-4">
			<div class="flex items-center mb-4">
				<img 
					:src="CreateURL(author.avatar)" 
					class="inline-block rounded-full w-16 h-16 mr-4"  />

				<h1 class="text-gray-500 text-2xl uppercase font-bold">
					{{ author.full_name }}
				</h1>
			</div>

			<p class="text-gray-500 mb-8">{{ author.short_bio }}</p>

			<div class="grid gap-4">
				<PostCard 
					v-for="(post, i) in posts" 
					:key="i" 
					:post="post" />
			</div>
		</section>
	</main>
</template>

<script>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import sanity from '../../client'
import imageUrlBuilder from '@sanity/image-url'

const builder = imageUrlBuilder(sanity)

import PostCard from '../../components/PostCard'

export default {
	components: {
		PostCard
	},
	setup () {
		const route = useRoute()
		const id = ref(route.params.id)
		const author = ref(null)
		const posts = ref([])

		const CreateURL = (source, width = 300, height = 300) => {
			return builder.image(source).width(width).height(height).url()
		}

		onMounted(() => {
			sanity.getDocument(id.value).then(data => {
				author.value = data

				const query = `*[_type == "post" && author._ref == $authorId] {_id, title, excerpt, image, _createdAt, author->{full_name, avatar}} | order(_createdAt desc)`

				const params = {
					authorId: data._id
				}

				sanity.fetch(query, params).then(data => {
					console.log(data);
					posts.value = data
				})


			})
		})

		return {
			author,
			posts,
			CreateURL
		}
	}
}
</script>

<style>

</style>