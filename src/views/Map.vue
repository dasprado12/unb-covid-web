<template>
    <div class="">    
        <v-container>
            <v-card-text>
                <v-row>
                    <v-col md="5" sm="5">
                    <v-menu
                        ref="inicioMenu"
                        v-model="inicio.menu"
                        :close-on-content-click="false"
                        max-width="290px"
                        min-width="290px"
                    >
                        <template v-slot:activator="{ on }">
                            <v-text-field
                                v-model="inicio.date"
                                label="Inicio"
                                persistent-hint
                                prepend-icon="mdi-calendar"
                                @blur="inicio.date = parseDate(dateFormatted)"
                                v-on="on"
                            ></v-text-field>
                        </template>
                        <v-date-picker v-model="inicio.date" no-title @input="inicio.menu = false"></v-date-picker>
                    </v-menu>
                    </v-col>
                    <v-col md="5" sm="5">
                    <v-menu
                        ref="inicioMenu"
                        v-model="final.menu"
                        :close-on-content-click="false"
                        max-width="290px"
                        min-width="290px"
                    >
                        <template v-slot:activator="{ on }">
                            <v-text-field
                                v-model="final.date"
                                label="Final"
                                persistent-hint
                                prepend-icon="mdi-calendar"
                                @blur="final.date = parseDate(dateFormatted)"
                                v-on="on"
                            ></v-text-field>
                        </template>
                        <v-date-picker v-model="final.date" no-title @input="final.menu = false"></v-date-picker>
                    </v-menu>
                    </v-col>
                    <v-col md="2" sm="2" class="padding-button"
                    @click="refreshDate()">
                        <v-btn block>Zerar</v-btn>
                    </v-col>
                </v-row>
            </v-card-text>
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
                <gmap-marker 
                    v-for="item in filteredPoints" :key="item.id" 
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
let NewHelp = new Help();

export default {
        name: 'my-map',
        data (){
            return {
                inicio: {
                    menu: '',
                    date: '',
                },
                final: {
                    menu: '',
                    date: '',
                },
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
    computed: {
        filteredPoints(){
            let search = this.coordinates
            let inicio = null
            let fim = null
            if( this.inicio.date.length == 0 ){
                inicio = new Date().getFullYear() - 5
            }else{
                inicio = new Date(this.inicio.date)
            }
            if( this.final.date.length == 0 ){
                fim = new Date()
            }else{
                fim = new Date(this.final.date)
            }
            let result = search.filter( d => { let time = new Date(d.createdAt)
                                    return ( inicio <= time && time < fim )} )
            return result
        }
    },
    methods:{
        refreshDate(){
            this.inicio.date = ''
            this.final.date = ''
            this.filteredPoints()
        },
        async list_alerts(){
            let alerta = (await NewHelp.get_helps()).data
            alerta.sort( function(a,b) {
                return new Date(a.createdAt) - new Date(b.createdAt)
            } )
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

.padding-button{
    padding-top: 24px;
}
</style>