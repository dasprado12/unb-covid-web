import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import * as VueGoogleMaps from "vue2-google-maps";
import VueSession from "vue-session";
import VueLocalStorage from "vue-localstorage";
import MultiFiltersPlugin from "./plugins/MultiFilters";
import VueGoogleHeatmap from "vue-google-heatmap";
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';

// eslint-disable-next-line  
delete L.Icon.Default.prototype._getIconUrl  
// eslint-disable-next-line  
L.Icon.Default.mergeOptions({  
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),  
  iconUrl: require('leaflet/dist/images/marker-icon.png'),  
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')  
})

let googleMapKey = "AIzaSyDhD5AZQnSDAnu4K1qJiytbzk7v4m9N17k";

Vue.use(VueLocalStorage);

Vue.component('l-map', LMap);
Vue.component('l-tile-layer', LTileLayer);
Vue.component('l-marker', LMarker);

Vue.use(VueGoogleMaps, {
  load: {
    key: googleMapKey,
    libraries: ["places", "visualization"]
  }
});

Vue.use(VueGoogleHeatmap, {
  apiKey: googleMapKey
});

Vue.use(VueSession);

Vue.use(MultiFiltersPlugin);

Vue.config.productionTip = false;

Vue.filter('age', function(value) {
  let year = parseInt(value.substr(-4))
  let current = new Date().getFullYear()
  return current - year
})

Vue.filter('capitalize', function(value){
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})

Vue.filter('datetime', function(value){
  return new Date(value)
})

Vue.filter('currentDate', function(value){
  let time = new Date(value)
  return `${time.getDay()}/${time.getMonth()}/${time.getFullYear()}`
})

Vue.filter('currentTime', function(value){
  let time = new Date(value) 
  return time.getHours() + "h" + time.getMinutes()+"m"+time.getSeconds()+"s"
})

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount("#app");
