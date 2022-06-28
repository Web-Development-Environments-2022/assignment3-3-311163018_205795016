<template>
  <div class="container">
    <h1 class="title">Search Page</h1>
    <b-form @submit.prevent="onSearch">
      <b-form-group
        id="input-group"
        label-cols-sm="3"
        label="Query:"
        label-for="forQuery"
      >
        <b-form-input
          v-model="$v.form.query.$model"
          type="text"
          placeholder="Search"
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
        >Search</b-button>

      <div class="mt-2">
        Looking for an idea ?
        <router-link to="register"> Ask hodisan</router-link>
      </div>

      <b-container v-if="ViewSearchResults()">
        <h2>
          The recipes we found for you : 
        </h2>       

        <div class="row row-cols-1 row-cols-md-2">
          <div class="col mb-4" v-for="r in recipes_result" :key="r.id">
              <RecipePreview class="recipePreview" :recipe="r" />
          </div>
        </div>
      </b-container>

     
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
import RecipePreview from "../components/RecipePreview";
export default {
  name: "Search",
  components: {
    RecipePreview
  },
  data() {
    return {
      form: {
        query: "",
        submitError: undefined,
        NumberOfResults: "5"
      },
      recipes_result: [],
      total_number_of_results : "0"
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
    ViewSearchResults(){
      return this.recipes_result.length >=1;
    },
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async Search() {
      try {
        
        const response = await this.axios.get(
          // "https://test-for-3-2.herokuapp.com/user/Login",
          "http://localhost:3000" +"/recipes/search/"+this.form.query+"-"+this.form.NumberOfResults,
          // "http://132.72.65.211:80/Login",
          // "http://132.73.84.100:80/Login",

          {
            query: this.form.query
          }
        );
        // console.log(response);
        // this.$root.loggedIn = true;
        console.log(this.form.query);
        console.log("*********************---***************");
        console.log(response.data);
        const res_data = response.data.results;
        this.recipes_result = [];
        this.recipes_result.push(...res_data);
        this.total_number_of_results = response.data.total_number_of_results;
      

        // this.$root.store.login(this.form.query);
        // this.$router.push("/");
      } catch (err) {
        console.log(err.response);
        console.log(err);
        console.log(err);
        // this.form.submitError = err.response.data.message;
      }
    },
    onSearch() {
      // console.log("login method called");
      this.form.submitError = undefined;
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      console.log("search method go");

      this.Search();
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  max-width: 600px;
}
</style>

