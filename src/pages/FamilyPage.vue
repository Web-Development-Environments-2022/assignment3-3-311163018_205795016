<template>
     <div class="container">
        <h1 class="title">Family Page</h1>
        <b-container v-if="ViewSearchResults()">
          <h2>
            Recipes just for you
          </h2>       

          <div class="row row-cols-md-3 ">
            <div class="col md-3" v-for="r in recipes_result[0]" :key="r.id">
                <RecipeRandomPreview class="recipePreview" :recipe="r" />

            </div>
          </div>

        
        </b-container>
     </div>
</template>

<script>
import RecipeRandomPreview from "../components/RecipeRandomPreview";

export default {
    name: "Family",
    components:{
        RecipeRandomPreview
    },
    data(){
        return {
            recipes_result: [],
            total_number_of_results : "0"
        }
    },
    methods: {
              ViewSearchResults(){
      return this.recipes_result.length >=1;
    },
    async familySearch(){
        try{
            const response = await this.axios.get(
            "http://localhost:3000" +"/users/family",{withCredentials: true}
        );
        console.log(response)

        const res_data = response.data;
        console.log("*********************-2-***************");
        console.log(res_data);
        this.recipes_result = [];
        this.recipes_result.push(res_data);

        console.log(this.recipes_result[0]);
        this.total_number_of_results = response.data.total_number_of_results;
    }
     catch (err) {
        console.log(err.response);
        console.log(err);
        // this.form.submitError = err.response.data.message;
      }
    },
},
  mounted: function(){
    this.$nextTick(this.familySearch)
  },
};
</script>

<style lang="scss" scoped>

</style>