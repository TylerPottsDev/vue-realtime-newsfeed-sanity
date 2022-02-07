<template>
  <div class="bg-gray-700 min-h-screen text-white">
    <Header />
    <router-view />
    <ErrorHandler />
  </div>
</template>

<script>
import { onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import Header from './components/Header'
import ErrorHandler from './components/ErrorHandler'

export default {
  name: 'App',
  components: {
    Header,
    ErrorHandler
  },
  setup () {
    const store = useStore()

    onBeforeMount(() => {
      store.dispatch('FetchUser')
    })
  }
}
</script>