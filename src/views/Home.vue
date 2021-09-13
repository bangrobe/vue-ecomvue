<template>
  <div class="home">
    <section class="hero is-medium is-dark mb-6">
      <div class="hero-body has-text-centered">
        <p class="title mb-6">
          Welcome to Django Fashion
        </p>
        <p class="subtitle">
          The best fashion store on localhost
        </p>
      </div>
    </section>

    <div class="columns is-multiline">
      <div class="column is-12">
        <h2 class="is-size-2 has-text-centered">Latest Products</h2>
      </div>
      <ProductBox
        v-for="product in latestProduct"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
import ProductBox from "@/components/ProductBox";
export default {
  name: "Home",
  components: { ProductBox },
  data() {
    return {
      latestProduct: [],
    };
  },
  methods: {
    async getLatestProduct() {
      this.$store.commit("SET_ISLOADING", true);
      await axios
        .get("/api/v1/latest-products")
        .then((response) => {
          this.latestProduct = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
      this.$store.commit("SET_ISLOADING", false);
    },
  },
  mounted() {
    this.getLatestProduct();
    document.title = "Home | DFashion";
  },
};
</script>
