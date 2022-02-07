<template>
	<main class="py-16 px-8">
		<section class="container mx-auto">

			<!-- Login form -->
			<form
				v-if="isLogin"
				@submit.prevent="Login"
				class="flex justify-center">

				<div class="bg-gray-600 p-4 rounded-lg w-full max-w-lg">
					<h2 class="text-gray-400 text-lg font-bold uppercase mb-4">Login</h2>

					<div>
						<label class="block mb-4">
							<input 
								type="text"
								v-model="username"
								placeholder="Email address"
								class="py-2 px-4 block w-full rounded text-gray-700 text-lg outline-none focus:border-gray-800" />
						</label>

						<label class="block mb-4">
							<input 
								type="password"
								v-model="password"
								placeholder="Password"
								class="py-2 px-4 block w-full rounded text-gray-700 text-lg outline-none focus:border-gray-800" />
						</label>
					</div>

					<p class="text-red-500" v-if="error">{{ error }}</p>

					<div class="flex justify-between">
						<p class="text-gray-400 italic">
							Need an account? <button class="text-yellow-500" @click="ToggleForms">Sign up</button>
						</p>

						<input 
							type="submit" 
							value="Login"
							class="block py-2 px-4 bg-yellow-500 rounded text-lg font-bold hover:bg-yellow-600 cursor-pointer duration-300" />
					</div>
				</div>
			</form>
			<!-- Login form end -->
			
			<!-- Register form -->
			<form 
				v-else
				@submit.prevent="Register"
				class="flex justify-center">
				
				<div class="bg-gray-600 p-4 rounded-lg w-full max-w-lg">
					<h2 class="text-gray-400 text-lg font-bold uppercase mb-4">Register</h2>

					<div>
						<label class="block mb-4">
							<input 
								type="text"
								v-model="username"
								placeholder="Email address"
								class="py-2 px-4 block w-full rounded text-gray-700 text-lg outline-none focus:border-gray-800" />
						</label>

						<label class="block mb-4">
							<input 
								type="password"
								v-model="password"
								placeholder="Password"
								class="py-2 px-4 block w-full rounded text-gray-700 text-lg outline-none focus:border-gray-800" />
						</label>

						<label class="block mb-4">
							<input 
								type="password"
								v-model="password_conf"
								placeholder="Confirm Password"
								class="py-2 px-4 block w-full rounded text-gray-700 text-lg outline-none focus:border-gray-800" />
						</label>
					</div>

					<p class="text-red-500" v-if="error">{{ error }}</p>

					<div class="flex justify-between">
						<p class="text-gray-400 italic">
							Already have an account? <button class="text-yellow-500" @click="ToggleForms">Sign in</button>
						</p>

						<input 
							type="submit" 
							value="Register"
							class="block py-2 px-4 bg-yellow-500 rounded text-lg font-bold hover:bg-yellow-600 cursor-pointer duration-300" />
					</div>
				</div>
			</form>
			<!-- Register form end -->

			<div class="flex justify-center mt-8">
				<button class="py-2 px-4 bg-red-500 rounded text-lg font-bold hover:bg-red-600 duration-300" @click="LoginWithGoogle">Login with Google</button>
			</div>
		</section>
	</main>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'

export default {
	name: 'Login',
	setup () {
		const isLogin = ref(true)
		const username = ref('')
		const password = ref('')
		const password_conf = ref('')
		const error = ref('')
		const store = useStore()

		const ToggleForms = () => {
			isLogin.value = !isLogin.value
		}

		const Login = () => {
			try {
				store.dispatch('login', {
					email: username.value,
					password: password.value
				})
			} catch (e) {
				error.value = e.message
			}
		}

		const Register = () => {
			if (password.value !== password_conf.value) {
				error.value = 'Passwords do not match'
				return;
			} else {
				error.value = ''
			}

			try {
				store.dispatch('register', {
					email: username.value,
					password: password.value
				})
			} catch (e) {
				error.value = e.message
			}
		}

		const LoginWithGoogle = () => {
			try {
				store.dispatch('loginWithGoogle')
			} catch (e) {
				error.value = e.message
			}
		}

		return {
			username,
			password,
			password_conf,
			isLogin,
			error,
			ToggleForms,
			Register,
			LoginWithGoogle,
			Login
		}
	},
}
</script>

<style>

</style>