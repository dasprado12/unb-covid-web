import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import * as VueGoogleMaps from 'vue2-google-maps'
import VueSession from 'vue-session'
import VueLocalStorage from 'vue-localstorage'
import MultiFiltersPlugin from './plugins/MultiFilters' 
import VueGoogleHeatmap from 'vue-google-heatmap';

let googleMapKey = 'AIzaSyDhD5AZQnSDAnu4K1qJiytbzk7v4m9N17k'

Vue.use(VueLocalStorage)

Vue.use( VueGoogleMaps, {
  load: {
    key: googleMapKey,
    libraries: ["places", "visualization"], 
  },
})

Vue.use(VueGoogleHeatmap, {
  apiKey: googleMapKey
});

Vue.use(VueSession)

Vue.use(MultiFiltersPlugin); 

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount("#app");

