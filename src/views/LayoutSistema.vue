<template>
  <v-app class="grey lighten-4">
    <Toolbar/>
      <v-content class="mx-6 mb-4"><br>
          <router-view></router-view>
      </v-content>
    <Footer/>
  </v-app>
</template>



<script>
import Toolbar from "./System/components/Toolbar"
import Footer from "./System/components/Footer.vue"

export default {
  components: {
    Toolbar,
    Footer
  },

  data: () => ({
    //
  })
};
</script>
