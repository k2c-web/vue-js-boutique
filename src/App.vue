<template>
  <Store />
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
//import SandBox from './components/SandBox.vue'
import Store from './components/Store.vue'
export default {
  name: 'App',
  components: {
    Store,
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
