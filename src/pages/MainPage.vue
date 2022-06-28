<template>
  <div class="container">
    <h1 class="title">Main Page</h1>
    <div class="col no-gutter">
      <div class="leftside no-gutter">
    
        <b-container v-if="ViewSearchResults()">
          <h2>
            Recipes just for you
          </h2>       

          <div class="row row-cols-1 row-cols-md-2">
            <div class="col mb-4" v-for="r in recipes_result" :key="r.id">
                <RecipeRandomPreview class="recipePreview" :recipe="r" />
            </div>
          </div>
        
        </b-container>
      </div>
    </div>
    <div class="col no-gutter">
      <div class = "rightside no-gutter">
        <RecipePreviewList title="Randome Recipes" class="RandomRecipes center" />
        <router-link v-if="!$root.store.username" to="/login" tag="button">You need to Login to vue this</router-link>
        {{ !$root.store.username }}
        <RecipePreviewList
          title="Last Viewed Recipes"
          :class="{
            RandomRecipes: true,
            blur: !$root.store.username,
            center: true
          }"
          disabled
        ></RecipePreviewList>
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
export default {
  components: {
    RecipePreviewList,
    //RecipePreview,
    RecipeRandomPreview
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
            "http://localhost:3000" +"/mainPage"
        );
        console.log("*********************---***************");
        console.log(response.data[0]);
        const res_data = response.data[0];
        console.log("*********************---***************");
        console.log(res_data);

        this.recipes_result = [];
        this.recipes_result.push(...res_data);
        console.log("*********************---***************");
        console.log(this.recipes_result);
        this.total_number_of_results = response.data.total_number_of_results;
      
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
