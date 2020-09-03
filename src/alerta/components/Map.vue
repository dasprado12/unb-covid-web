<template>
    <div>
        <l-map style="height: 700px" :zoom="zoom" :center="center">
            <l-tile-layer :url="url"></l-tile-layer>
            <l-marker v-for="item in alerts" :lat-lng="item.user_location" :key="item.id">
                <l-popup >
                    <v-card flat>
                        <v-card-title>
                            <span> <h2>{{item.name | capitalize}}</h2></span><br>
                        </v-card-title>
                        <v-card-text>
                            <span>{{item.createdAt}}</span>
                        </v-card-text>
                        <v-card-actions>
                            <span><v-btn disabled text small> Investigar </v-btn> </span>
                        </v-card-actions>
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
    option: {
        color: "#3388ff"
    },
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
