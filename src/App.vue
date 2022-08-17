
<template>
  <div id="app">
    <div id="nav">
      <ul class="nav">
        <li class="nav-item">
          <b-nav-item>
          <router-link :to="{ name: 'main' }"><b>Foodify &#127829;&#127843;&#127839;&#127828;</b></router-link>
          </b-nav-item>
        </li>
        <li class="nav-item">
          <b-nav-item>
          <router-link :to="{ name: 'About' }">About</router-link>
          </b-nav-item>
        </li>
        <li class="nav-item">
          <b-nav-item>

          <span v-if="!$root.store.username">
           Hello Guest  
            <router-link :to="{ name: 'register' }">Register</router-link>
            <a></a>
            <router-link :to="{ name: 'login' }">Login</router-link>
          </span>
          
          <span v-else>
            &#128081;{{ $root.store.username }} : <button @click="Logout">Logout</button>
            <router-link :to="{ name: 'create' }">Create Recipe</router-link>
          </span>
          </b-nav-item>

        </li>
        <li class="nav-item" v-if="$root.store.username">
            <b-nav-item-dropdown >
              <template #button-content>
                User 
              </template>
              <b-dropdown-item ><router-link :to="{ name: 'Favorites' }">Favorites</router-link></b-dropdown-item>
              <b-dropdown-item ><router-link :to="{ name: 'Private' }">Private</router-link></b-dropdown-item>
              <b-dropdown-item ><router-link :to="{ name: 'Family' }">Family</router-link></b-dropdown-item>
            </b-nav-item-dropdown>
            
        </li>
        
        <!-- <li class="nav-item">

          <form class="form-inline my-2 my-lg-0">
            <input class="search_input" type="search" placeholder="Quick Search" aria-label="Search">
            <button class="search_btn" type="submit">Search</button>

          </form>

        </li> -->
        <li class="nav-item">
          <b-nav-item>
          <router-link :to="{ name: 'search' }" style="position: absolute; right:10vw;"><b> Search &#128083;&#128270;</b></router-link>
          &#127827;&#127815;&#127821;&#127817;&#127820;&#127826;
          </b-nav-item>
        </li>
      </ul>
      
    </div>

    <router-view />

  </div>

  
</template>

<script>
export default {
  name: "App",
  methods: {
    async Logout() {
      this.$root.store.logout();
      try {
        
        const response = await this.axios.post(
          // "https://test-for-3-2.herokuapp.com/user/Login",
          // this.$root.store.server_domain +"/Login",
          "http://localhost:3000" +"/Logout",           
          // "http://132.72.65.211:80/Login",
          // "http://132.73.84.100:80/Login",

          {
            
          }
        );
        this.$root.store.logout();
        this.$root.toast("Logout", "User logged out successfully", "success");
        localStorage.clear();
      } catch (err) {
        console.log(err);
      }      
      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
    }
  }
};
</script>


<style lang="scss">
@import "@/scss/form-style.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 20px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #040705;
  min-height: 100vh;
  width: 100%;
  background-image: url("./assets/OmriBack.jpg");
  // background-image: url("https://t4.ftcdn.net/jpg/04/18/75/65/360_F_418756555_8rIk7lbPvAlRErWmPMeMHqilhCHzYLWW.jpg");
  background-repeat: no-repeat;
  // background-size: 2000px 1000px;
}


#nav {
  padding: 5px;
  background: #C0C0C0;

}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav li{
  padding-left: 5px;
}

#nav li span a{
  padding-left: 15px;
}

#nav li form {
  padding-left: 1300px;
}

#nav a.router-link-exact-active {
  color: black;
}
</style>
