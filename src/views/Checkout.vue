<template>
  <div class="page-checkout">
    <div class="columns is-multiline">
      <div class="columns is-12">
        <h1 class="title">Checkout</h1>
      </div>
      <div class="column is-12 box">
        <table class="table is-fullwidth">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in cart.items" :key="item.product.id">
              <td>{{ item.product.name }}</td>
              <td>${{ item.product.price }}</td>
              <td>{{ item.quantity }}</td>
              <td>${{ getItemTotal(item).toFixed(2) }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="2"><strong>Total</strong></td>
              <td>{{ cartTotalLength }}</td>
              <td>${{ cartTotalPrice.toFixed(2) }}</td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div class="column is-12" box>
        <h2 class="subtitle">Shipping Details</h2>
        <p class="has-text-grey mb-4">* Required Field</p>
        <div class="columns is-multiline">
          <div class="column is-6">
            <div class="field">
              <label for="first_name">First name</label>
              <div class="control">
                <input type="text" class="input" v-model="first_name" />
              </div>
            </div>
            <div class="field">
              <label for="last_name">Last name</label>
              <div class="control">
                <input type="text" class="input" v-model="last_name" />
              </div>
            </div>
            <div class="field">
              <label for="email">Email</label>
              <div class="control">
                <input type="email" class="input" v-model="email" />
              </div>
            </div>
            <div class="field">
              <label for="zipcode">Zip Code</label>
              <div class="control">
                <input type="text" class="input" v-model="zipcode" />
              </div>
            </div>
          </div>
          <div class="column is-6">
            <div class="field">
              <label for="first_name">Phone</label>
              <div class="control">
                <input type="text" class="input" v-model="phone" />
              </div>
            </div>
            <div class="field">
              <label for="first_name">Address</label>
              <div class="control">
                <input type="text" class="input" v-model="address" />
              </div>
            </div>
            <div class="field">
              <label for="last_name">Place</label>
              <div class="control">
                <input type="text" class="input" v-model="place" />
              </div>
            </div>
          </div>
        </div>
        <div class="is-notification is-danger mt-4" v-if="errors.length">
          <p v-for="error in errors" :key="error">{{ error }}</p>
        </div>

        <hr />
        <div id="card-element" class="mb-5"></div>
        <div ref="card"></div>

        <template v-if="cartTotalLength">
          <hr />
          <button class="button is-dark" @click="submitForm()">
            Pay with Stripe
          </button>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Checkout",
  data() {
    return {
      cart: {
        items: [],
      },
      stripe: {},
      card: {},
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      address: "",
      zipcode: "",
      place: "",
      errors: [],
    };
  },
  mounted() {
    document.title = "Checkout | DFashion";
    this.cart = this.$store.state.cart;
    console.log(this.cartTotalLength);

    this.stripe = Stripe(
      "pk_test_51IT1miEDhYmQiN9tbPNtCsZRRJ9ZH12cO7XUZEZCJFUqzqQfGdKTcgfNIWjnqiaYClOTcA16X5kFn9HojDTF1unm00RrxmhdM1"
    );
    const elements = this.stripe.elements();
    this.card = elements.create("card", { hidePostalCode: true });
    this.card.mount("#card-element");
  },
  methods: {
    getItemTotal(item) {
      return item.quantity * item.product.price;
    },
    submitForm() {
      this.errors = [];
      if (this.email === "") {
        this.errors.push("The email is missing");
      }
      if (this.address === "") {
        this.errors.push("The address is missing");
      }
      if (!this.errors.length) {
        this.$store.commit("SET_ISLOADING", true);
        this.stripe.createToken(this.card).then((result) => {
          if (result.error) {
            this.$store.commit("SET_ISLOADING", false);
            this.errors.push(
              "Something went wrong with Stripe. Please try again"
            );
            console.log(result.error.message);
          } else {
            this.stripeTokenHandler(result.token);
          }
        });
      }
    },

    async stripeTokenHandler(token) {
      const items = [];
      for (let i = 0; i < this.cart.items.length; i++) {
        const item = this.cart.items[i];
        const obj = {
          product: item.product.id,
          quantity: item.quantity,
          price: item.product.price * item.quantity,
        };

        items.push(obj);
      }

      const data = {
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,
        address: this.address,
        zipcode: this.zipcode,
        place: this.place,
        phone: this.phone,
        items: items,
        stripe_token: token.id,
      };

      await axios
        .post("/api/v1/checkout/", data)
        .then((response) => {
          this.$store.commit("CLEAR_CART");
          this.$router.push("/checkout/success");
        })
        .catch((err) => {
          this.errors.push("Something went wrong. Please try again!");
          console.log(err);
        });

      this.$store.commit("SET_ISLOADING", false);
    },
  },
  computed: {
    cartTotalPrice() {
      return this.cart.items.reduce((acc, curVal) => {
        return (acc += curVal.product.price * curVal.quantity);
      }, 0);
    },
    cartTotalLength() {
      return this.cart.items.reduce((acc, curVal) => {
        return (acc += curVal.quantity);
      }, 0);
    },
  },
};
</script>

<style></style>
