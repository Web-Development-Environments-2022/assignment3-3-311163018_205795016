
<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link :to="{ name: 'main' }">Foodify</router-link>|
      <router-link :to="{ name: 'search' }">Search</router-link>|
      {{ !$root.store.username }}
      <span v-if="!$root.store.username">
        Guest:
        <router-link :to="{ name: 'register' }">Register</router-link>|
        <router-link :to="{ name: 'login' }">Login</router-link>|
      </span>
      <span v-else>
        {{ $root.store.username }}: <button @click="Logout">Logout</button>|
      </span>
    </div> -->
    <div id="nav">
      <ul class="nav">
        <li class="nav-item">
          <router-link :to="{ name: 'main' }">Foodify</router-link>

          <!-- <a class="nav-link active" href="#">Active</a> -->
        </li>
        <li class="nav-item">
          <router-link :to="{ name: 'search' }">Search</router-link>
          {{ !$root.store.username }}
        </li>
        <li class="nav-item">
          <span v-if="!$root.store.username">
            Guest:
            <router-link :to="{ name: 'register' }">Register</router-link>
            <a></a>
            <router-link :to="{ name: 'login' }">Login</router-link>
          </span>
          <span v-else>
            {{ $root.store.username }}: <button @click="Logout">Logout</button>|
          </span>
        </li>
        <li class="nav-item">

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
    Logout() {
      this.$root.store.logout();
      this.$root.toast("Logout", "User logged out successfully", "success");

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
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
}


#nav {
  padding: 15px;
  background: #5d7fdd;

}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav li{
  padding-left: 15px;
}

#nav li span a{
  padding-left: 10px;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
