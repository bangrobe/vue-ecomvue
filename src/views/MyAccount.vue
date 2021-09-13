<template>
  <div class="page-myaccount">
    <div class="columns is-multiline">
      <div class="column is-12">
        <h1 class="title">My Account</h1>
      </div>
      <div class="column is-12">
        <h2 class="subtitle">My orders</h2>
        <OrderSummary v-for="order in orders" :key="order.id" :order="order" />
      </div>
      <div class="column is-12">
        <button class="button is-danger" @click="logout()">Logout</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import OrderSummary from "@/components/OrderSummary";
export default {
  name: "MyAccount",
  components: {
    OrderSummary,
  },
  data() {
    return {
      orders: [],
    };
  },
  methods: {
    logout() {
      axios.defaults.headers.common["Authorization"] = "";
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("userid");

      this.$store.commit("REMOVE_TOKEN");
      this.$router.push("/");
    },
    async getMyOrders() {
      this.$store.commit("SET_ISLOADING", true);
      await axios
        .get("/api/v1/orders/")
        .then((response) => {
          this.orders = response.data;
          console.log(this.orders);
        })
        .catch((err) => {
          console.log(err);
        });

      this.$store.commit("SET_ISLOADING", false);
    },
  },
  mounted() {
    document.title = "My account | DFashion";
    this.getMyOrders();
  },
};
</script>

<style></style>
