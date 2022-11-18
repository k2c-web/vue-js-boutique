<template>
  <div class="cart-container">
    <h2 @click="this.$emit('closeCart')">
      &#8592; Back
    </h2>

    <ul>
      <li v-for="p in cartItems" :key="p.id">
        <img :src="p.image" :alt="p.title" />
        <h3>{{ p.title }}</h3>
        <span class="remove-icon" @click="this.$emit('removeFromCart', p.id)">
          x
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Cart',
  props: {
    cartItems: Array,
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.cart-container {
  position: fixed;
  background: white;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 0 5vw;
}

h2 {
  cursor: pointer;
}

ul,
li {
  padding: 0;
  margin: 0;
  list-style-type: none;
}

ul {
  display: flex;
  flex-flow: column;
}

li {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 20px;
  margin-bottom: 10px;
  border-bottom: 1px dashed green;
  position: relative;
}

img {
  width: 100px;
  margin-right: 20px;
}

.remove-icon {
  margin-left: 20px;
  font-size: 20px;
  color: red;
  font-weight: bold;
  cursor: pointer;
}
</style>
