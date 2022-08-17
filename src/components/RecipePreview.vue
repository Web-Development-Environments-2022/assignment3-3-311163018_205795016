<template>
  <div>

    <router-link
      :to="{ name: 'recipe', params: { recipeId: recipe.id } }"
      class="recipe-preview"
    >
      <div class="recipe-body">
        <img v-if="image_load" :src="recipe.image" class="recipe-image" />
      </div>
      <div class="recipe-footer">
        <div :title="recipe.title" class="recipe-title" style='font-size:20px;'>
          <b>{{ recipe.title }}</b>
          <li v-if="is_glutenFree()">GlutenFree &#10003;</li>
          <li v-if="is_vegan()"> &#x1F165; </li>
          <li v-if="is_vegetarian()">&#x1f331;</li>
        </div>
        <ul class="recipe-overview" >
          <li v-if="ready_time" style='font-size:20px;'> {{ recipe.readyInMinutes }} Minutes</li>
          <!-- <li v-if="ready_time" style='font-size:25px;'> {{ recipe.readyInMinutes }} &#9200;</li> -->
          <li v-if="like_exist" style='font-size:20px;'>{{ recipe.popularity }} &#9829; </li>
        </ul>
      </div>
    </router-link>
    <ul class="watched_favorite"> 
      <li v-if="is_watched()" style='font-size:50px;'>&#128065;</li>
      <li v-if="is_favorite()" style='font-size:50px;'>&#9733; </li>
      <li v-else-if="is_user_login()" class="hovertext" data-hover="Add to favorite" @click="add_to_favorite" >&#9734; </li>
      <!-- <li> <button class="button" v-if="!is_favorite()" @click="add_to_favorite"><span>Add {{ recipe.title }} to favorite &#9734;</span></button></li> -->
    </ul>
  </div>
</template>

<script>
export default {
  mounted() {
    this.axios.get(this.recipe.image).then((i) => {
      this.image_load = true;
    });  
  },
  data() {
    return {
      form: {
        image_load: false,
        ready_time: true,
        like_exist: true,
        vegetarian: false,
        vegan : false,
        glutenFree: false
      },
        image_load: false,
        ready_time: true,
        like_exist: true,
        vegetarian: false,
        vegan : false,
        glutenFree: false,
        favorite: false,
        watched: false
    };
  },
  props: {
    recipe: {
      type: Object,
      required: true
    },
    favorite_list: {
      type: Array,
      required: true
    },
    watched_ids_list: {
      type: Array,
      required: true
    }

    // id: {
    //   type: Number,
    //   required: true
    // },
    // title: {
    //   type: String,
    //   required: true
    // },
    // readyInMinutes: {
    //   type: Number,
    //   required: true
    // },
    // image: {
    //   type: String,
    //   required: true
    // },
    // aggregateLikes: {
    //   type: Number,
    //   required: false,
    //   default() {
    //     return undefined;
    //   }
    // }
  },

  methods: {
    is_glutenFree() {
      return this.recipe.glutenFree;
    },
    is_vegan() {
      return this.recipe.vegan;
    },
    is_vegetarian(){
      return this.recipe.vegetarian;
    },
    is_favorite(){
      for (var i=0;i<this.favorite_list[0].length;i++){
        if(this.favorite_list[0][i].id == this.recipe.id) {
          return true;
        }
      }
      return false;
    },
    is_watched(){
      if (this.watched_ids_list == []){
        return false
      }
      for (var i=0;i<this.watched_ids_list[0].length;i++){
        if(this.watched_ids_list[0][i].recipe_id == this.recipe.id) {
          return true;
        }
      }
      return false;
    },
    is_user_login(){
      try{
        if (this.$root.store.username != null){
          return true;
        }
        return false;
      }catch(err){
        return false;
      }
    } ,   
    async add_to_favorite(){
      try{
          if (this.$root.store.username!= null){
            const response = await this.axios.post(
            "http://localhost:3000" +"/users/favorites",
            {
              recipeId:this.recipe.id
            },{withCredentials: true}
          );
          }
        }catch (err) {
        console.log(err);
      }
  },
}
};
</script>

<style scoped>
.recipe-preview {
  display: inline-block;
  width: 100%;
  height: 100%;
  position: relative;
  margin: 10px 10px;
  border-top: 2px dotted black;
}
.recipe-preview > .recipe-body {
  width: 100%;
  height: 200px;
  position: relative;
}

.recipe-preview .recipe-body .recipe-image {
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
  margin-bottom: auto;
  display: block;
  width: 98%;
  height: auto;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  background-size: cover;
}

.recipe-preview .recipe-footer {
  width: 100%;
  height: 50%;
  overflow: hidden;
}

.recipe-preview .recipe-footer .recipe-title {
  padding: 10px 10px;
  width: 100%;
  font-size: 12pt;
  text-align: left;
  white-space: nowrap;
  overflow: visible;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  color: black;
}

.recipe-preview .recipe-footer ul.recipe-overview {
  padding: 5px 10px;
  width: 100%;
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  box-flex: 1;
  -webkit-flex: 1 auto;
  -ms-flex: 1 auto;
  flex: 1 auto;
  table-layout: fixed;
  margin-bottom: 0px;
}
ul.watched_favorite li {
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  -ms-box-flex: 1;
  box-flex: 1;
  -webkit-flex-grow: 1;
  flex-grow: 1;
  width: 90px;
  display: table-cell;
  text-align: center;
  border-bottom: 1px dotted black;
  
}
.recipe-preview .recipe-footer ul.recipe-overview li {
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  -ms-box-flex: 1;
  box-flex: 1;
  -webkit-flex-grow: 1;
  flex-grow: 1;
  width: 90px;
  display: table-cell;
  text-align: center;
  color: black;
}
.button {
  transition-duration: 0.4s;
  border-radius: 5%;
}

.button:hover {
  border-radius: 0%;
  box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
}
.button span {
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: 0.5s;
}

.button span:after {
  content: '\00bb';
  position: absolute;
  opacity: 0;
  top: 0;
  right: -20px;
  transition: 0.5s;
}

.button:hover span {
  padding-right: 25px;
}

.button:hover span:after {
  opacity: 1;
  right: 0;
}
.hovertext {
  position: relative;
  font-size:50px;
}

.hovertext:before {
  content: attr(data-hover);
  visibility: hidden;
  opacity: 0;
  width: 140px;
  background-color: white;
  color: black;
  text-align: center;
  border-radius: 5px;
  padding: 5px 0;
  transition: opacity 1s ease-in-out;

  position: absolute;
  z-index: 1;
  left: 0;
  top: 110%;
  font-size:30px;
}

.hovertext:hover {
  border-radius: 0%;
  box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
}

.hovertext:hover:before {
  opacity: 1;
  visibility: visible;
}
</style>
