<template>
  <div class="store-container">
    <div class="header">
      <h2>API Store</h2>
      <div class="cart-summary" @click="displayCart = true">
        <a href="#cart">Cart</a>
        ({{ cart.length }} {{ cart.length > 1 ? 'articles' : 'article' }} for
        ${{ sum }})
      </div>
    </div>
    <ul>
      <li v-for="p in products" :key="p.id">
        <img :src="p.image" :alt="p.title" />
        <h3>{{ p.title }}</h3>
        <div class="add-to-cart" @click="addToCart(p)">
          <img src="./../assets/cart.png" />
        </div>
      </li>
    </ul>
    <Cart
      v-show="displayCart"
      :cartItems="cart"
      @removeFromCart="removeFromCart"
      @closeCart="closeCart"
    />
  </div>
</template>

<script>
import Cart from './Cart/index.vue'
export default {
  name: 'Store',
  components: {
    Cart,
  },
  data: () => ({
    products: [],
    cart: [],
    displayCart: false,
  }),
  methods: {
    addToCart: function (item) {
      this.displayCart = true
      //prevent from adding the same item several times
      const hasItem = this.cart.some((c) => c['id'] === item.id)
      if (!hasItem) {
        const newCart = [...this.cart, item]
        this.cart = newCart
      }
    },
    removeFromCart: function (id) {
      const newArr = this.cart.filter((i) => {
        return i.id !== id
      })
      this.cart = newArr
    },
    closeCart: function () {
      this.displayCart = false
    },
  },

  created() {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((json) => (this.products = json))

    const apiCart = window.localStorage.getItem('apiCart')
    if (apiCart) this.cart = JSON.parse(apiCart)
  },
  computed: {
    sum: function () {
      const sum = this.cart.reduce(function (prev, cur) {
        return prev + cur.price
      }, 0)

      return sum
    },
  },
  watch: {
    cart: function () {
      if (this.cart.length === 0) this.closeCart()
      const value = JSON.stringify(this.cart)
      window.localStorage.setItem('apiCart', value)
    },
  },
}
</script>

<style lang="scss" scoped>
.store-container {
  padding: 0 5vw;
}

.header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.cart-summary {
  width: 200px;
  align-items: center;
  justify-content: flex-end;
  background: green;
  color: white;
  padding: 10px;
  cursor: pointer;
  a {
    text-decoration: none;
    color: inherit;
  }
}

h3 {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

ul,
li {
  padding: 0;
  margin: 0;
  list-style-type: none;
}

ul {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}

li {
  position: relative;
  width: 200px;
  padding: 20px;
  border: 1px solid green;
  margin: 0 20px 20px 0;
  cursor: default;
}

img {
  width: 100px;
  height: 100px;
  display: block;
  margin: 0 auto;
}

.add-to-cart {
  border-top: 1px dashed green;
  padding-top: 10px;
  cursor: pointer;
  img {
    display: block;
    width: 30px;
    height: 30px;
    margin: 0 auto;
  }
}
</style>
