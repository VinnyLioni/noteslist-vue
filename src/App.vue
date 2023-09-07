<script setup>

</script>

<template>
  <NavBar />
  <div class="container px-2">
    <RouterView />
  </div>
</template>

<script setup>
  import { onMounted } from 'vue'
  import NavBar from './components/layout/NavBar.vue'
  import { useAuthStore } from './store/AuthStore.js'

  const authStore = useAuthStore()

  onMounted(() => {
    authStore.init()
  })

</script>

<style>
  @import 'bulma/css/bulma.min.css';


</style>
