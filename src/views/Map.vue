<template>
    <div class="">    
        <v-container>

            <v-menu offset-y>
                <template v-slot:activator="{ on }">
                    <v-btn  v-on="on">
                        {{ current_city }}
                    </v-btn>
                </template>
                <v-list>
                    <v-list-item v-for="(item, index) in cities" :key="index" @click="overlay(item)">
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu><br><br>
    
            <gmap-map 
                ref="mymap" 
                :center="mapConfig.startLocation" 
                :zoom="mapConfig.zoom" 
                style="width: 100%; height: 1000px;"
            >  
                <v-dialog width="50%" v-model="dialog">
                    <v-card>
                        <v-card-title>
                            {{ userAlert.name }}
                        </v-card-title>
                        <v-card-text>
                            <p> Criação: {{ userAlert.createdAt }} </p>
                            <p> Whatsapp: {{ userAlert.whatsapp }} </p>
                            <p> Sintomas: {{ userAlert.sintoms }} </p>
                        </v-card-text>
                    </v-card>
                </v-dialog>
                <gmap-polygon :paths="paths"></gmap-polygon>
                <gmap-marker 
                    v-for="item in coordinates" :key="item.id" 
                    :position="getPosition(item)" 
                    @click="toggleInfo(item)"
                    :clickable="true"
                    :icon="colorMarker(item)"
                />
            </gmap-map>
        </v-container>
    </div>
</template>

<script>
import { Help } from "../functions/index.js"
import cities from "../components/Map/locations/DF.js"
let NewHelp = new Help();

export default {
    name: 'map',
        data (){
            return {
                items: [
                    { title: 'Home', icon: 'mdi-dashboard' },
                    { title: 'About', icon: 'mdi-accent' },
                ],
                paths: null,
                cities: [
                    { title: 'Cidades', key: '' },
                    { title: 'Aguas Claras', key: 'aguas_claras' },
                    { title: 'Plano Piloto', key: 'plano_piloto' }
                ],
                current_city: 'Cidades',
                dialog: false,
                mapConfig: {
                    colorMarkers: {
                        red: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
                        yellow: "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png",
                        green: "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
                    },
                    zoom: 15,
                    startLocation: {
                        lat: -15.7639579,
                        lng: -47.8692740,
                    },
                },
                coordinates: [],
                userAlert: {
                    id: null,
                    name: null,
                    sintoms: null,
                    whatsapp: null,
                    user_location: null,
                    createdAt: null,
                    updateAt: null
                }
            }
        },
    async mounted(){
        this.list_alerts();
    },
    methods:{
        overlay(cidade){
            let key = cidade['key']
            if(key == ''){
                this.current_city = cidade.title
                this.paths = 'oi'
            }else{
                this.current_city = cidade.title
                this.paths = cities[key]
            }
        },
        async list_alerts(){
        let alerta = (await NewHelp.get_helps()).data
            this.coordinates = alerta
        },
        colorMarker(alerta){
            let amountAlerts = alerta.sintoms.split(',').length
            if(alerta.sintoms == 'Falta de ar'){
                return "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
            }else if(amountAlerts == 1){
                return "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
            }else if(amountAlerts == 2){
                return "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
            }else if(amountAlerts > 2){
                return "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
            }
        
        },
        getPosition: function(marker) {
            let location = marker.user_location.split(",")
            let latitude = location[0]
            let longitude = location[1]
            return {
                lat: parseFloat(latitude),
                lng: parseFloat(longitude)
            }
        },
        toggleInfo: function(marker) {
            this.dialog = true
            this.mapConfig.startLocation = this.getPosition(marker);
            this.userAlert = Object.assign({}, marker)
            }
    },
    
}
</script>

<style scoped>
.name_alert{
  color: black;
}
</style>