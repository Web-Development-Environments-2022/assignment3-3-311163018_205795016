<template>
  <div class="container">
    <h1 class="title">Main Page</h1>
    <!-- <div class="col no-gutter"> -->
      <!-- <div class="leftside no-gutter"> -->
    
        <b-container v-if="ViewSearchResults()">
          <h2>
            Recipes just for you
          </h2>       

          <div class="row row-cols-md-3 ">
            <div class="col md-3" v-for="r in recipes_result.slice(0,3)" :key="r.id">
                <RecipeRandomPreview class="recipePreview" :recipe="r" />

            </div>
          </div>

        
        </b-container>
          <div>
            <br><br><br>
            <b-button pill variant="info" @click="randomSearch()">Random</b-button>
          </div>
      <!-- </div> -->
    <!-- </div> -->
    <div class="col no-gutter">
      <!-- <div class = "rightside no-gutter"> -->
        <div v-if="!$root.store.username">
        <LoginPageComp></LoginPageComp>
        </div>
        <!-- <RecipePreviewList title="Randome Recipes" class="RandomRecipes center" /> -->
        <!-- <router-link v-if="!$root.store.username" to="/login" tag="button">You need to Login to vue this</router-link> -->
        <div v-if="$root.store.username">

        <b style="background :wheat "  >{{ $root.store.username }}</b>
          <h2>
            Last Recipes you watched:
          </h2> 
        <b-container v-if="ViewSearchResults()">
        <div class="row row-cols-md-3 ">
          <div class="col md-3" v-for="r in recipes_result[3]" :key="r.id">
              <RecipeRandomPreview  class="recipePreview" :recipe="r" />
          </div>
        </div>
        </b-container>
        <!-- <div class="col mb-4" v-for="r in recipes_result" :key="r.id">
          <RecipePreviewList
            title="Last Viewed Recipes"
            
            :class="{
              recipePreview,
              RandomRecipes: true,
              blur: !$root.store.username,
              center: true
            }"
            :recipe="r"
          ></RecipePreviewList>
        </div> -->
      <!-- </div> -->
    </div>
    </div>
    <!-- <div
      style="position: absolute;top: 70%;left: 50%;transform: translate(-50%, -50%);"
    >
      Centeredasdasdad
    </div>-->
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
import RecipePreview from "../components/RecipePreview";
import RecipeRandomPreview from "../components/RecipeRandomPreview";
import LoginPageComp from "../components/LoginPageComp";
export default {
  components: {
    //RecipePreviewList,
    //RecipePreview,
    RecipeRandomPreview,
    LoginPageComp
  },
  data(){
    return{
      recipes_result: [],
      total_number_of_results : "0"
    };

  },
  methods: {
      ViewSearchResults(){
      return this.recipes_result.length >=1;
    },
    async randomSearch() {
      try{
        const response = await this.axios.get(
            "http://localhost:3000" +"/mainPage",{withCredentials: true}
        );
        console.log(response)
        console.log("*********************-1-***************");
        console.log(response.data[0]);
        console.log(response.data[1]);
        const res_data = response.data[0];
        console.log("*********************-2-***************");
        console.log(res_data);

        this.recipes_result = [];
        this.recipes_result.push(...res_data);
        console.log("*********************-3-***************");
        console.log(this.recipes_result);
        this.total_number_of_results = response.data.total_number_of_results;
        if (response.data[1]){
          this.recipes_result.push(response.data[1]);
          this.total_number_of_results = response.data.total_number_of_results;
        }
        console.log(this.recipes_result);
        console.log("checking");
        console.log(this.recipes_result[3]);
      
      } catch (err) {
        console.log(err.response);
        console.log(err);
        console.log(err);
        // this.form.submitError = err.response.data.message;
      }
    },
  },
  mounted: function(){
    this.$nextTick(this.randomSearch)
  },
};
</script>

<style lang="scss" scoped>
.RandomRecipes {
  margin: 10px 0 10px;
}
// .container{
//   width: 100%;
// }
.blur {
  -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
  filter: blur(2px);
}
::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}
.rightside, .leftside{
  height: 100vh;
  width: 100%;
  
}
// .leftside{
//   background: red;
// }
// .rightside{
//   background: blue;
// }

</style>
