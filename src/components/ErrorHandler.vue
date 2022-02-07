<template>
	<div
		v-if="errors.length > 0"
		class="fixed bottom-8 left-1/2 -translate-x-1/2 max-w-md text-white text-xl">
		<div 
			v-for="(error, i) in errors" 
			:key="i"
			class="bg-red-500 p-4 rounded-2xl"
			@click="() => RemoveError(error)">
			{{ error }}
		</div>
	</div>
</template>

<script>
import { useStore } from 'vuex'

export default {
	computed: {
		errors () {
			return this.$store.getters.errors
		}
	},
	setup () {
		const store = useStore()

		const RemoveError = error => {
			store.dispatch('RemoveError', error)
		}

		return {
			RemoveError
		}
	}
}
</script>