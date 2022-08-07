<template>
     <div class="container">
        <h1 class="title"><b>About</b></h1>
        <h2 v-show="contentExist"><b>{{ content }}</b></h2>
        <h2 v-if="contentExist"><a href="https://web-development-environments-2022.github.io/205795016/"><b style="background: antiquewhite">The code chewer first site ever</b></a></h2>
        <h2 v-if="contentExist"><a href="https://web-development-environments-2022.github.io/311163018"><b style="background: antiquewhite">The debugger tinder site for Iver the dog</b></a></h2>
        <h2 v-if="contentExist"><a href="https://web-development-environments-2022.github.io/205795016_311163018/"><b style="background: antiquewhite">PacMan has never been so addictive</b></a></h2>
        <h2 v-if="contentExist"><router-link :to="{ name: 'notFound'}"><b style="background: antiquewhite">And Our BIGGEST And MOST impressive project so far</b></router-link></h2>

     </div>
</template>
<script>
export default {
    name: "About",
    data(){
        return {
            content: ""
        }
    },
    methods: {
    contentExist(){
      return this.content.length >=1;
    },
    async getAbout(){
        try{
            const response = await this.axios.get(
            "http://localhost:3000" +"/about",{withCredentials: true}
        );
        console.log(response)

        const res_data = response.data;
        console.log("28,res_data : ",res_data);
        console.log(res_data);
        this.content = res_data;
    }
     catch (err) {
        console.log(err.response);
        console.log(err);
      }
    },
},
  mounted: function(){
    this.$nextTick(this.getAbout)
  },
};
</script>