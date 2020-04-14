import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import * as VueGoogleMaps from 'vue2-google-maps'
import VueSession from 'vue-session'
import VueLocalStorage from 'vue-localstorage'

Vue.use(VueLocalStorage)

Vue.use( VueGoogleMaps, {
  load: {
    key: 'AIzaSyDhD5AZQnSDAnu4K1qJiytbzk7v4m9N17k',
    libraries: ["places", "visualization"], 
  },
})

Vue.use(VueSession)

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount("#app");
