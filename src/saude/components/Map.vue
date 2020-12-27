<template>
    <div>
        <l-map style="height: 700px" :zoom="mapConfig.zoom" :center="mapConfig.center">
            <l-tile-layer :url="mapConfig.url"></l-tile-layer>
            <l-marker v-for="item in alerts" :lat-lng="item.user_location" :key="item.id">
                <l-popup >
                    <v-card width="600" flat>
                        <v-card-title>
                            <!-- <span> <h2>{{item.name | capitalize}}</h2></span><br> -->
                        </v-card-title>
                        <v-card-text>
                            <span>{{item.createdAt | datetime}}</span>
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
import { LMap, LTileLayer, LMarker, LPopup } from 'vue2-leaflet';

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
        mapConfig: {
            url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            zoom: 10,
            center: {
                lat: -15.7431235,
                lng: -47.8288423
            },
        },
    };
},
mounted() {
    this.createMarkers()
},
methods: {
    createMarkers(){
        let data = this.alerts
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
