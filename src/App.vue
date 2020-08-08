<template>
  <div>
    <router-view></router-view>
  </div>
</template>



<script>
export default {
  name: "App",
  data(){
    return {

    }
  },
  methods:{
    get_url(){

    }
  },
  created(){
    console.log(process.env.VUE_APP_URL)
  }
};
</script>
