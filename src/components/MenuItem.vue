<template>
	<router-link 
		:to="to" 
		class="flex items-center p-4 border-r-4 border-transparent text-gray-100 hover:text-white hover:bg-gray-900">
		<slot />
	</router-link>
</template>

<script>
export default {
	props: ["to"]
}
</script>

<style scoped>
.router-link-exact-active {
	@apply border-green-500 bg-gray-900;
}
</style>