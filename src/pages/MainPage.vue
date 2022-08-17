<template>
  <div class="row">
    <v-col class="column" cols="6" md="3">
    <h1 class="title">Main Page</h1><br>
        <b-container v-if="ViewSearchResults()">
          <h2>
            Recipes just for you
          </h2>       

          <div class="col row-cols-md-1">
            <div class="col col-md-12" v-for="r in recipes_result.slice(0,3)" :key="r.id">
                <RecipeRandomPreview class="recipePreview" :recipe="r" />

            </div>
          </div>

        
        </b-container>
          <div>
            <br><br>
            <b-button pill variant="info" @click="randomSearch()">Random</b-button>
          </div>
    </v-col>
    <v-col class="column" cols="6" md="3">
    <div class="col no-gutter"><br><br>
        <div v-if="!$root.store.username">
        <LoginPageComp></LoginPageComp>
        </div>
        <div v-if="$root.store.username">

        <b style="font-size:35px "  >Hi {{ $root.store.username }}</b>
          <h2>
            Last Recipes you watched:
          </h2> 
        <b-container v-if="ViewSearchResults()">
        <div class="col row-cols-md-1">
          <div class="col col-md-12" v-for="r in recipes_result[3]" :key="r.id">
              <RecipeRandomPreview  class="recipePreview" :recipe="r" />
          </div>
        </div>
        </b-container>
    </div>
    </div>
    </v-col>
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
import RecipePreview from "../components/RecipePreview";
import RecipeRandomPreview from "../components/RecipeRandomPreview";
import LoginPageComp from "../components/LoginPageComp";
export default {
  components: {
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
        const res_data = response.data[0];

        this.recipes_result = [];
        this.recipes_result.push(...res_data);
        this.total_number_of_results = response.data.total_number_of_results;
        if (response.data[1]){
          this.recipes_result.push(response.data[1]);
          this.total_number_of_results = response.data.total_number_of_results;
        }

      
      } catch (err) {
        console.log(err);
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
h1 {
  margin-left: 25px;
}
.column {
  padding-left: 180px;

}


</style>
