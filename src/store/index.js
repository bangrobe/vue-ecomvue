import { createStore } from "vuex";

export default createStore({
  state: {
    cart: {
      items: [],
    },
    isAuthenticated: false,
    token: "",
    isLoading: false,
  },
  mutations: {
    INITIALIZE_STORE(state) {
      if (localStorage.getItem("cart")) {
        state.cart = JSON.parse(localStorage.getItem("cart"));
      } else {
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }

      if (localStorage.getItem("token")) {
        state.token = localStorage.getItem("token");
        state.isAuthenticated = true;
      } else {
        state.toke = "";
        state.isAuthenticated = false;
      }
    },
    ADD_TO_CART(state, item) {
      //item là một object gồm có product (object) và quantiy
      //Kiểm tra tồn tại product trong cart bằng filter. Nếu trong cart mà có product.id trùng với item.product.id
      const exists = state.cart.items.filter(
        (i) => i.product.id === item.product.id
      );
      //Nếu exists.length > 0
      if (exists.length) {
        //Quantity của card tăng thêm số item.quantity
        exists[0].quantity =
          parseInt(exists[0].quantity) + parseInt(item.quantity);
        console.log(exists[0].quantity, item.quantity);
      } else {
        // Nếu exists.length = 0 tức là chưa có item
        state.cart.items.push(item);
      }
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    SET_ISLOADING(state, status) {
      state.loading = status;
    },
    SET_TOKEN(state, token) {
      state.token = token;
      state.isAuthenticated = true;
    },
    REMOVE_TOKEN(state, token) {
      state.token = "";
      state.isAuthenticated = false;
    },
    CLEAR_CART(state) {
      state.cart = { items: [] };
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
  },
  actions: {},
  modules: {},
});
