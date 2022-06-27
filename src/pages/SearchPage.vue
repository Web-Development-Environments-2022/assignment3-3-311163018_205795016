<template>
  <div class="container">
    <h1 class="title">Search Page</h1>
    <b-form @submit.prevent="onSearch">
      <b-form-group
        id="input-group-query"
        label-cols-sm="3"
        label="Query:"
        label-for="Query"
      >
        <b-form-input
          id="Query"
          v-model="$v.form.query.$model"
          type="text"
          :state="validateState('query')"
        ></b-form-input>
        <b-form-invalid-feedback>
          Query is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-button
        type="submit"
        variant="primary"
        style="width:100px;display:block;"
        class="mx-auto w-100"
        >Search</b-button
      >
      <div class="mt-2">
        Looking for an idea ?
        <router-link to="register"> Ask hodisan</router-link>
      </div>
    </b-form>
    <b-alert
      class="mt-2"
      v-if="form.submitError"
      variant="warning"
      dismissible
      show
    >
      Login failed: {{ form.submitError }}
    </b-alert>    
  </div>
</template>


<script>
import { required } from "vuelidate/lib/validators";
export default {
  name: "Search",
  data() {
    return {
      form: {
        query: "",
        submitError: undefined
      }
    };
  },
  validations: {
    form: {
      query: {
        required
      }
    }
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async Search() {
      try {
        
        const response = await this.axios.post(
          // "https://test-for-3-2.herokuapp.com/user/Login",
          this.$root.store.server_domain +"/Login",
          // "http://132.72.65.211:80/Login",
          // "http://132.73.84.100:80/Login",

          {
            query: this.form.query
          }
        );
        // console.log(response);
        // this.$root.loggedIn = true;
        console.log(this.$root.store.search);
        this.$root.store.login(this.form.query);
        this.$router.push("/");
      } catch (err) {
        console.log(err.response);
        this.form.submitError = err.response.data.message;
      }
    },
    onSearch() {
      // console.log("login method called");
      this.form.submitError = undefined;
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      // console.log("login method go");

      this.Search();
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  max-width: 400px;
}
</style>

