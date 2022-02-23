<template>
	<main class="post-page">
		<section v-if="post" class="container mx-auto p-4">
			<img :src="CreateURL(post.image, 1280, 300)" class="w-full mb-8">

			<button 
				@click="$router.back()" 
				class="flex items-center text-lg text-green-500 hover:text-green-600 duration-300 mb-4">
				<span class="material-icons text-lg mr-1">keyboard_double_arrow_left</span> Back
			</button>

			<h1 class="text-3xl md:text-5xl mb-8">{{ post.title }}</h1>

			<p class="text-gray-500 italic mb-8">{{ post.excerpt }}</p>

			<p v-html="TextToHTML(post.content)" class="text-lg mb-8"></p>

			<div class="flex items-center mb-4" v-if="post.author">
				<img 
					:src="CreateURL(post.author.avatar, 300, 300)" 
					class="inline-block rounded-full w-10 h-10 mr-4"  />

				<h1 class="text-gray-500">
					{{ post.author.full_name }}
				</h1>
			</div>
		</section>
	</main>
</template>

<script>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import sanity from '../../client'
import { CreateURL, TextToHTML } from '../../utils'

export default {
	setup () {
		const route = useRoute()
		const id = ref(route.params.id)
		const post = ref(null)

		onMounted(() => {
			const query = '*[_type == "post" && _id == $id][0] { ..., author-> }'
			const params = { id: id.value }
			
			sanity.fetch(query, params).then(data => {
				post.value = data
			})
		})

		return {
			post,
			CreateURL,
			TextToHTML
		}
	}
}
</script>