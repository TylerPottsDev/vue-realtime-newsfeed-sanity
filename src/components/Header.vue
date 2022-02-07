<template>
	<header class="relative flex w-full items-center justify-center p-4">
			<!-- Hamburger -->
			<div 
				v-if="$store.getters.isAuthenticated"
				:class="`menu-toggle ${
					$store.state.menu_is_active 
					? 'is-active' 
					: ''
				}`" 
				@click="$store.dispatch('toggleMenu')">
				<div class="hamburger">
					<span></span>
				</div>
			</div>
			<!-- End of Hamburger -->

			<!-- Title -->
			<h1 class="text-center text-2xl uppercase font-light tracking-widest">Sanity News</h1>
			<!-- End of Title -->
		</header>
</template>