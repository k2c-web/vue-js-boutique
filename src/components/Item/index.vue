<template>
  <img :src="p.image" :alt="p.title" />
  <h3>{{ p.title }}</h3>
  <span class="add-to-cart" @click="addToCart(p)">+</span>
</template>

<script>
export default {
  name: 'Item',
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
h3 {
  color: green;
}
</style>
