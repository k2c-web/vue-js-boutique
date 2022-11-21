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
  width: 100%;
  padding-bottom: 80px;
}

.header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10%;
  box-sizing: border-box;
}

.cart-summary {
  align-items: center;
  justify-content: flex-end;
  background: green;
  color: white;
  padding: 10px;
  cursor: pointer;

  a {
    text-align: center;
    text-decoration: none;
    color: inherit;
  }
}

ul,
li {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  list-style-type: none;
}

ul {
  width: 100%;
  margin: 20px 0 0 0;
  display: grid;
  column-gap: 20px;
  row-gap: 20px;
  grid-template-columns: repeat(3, 1fr);
  padding: 0 10%;
  @media (min-width: 1421px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 1420px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 1080px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 660px) {
    grid-template-columns: repeat(1, 1fr);
  }
}

li {
  width: 100%;
  box-sizing: border-box;
  position: relative;
  padding: 20px;
  border: 1px solid green;
  margin: 0;
  cursor: default;

  h3 {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-align: center;
  }
}

img {
  width: 200px;
  height: 200px;
  object-fit: cover;
  display: block;
  margin: 0 auto;
}

.add-to-cart {
  display: flex;
  align-items: center;
  justify-content: center;
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
