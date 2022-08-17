<template>
  <div class="container">
    <h1 class="title">Create Recipe</h1>
    <b-form @submit.prevent="onCreate" @reset.prevent="onReset">
      <b-form-group
        id="input-group"
        label-cols-sm="3"
        label="Recipe Name:"
        label-for="recipetitle"
      >
        <b-form-input
          id="recipetitle"
          v-model="form.recipetitle"
          type="text"
          
        ></b-form-input >
        <b-form-invalid-feedback v-if="!$v.form.recipetitle.required">
          Name/Title is required
        </b-form-invalid-feedback>
        <b-form-text v-else-if="!isTitleLenValid">
          Name/Title length should be between 1-120 characters long
        </b-form-text>
      </b-form-group>


      <b-form-group
        id="input-group"
        label-cols-sm="3"
        label="ReadyInMinutes :"
        label-for="forreadyInMinutes"
      >
        <b-form-input
          type="text"
          v-model="form.readyInMinutes"
        ></b-form-input>      
      </b-form-group>      


      <b-form-group
        id="input-group"
        label-cols-sm="3"
        label="Image :"
        label-for="forImage"
      >
        <b-form-input
          type="text"
          v-model="form.image"
          placeholder="Image URL"
        ></b-form-input>
      </b-form-group> 

      <div class="form-check form-check-inline" id="inlineCheckbox1" >
        <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" v-model="form.vegan">
        <label class="form-check-label" for="inlineCheckbox1">&#x1F165;Vegan</label>
      </div>
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" v-model="form.vegetarian">
        <label class="form-check-label" for="inlineCheckbox2">&#x1f331;Vegentarian</label>
      </div>
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="checkbox" id="inlineCheckbox3" value="option3" v-model="form.glutenFree">
        <label class="form-check-label" for="inlineCheckbox3" >Gluten Free</label>
      </div>

      <b-form-group
        id="input-group"
        label-cols-sm="3"
        label="Instructions:"
        label-for="forInstructions"
      >
        <b-form-input
          v-model="$v.form.instructions.$model"
        ></b-form-input>
        <b-form-invalid-feedback>
          Instructions is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group"
        label-cols-sm="3"
        label="Number of dishes:"
        label-for="for_number_of_dishes"
      >
        <b-form-input
          v-model="form.number_of_dishes"
        ></b-form-input>
        <b-form-invalid-feedback>
          Number of dishes is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group"
        label-cols-sm="3"
        label="ingredients:"
        label-for="foringredients"
      >
        <b-form-input
          v-model="$v.form.ingredients.$model"
        ></b-form-input>
        <b-form-invalid-feedback>
          ingredients is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-button type="reset" variant="danger">Reset</b-button>
      <b-button type="submit" variant="primary" style="width:250px;" class="ml-5 w-75">Create</b-button>
    </b-form>
    <b-alert class="mt-2" v-if="form.submitError" variant="warning" dismissible show>
      Create failed: {{ form.submitError }}
    </b-alert>
    <!-- <b-card class="mt-3 md-3" header="Form Data Result">
      <pre class="m-0"><strong>form:</strong> {{ form }}</pre>
      <pre class="m-0"><strong>$v.form:</strong> {{ $v.form }}</pre>
    </b-card> -->
  
    <b-container v-if="ViewCreation">
      <h2>
        Creating is a wonderful felling ! <br> Enjoy your creation : 
      </h2>       

      <div class="row row-cols-1 row-cols-md-2">
        <div class="col mb-4" v-for="r in recipes_result" :key="r.id">
            <RecipeRandomPreview class="recipePreview" :recipe="r" />
        </div>
      </div>
    </b-container>

  </div>    
</template>
<script>
import { required } from "vuelidate/lib/validators";
import RecipeRandomPreview from "../components/RecipeRandomPreview";
export default {
  name: "CreateRecipe",
  components: {
    RecipeRandomPreview
  }, 
  data() {
    return {
      form: {
        recipeid: "0",
        recipetitle: "",
        readyInMinutes: "",
        image: null,
        popularity: 0,
        vegan: false,
        vegetarian: false,
        glutenFree: false,
        instructions: "",
        number_of_dishes: "",
        ingredients: "",
        submitError: undefined
      },
      recipes_result : [],
      errors: [],
      validated: false
    };
  },
  validations: {
    form: {
      recipetitle: {
        required,
      },
      instructions: {
        required
      },      
      readyInMinutes: {
        required
      },
      number_of_dishes: {
        required
      },
      ingredients: {
        required
      }
    }
  },
//   mounted() {
//     // console.log("mounted");
//     // console.log($v);
//   },
  methods: {
    async Create() {
      console.log("id:",this.form.recipeid);
      try {
        const ingredients_array = this.form.ingredients.split(",");
        console.log(ingredients_array)
        const response = await this.axios.post(
          // this.$root.store.server_domain + "/recipes/createrecipe",
          "http://localhost:3000" +"/recipes/createrecipe",          

          {
            id:this.form.recipeid,
            title: this.form.recipetitle,
            readyInMinutes: this.form.readyInMinutes,
            image: this.form.image,
            popularity: this.form.popularity,
            vegan: this.form.vegan,
            vegetarian: this.form.vegetarian,
            glutenFree: this.form.glutenFree,
            instructions: this.form.instructions,
            number_of_dishes: this.form.number_of_dishes,
            ingredients: ingredients_array
            
          },{withCredentials: true}
        );
        // this.$router.push("/login");
        // console.log(response);
      } catch (err) {
        console.log(err.response);
        this.form.submitError = err.response.data.message;
      }
      this.recipes_result.push({
            id:this.form.recipeid,
            title: this.form.recipetitle,
            readyInMinutes: this.form.readyInMinutes,
            image: this.form.image,
            popularity: this.form.popularity,
            vegan: this.form.vegan,
            vegetarian: this.form.vegetarian,
            glutenFree: this.form.glutenFree,
            instructions: this.form.instructions,
            number_of_dishes: this.form.number_of_dishes,
            ingredients: this.form.ingredients
            
          });
    },
    onCreate() {
      console.log("create recipe method called");
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      console.log("create recipe method go");
      this.form.recipeid = (Date.now()%10000000);//unique ID ;-)
      if (this.form.glutenFree) {this.form.glutenFree =1;} else {this.form.glutenFree =0};
      if (this.form.vegetarian) {this.form.vegetarian =1;} else {this.form.vegetarian =0};
      if (this.form.vegan) {this.form.vegan =1;} else {this.form.vegan =0};
      this.Create();
    },
    onReset() {
      this.form = {
        recipeid: "0",
        recipetitle: "",
        readyInMinutes: "",
        image: null,
        popularity: 0,
        vegan: false,
        vegetarian: false,
        glutenFree: false,
        instructions: "",
        number_of_dishes: 0,
        ingredients: "",
        submitError: undefined
      };
      this.$nextTick(() => {
        this.$v.$reset();
      });
    },
    isTitleLenValid() {
      return (this.form.recipetitle.length>0 && this.form.recipetitle.length<120);
    },
    ViewCreation(){
      return this.recipes_result.length >=1;
    }    
  }
};
</script>
<style lang="scss" scoped>
.container {
    max-width: 700px;
}
</style>