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
  // beforeDestroy
  // destroyed(){
  //   localStorage.removeItem('user_token')
  //   alert('EU FUI DESTRUIDO')
  // }
};
</script>
