<template>
  <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="/">
        <h1 class="is-size-4">DFashion</h1>
      </a>

      <a
        role="button"
        class="navbar-burger"
        :class="{ 'is-active': isHamburgerOpen }"
        @click="openHamburgerMenu"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div class="navbar-menu" :class="{ 'is-active': isHamburgerOpen }">
      <div class="navbar-start">
        <router-link to="/" class="navbar-item">
          Home
        </router-link>
        <div class="navbar-item">
          <form method="get" action="/search">
            <div class="field has-addons">
              <div class="control">
                <input
                  type="text"
                  class="input"
                  placeholder="What are you looking for?"
                  name="query"
                />
              </div>
              <div class="control">
                <button class="button is-success">
                  <span class="icon">
                    <i class="fas fa-search"></i>
                  </span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div class="navbar-end">
        <router-link to="/summer" class="navbar-item">Summer</router-link>
        <router-link to="/winter" class="navbar-item">Winter</router-link>
        <div class="navbar-item">
          <div class="buttons">
            <template v-if="!$store.state.isAuthenticated">
              <router-link to="/login" class="button is-light"
                >Log in</router-link
              >
              <router-link to="/register" class="button is-primary"
                >Register</router-link
              >
            </template>
            <template v-else>
              <router-link to="/myaccount" class="button is-info"
                >My Account</router-link
              >
            </template>
            <router-link to="/cart" class="button is-success"
              ><span class="icon"><i class="fas fa-shopping-cart"></i></span>
              <span>Cart ({{ cartTotalLength }})</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  props: {
    cart: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      isHamburgerOpen: false,
    };
  },
  methods: {
    openHamburgerMenu() {
      this.isHamburgerOpen = !this.isHamburgerOpen;
    },
  },
  computed: {
    cartTotalLength() {
      let totalLength = 0;

      for (let i = 0; i < this.cart.items.length; i++) {
        totalLength += this.cart.items[i].quantity;
      }
      return totalLength;
    },
  },
  mounted() {
    this.cartTotalLength;
    console.log(this.cartTotalLength);
  },
};
</script>

<style></style>
