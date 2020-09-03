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
  created(){
    document.addEventListener('beforeunload', this.handler)
  },
  mounted: {
    handler(){
      localStorage.clear()
    }
  }
};
</script>
