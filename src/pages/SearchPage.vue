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
      
      <div class="form-check form-check-inline" id="filterby">
        <input class="form-check-input" type="radio" name="AllSearch" v-model="form.diet_result" value="Regular">
        <label class="form-check-label" for="AllSearch">Regular</label>
      </div>
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" name="veganSearch" v-model="form.diet_result" value="Vegan">
        <label class="form-check-label" for="veganSearch">&#x1F165;Vegan</label>
      </div>
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" name="vegantarianSearch" v-model="form.diet_result" value="Vegetarian">
        <label class="form-check-label" for="vegantarianSearch">&#x1f331;Vegentarian</label>
      </div>
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" name="GlutenFreeSearch" v-model="form.diet_result" value="Gluten Free">
        <label class="form-check-label" for="GlutenFreeSearch">Gluten Free</label>
      </div>
      <b-button
        type="submit"
        variant="primary"
        style="width:100px;display:block;"
        class="mx-auto w-100"
        >Search</b-button>

      <!--radio inline for number of results to return -->
      <label for="number_of_res">Number of results : </label>
      <div class="form-check form-check-inline" id="number_of_res">
        <input class="form-check-input" type="radio" name="inlineRadioOptions" v-model="form.NumberOfResults" value="5">
        <label class="form-check-label" for="inlineRadio1">5</label>
      </div>
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" name="inlineRadioOptions" v-model="form.NumberOfResults" value="10">
        <label class="form-check-label" for="inlineRadio2">10</label>
      </div>
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" name="inlineRadioOptions" v-model="form.NumberOfResults" value="15">
        <label class="form-check-label" for="inlineRadio3">15</label>
      </div>
      <!-- <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio4" value="inf" disabled>
        <label class="form-check-label" for="inlineRadio3">1,000,000</label>
      </div> -->
      <br> 
      <label for="Sortrby">Sort by :</label>
      <div class="form-check form-check-inline" id="Sortby">
        <input class="form-check-input" type="radio" name="inlineRadioOptionsSortTime" v-model="form.key_sort" value="readyInMinutes">
        <label class="form-check-label" for="inlineRadioOptionsSortTime">Time (minutes)</label>
      </div>
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" name="inlineRadioOptionsSortPop" v-model="form.key_sort" value="popularity">
        <label class="form-check-label" for="inlineRadioOptionsSortPop">Popularity (likes)</label>
      </div>       



      <div class="mt-2">
        Looking for an idea ?
        <router-link to="register"> Ask hodisan</router-link>
      </div>
        <b-container v-if="!ViewSearchResults()">
        <h2>
          <b-container v-if="did_i_clicked_search()">
          No Recipes Found 
          </b-container>
        </h2>       

      </b-container>
      <b-container v-if="ViewSearchResults()">
        <h2>
          The recipes we found for you : 
        </h2>       

        <div class="row row-cols-1 row-cols-md-2">
          <div class="col mb-4" v-for="r in recipes_result" :key="r.id">
              <RecipePreview class="recipePreview" :recipe="r" :favorite_list = favorite_recipes />
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
        NumberOfResults: "5",
        key_sort: "readyInMinutes",
        diet_result : "Regular",
      },
      saved_query: "",
      recipes_result: [],
      total_number_of_results : "0",
      NumberOfResults: "5",
      key_sort: "readyInMinutes",
      clicked_search: false,
      favorite_recipes: []
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
    did_i_clicked_search(){
      return this.clicked_search;
    },
    async Search() {
      try {
        if (this.form.query == ""){
          return;
        }
        this.saved_query = this.form.query;
        this.clicked_search = true;
        const response = await this.axios.get(
          // "https://test-for-3-2.herokuapp.com/user/Login",
          "http://localhost:3000" +"/recipes/search/"+this.saved_query+"-"+this.form.NumberOfResults+"-"+this.form.diet_result,
          // "http://132.72.65.211:80/Login",
          // "http://132.73.84.100:80/Login",

          {
            query: this.form.query
          }
        );
        // this.$root.loggedIn = true;
        const res_data = response.data.results;
        let recipes_ids_separated_by_comma ="";
        for (let i=0;i<res_data.length -1;i++) {
          recipes_ids_separated_by_comma+=res_data[i].id +",";
        }
        recipes_ids_separated_by_comma+=res_data[res_data.length-1].id;
        console.log(recipes_ids_separated_by_comma);
        try {
          console.log("*********************---***************12343124321414233");
          console.log("http://localhost:3000" +"/recipes/recipes_preview/"+recipes_ids_separated_by_comma+"-"+this.form.key_sort);
          const detailed_response = await this.axios.get(
            // "https://test-for-3-2.herokuapp.com/user/Login",
            "http://localhost:3000" +"/recipes/recipes_preview/"+recipes_ids_separated_by_comma+"-"+this.form.key_sort,
            // "http://132.72.65.211:80/Login",
            // "http://132.73.84.100:80/Login",

            {
              query: this.form.query
            }
          );
          const detailed_data =detailed_response.data;
          this.recipes_result = [];
          this.recipes_result.push(...detailed_data);
          this.total_number_of_results = response.data.total_number_of_results;
        } catch (err) {
          console.log(err);
        }      
        

      

        // this.$root.store.login(this.form.query);
        // this.$router.push("/");
      } catch (err) {
        console.log(err);
        // this.form.submitError = err.response.data.message;
      }
    },
    async get_user_favorite_recipes_list(){
        try{
            const response = await this.axios.get(
            "http://localhost:3000" +"/users/favorites",{withCredentials: true}
        );

        const res_data = response.data;
        this.favorite_recipes = [];
        this.favorite_recipes.push(res_data);
        console.log("src\pages\SearchPage.vue, ROW 223, this.favorite_recipes:",this.favorite_recipes);
    }
     catch (err) {
        console.log("src\pages\SearchPage.vue, ROW 226, err.response:",err.response);
        console.log(err);
        // this.form.submitError = err.response.data.message;
      }      
    },
    async mountSearch() {
      try {
        if (this.saved_query == ""){
          return;
        }
        if (this.form.query != ""){
          this.saved_query = this.form.query;
        }

        const response = await this.axios.get(
          // "https://test-for-3-2.herokuapp.com/user/Login",
          "http://localhost:3000" +"/recipes/search/"+this.saved_query+"-"+this.form.NumberOfResults+"-"+this.form.diet_result,
          // "http://132.72.65.211:80/Login",
          // "http://132.73.84.100:80/Login",

          {
            query: this.form.query
          }
        );
        // console.log(response);
        // this.$root.loggedIn = true;
        const res_data = response.data.results;
        let recipes_ids_separated_by_comma ="";
        console.log("res_data = " +res_data);
        for (let i=0;i<res_data.length -1;i++) {
          recipes_ids_separated_by_comma+=res_data[i].id +",";
        }
        recipes_ids_separated_by_comma+=res_data[res_data.length-1].id;
        console.log(recipes_ids_separated_by_comma);
        try {
          console.log("*********************---***************");
          console.log("http://localhost:3000" +"/recipes/recipes_preview/"+recipes_ids_separated_by_comma+"-"+this.form.key_sort);
          const detailed_response = await this.axios.get(
            // "https://test-for-3-2.herokuapp.com/user/Login",
            "http://localhost:3000" +"/recipes/recipes_preview/"+recipes_ids_separated_by_comma+"-"+this.form.key_sort,
            // "http://132.72.65.211:80/Login",
            // "http://132.73.84.100:80/Login",

            {
              query: this.form.query
            }
          );
          const detailed_data =detailed_response.data;
          this.recipes_result = [];
          this.recipes_result.push(...detailed_data);
          this.total_number_of_results = response.data.total_number_of_results;
        } catch (err) {
          console.log(err);
        }      
        

      

        // this.$root.store.login(this.form.query);
        // this.$router.push("/");
      } catch (err) {
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
      this.get_user_favorite_recipes_list();
      this.Search();
    },
  },
  mounted: function(){
    if(localStorage.username){
      if(localStorage.query){
        this.saved_query = localStorage.query;
        } 
      console.log(this.saved_query);
      this.$nextTick(this.mountSearch);
      this.$nextTick(this.get_user_favorite_recipes_list);
    }
  },
  watch:{
    saved_query(newQuery){
      if (localStorage.username){
        localStorage.query = newQuery;
      }
    }
  },
};
</script>
<style lang="scss" scoped>
.container {
  max-width: 600px;
}
</style>

