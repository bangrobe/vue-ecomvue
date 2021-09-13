<template>
  <div class="page-login">
    <div class="columns">
      <div class="column is-4 is-offset-4">
        <h1 class="title">Login</h1>
        <form @submit.prevent="submitForm()">
          <div class="field">
            <label>Username</label>
            <div class="control">
              <input type="text" class="input" v-model="username" />
            </div>
          </div>
          <div class="field">
            <label>Password</label>
            <div class="control">
              <input type="password" class="input" v-model="password" />
            </div>
          </div>
          <div class="notification is-danger" v-if="errors.length">
            <p v-for="error in errors" :key="error">{{ error }}</p>
          </div>
          <div class="field">
            <div class="control">
              <button class="button is-dark">Login</button>
            </div>
            <hr />
            <p>
              Not have account yet?
              <router-link to="/register">click here</router-link> to register!
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { toast } from "bulma-toast";
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      errors: [],
    };
  },
  methods: {
    async submitForm() {
      axios.defaults.headers.common["Authorization"] = "";
      localStorage.removeItem("token");
      this.errors = [];
      if (this.username === "") {
        this.errors.push("The username is missing!");
      }
      if (this.password === "") {
        this.errors.push("Password must be not empty!");
      }
      if (!this.errors.length) {
        const formData = {
          username: this.username,
          password: this.password,
        };
        await axios
          .post("/api/v1/token/login/", formData)
          .then((response) => {
            //auth_token la do backend tra ve
            const token = response.data.auth_token;
            this.$store.commit("SET_TOKEN", token);
            axios.defaults.headers.common["Authorization"] = "Token " + token;
            localStorage.setItem("token", token);

            toast({
              message: "Login successful!",
              type: "is-success",
              dismissible: true,
              pauseOnHover: true,
              duration: 2000,
              position: "bottom-right",
            });

            const toPath = this.$route.query.to || "/cart";
            this.$router.push(toPath);
          })
          .catch((err) => {
            if (err.response) {
              for (const property in err.response.data) {
                this.errors.push(`${property}: ${err.response.data[property]}`);
              }
              console.log(JSON.stringify(err.response.data));
            } else if (err.message) {
              this.errors.push("Something went wrong. Please try again");
              console.log(JSON.stringify(err));
            }
          });
      }
    },
  },
  mounted() {
    document.title = "Login | DFashion";
  },
};
</script>

<style></style>
