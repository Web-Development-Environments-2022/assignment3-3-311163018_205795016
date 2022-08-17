<template>
  <div class="container">
    <div v-if="recipe">
      <div class="recipe-header mt-3 mb-4">
        <h1>{{ recipe.title }}</h1>
        <img :src="recipe.image" class="center" />
      </div>
      <div class="recipe-body">
        <div class="wrapper">
          <div class="wrapped">
            <div class="mb-3">
              <!-- <b-button pill variant="info" @click="I_like_it()">Love it!</b-button> -->
              <div><b>Ready in {{ recipe.readyInMinutes }} minutes</b></div>
              <div><b>Likes: {{ recipe.popularity }} likes</b></div>
              <div><b>Servings: {{ recipe.servings }} servings</b></div>
            </div><b>
            Ingredients
            <ul><div v-if="is_it()">
              <li
                v-for="(r, index) in recipe.extendedIngredients"
                :key="index + '_' + r.id"
              >
                <div v-if="r.original">{{r.original}}</div>
              </li></div>
              <div v-if="!is_it()">
              <li
                v-for="(r, index) in this.extendedIngredients_as_string_by_comma"
                :key="index + '_' + r.id"
              >
                 <div v-if="!r.original">{{r}}</div>
              </li></div>

            </ul></b>        

          </div>
          <div class="wrapped" v-show="recipe.instructions">
            Instructions:
            <ol> {{ recipe.instructions }}
              <!-- <li v-for="s in recipe.instructions" :key="s.number">
                {{ s.step }}
              </li> -->
            </ol>
          </div>
        </div>
      </div>
      <!-- <pre>
      {{ $route.params }}
      {{ recipe }}
      </pre
      > -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      recipe: null,
      extendedIngredients_as_string_by_comma :[]
    };
  },

    async created() {
      
      try {
        let response;
        // response = this.$route.params.response;

        try {
          response = await this.axios.get(
            // "https://test-for-3-2.herokuapp.com/recipes/info",
            // this.$root.store.server_domain + "/recipes/info",
            "http://localhost:3000"+"/recipes/"+this.$route.params.recipeId, {withCredentials: true}
            // {
            //   // params: { id: this.$route.params.recipeId }
            // }
          );
          if (response.status !== 200) {this.$router.replace("/NotFound")};
        } catch (error) {
          this.$router.replace("/NotFound");
          return;
        }
        let {
          analyzedInstructions,
          instructions,
          extendedIngredients,
          popularity,
          readyInMinutes,
          image,
          servings,
          title
        } = response.data;
        console.log("81, response.data:",response.data);
        let _instructions = analyzedInstructions
        //   .map((fstep) => {
        //     fstep.steps[0].step = fstep.name + fstep.steps[0].step;
        //     return fstep.steps;
        //   })
        //   .reduce((a, b) => [...a, ...b], []);

        let _recipe = {
          instructions,
          _instructions,
          analyzedInstructions,
          extendedIngredients,
          popularity,
          readyInMinutes,
          image,
          servings,
          title
        };

        this.recipe = _recipe;

        console.log("102, this.recipe:",this.recipe);
        console.log("103, response.data:",response.data); 
        if (!Array.isArray(this.recipe.extendedIngredients)){
          this.extendedIngredients_as_string_by_comma = this.recipe.extendedIngredients.split(',');
        }           
      } catch (error) {
        console.log(error);
      }
    },
    methods:{
      is_it(){
        if (Array.isArray(this.recipe.extendedIngredients)){
          return true;
        }
        return false;
      }


    }
    
};
</script>

<style scoped>
.wrapper {
  display: flex;
}
.wrapped {
  width: 50%;
  background-color: bisque;
}
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}
/* .recipe-header{

} */
</style>
