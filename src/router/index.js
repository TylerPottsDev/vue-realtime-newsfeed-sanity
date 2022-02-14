import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
	path: '/authors',
	name: 'Authors',
	component: () => import('../views/Authors.vue'),
  },
  {
	path: '/post/:id',
	name: 'Post',
	component: () => import('../views/post/_id.vue'),
  },
  {
	path: '/author/:id',
	name: 'Author',
	component: () => import('../views/author/_id.vue'),
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.afterEach((to, from) => {
	// Only run if you are coming from a route
	if (from.name) { 
		document.documentElement.scrollTop = 0
		
		// Close menu after navigation
		store.dispatch('CloseMenu')
	}
})


export default router
