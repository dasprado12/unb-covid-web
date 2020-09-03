<template><div>
  <l-map style="height: 700px" :zoom="zoom" :center="center">
    <l-tile-layer :url="url"></l-tile-layer>
    <l-marker v-for="item in alerts" :lat-lng="item.user_location" :key="item.id">
      <l-popup>
        <v-card>
          <span>{{item.name}}</span><br>
          <span>{{item.createdAt | currentDate}}</span><br>
          <span>{{item.createdAt | currentTime}}</span>
          <span><v-btn  small>teste</v-btn> </span>
        </v-card>
      </l-popup>
    </l-marker>
  </l-map>
</div>
</template>

<script>
import {LMap, LTileLayer, LMarker, LPopup} from 'vue2-leaflet';

export default {
  props: [ 'alerts' ],
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup
  },
  data () {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      zoom: 11,
      center: {
        lat: -15.8157877,
        lng: -48.0999646
      },
      markerLatLng: [47.313220, -1.319482]
    };
  },
  mounted() {
    this.createMarkers()
  },
  methods: {
    createMarkers(){
      let data = this.alerts
      // console.log(data)
      for(let i = 0; i < data.length; i++){
        data[i].user_location = JSON.parse(data[i].user_location)
        data[i].user_location.lat = data[i].user_location.latitude
        data[i].user_location.lng = data[i].user_location.longitude
      }
      this.alerts = data
    }
  }
}
</script>
