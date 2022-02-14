<template>
	<main class="post-page">
		<section v-if="post" class="container mx-auto p-4">
			<img :src="CreateURL(post.image)" class="w-full mb-8">

			<button 
				@click="$router.back()" 
				class="flex items-center text-lg text-green-500 hover:text-green-600 duration-300 mb-4">
				<span class="material-icons text-lg mr-1">keyboard_double_arrow_left</span> Back
			</button>

			<h1 class="text-3xl md:text-5xl mb-8">{{ post.title }}</h1>

			<p class="text-gray-500 italic mb-8">{{ post.excerpt }}</p>

			<p v-html="TextToHTML(post.content)" class="text-lg mb-8"></p>

			<div class="flex items-center mb-4" v-if="author">
				<img 
					:src="CreateURL(author.avatar, 300, 300)" 
					class="inline-block rounded-full w-10 h-10 mr-4"  />

				<h1 class="text-gray-500">
					{{ author.full_name }}
				</h1>
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

export default {
	setup () {
		const route = useRoute()
		const id = ref(route.params.id)
		const post = ref(null)
		const author = ref(null)

		const CreateURL = (source, width = 1280, height = 300) => {
			return builder.image(source).width(width).height(height).url()
		}

		const TextToHTML = (text) => {
			return text.replace(/\n/g, "<br>")
		}

		onMounted(() => {
			sanity.getDocument(id.value).then(data => {
				post.value = data

				sanity.getDocument(data.author._ref).then(data => {
					author.value = data
				})
			})
		})

		return {
			post,
			author,
			CreateURL,
			TextToHTML
		}
	}
}
</script>