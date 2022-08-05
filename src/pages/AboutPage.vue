<template>
     <div class="container">
        <h1 class="title"><b>About</b></h1>
        <h2 v-show="contentExist"><b>{{ content }}</b></h2>

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