<template>
	<header class="flex w-full items-center justify-center p-4">
		<!-- Hamburger -->
		<div 
			:class="`menu-toggle relative z-50 ${
				$store.state.menu_is_active 
				? 'is-active' 
				: ''
			}`" 
			@click="$store.dispatch('ToggleMenu')">
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