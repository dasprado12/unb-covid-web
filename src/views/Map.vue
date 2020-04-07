<template>
    <div class="">
        <v-container>
            <gmap-map 
            ref="mymap" 
            :center="startLocation" 
            :zoom="zoom" 
            style="width: 100%; height: 900px;"
            :shape="shape"
            >  
                <gmap-marker 
                v-for="(item, key) in coordinates" :key="key" 
                :position="getPosition(item)" 
                @click="toggleInfo(item, key)"
                :clickable="true" 
                />
            </gmap-map>
        </v-container>
    </div>
</template>

<script>
import { Help } from "../functions/index.js"

let NewHelp = new Help();


export default {
    name: 'map',
        data (){
            return {
                help_request: 'oi',
                items: [
                    { title: 'ABERTO' },
                    { title: 'EM ANDAMENTO' },
                    { title: 'FECHADO' }
                ],
                marker: {
                    lat: 50.60229509638775,
                    lng: 3.0247059387528408
                },
                opcaoSelecionada: 'ABERTO',
                offset: true, 
                startLocation: {
                    lat: -15.7639579,
                    lng: -47.8692740,
                },
            shape: {
                coords: [10, 10, 10, 15, 15, 15, 15, 10],
                type: 'poly'
            },
                zoom: 15,
                coordinates: [],
                infoPosition: null,
                infoOpened: false,
                infoCurrentKey: null,
                infoContent_user: null,
                infoContent_assignee: null,
                infoContent_id: null,
                infoOptions: {
                pixelOffset: {
                    width: 0,
                    height: -35
                }
                },
        }
    },
    async mounted(){
        this.list_alerts();
    },
    methods:{
      async list_alerts(){
        let alerta = (await NewHelp.get_helps()).data
        this.coordinates = alerta
        let location = alerta.user_location.split(",")
        let latitude = location[0]
        let longitude = location[1]
        console.log(latitude, longitude)
      },
        getPosition: function(marker) {
            let location = marker.user_location.split(",")
            let latitude = location[0]
            let longitude = location[1]
            console.log(latitude, longitude)
            console.log(marker)
            return {
                lat: parseFloat(latitude),
                lng: parseFloat(longitude)
            }
        },
        // toggleInfo: function(marker, key) {
        //     this.infoPosition = this.getPosition(marker);
        //     this.infoContent_user = marker.user;
        //     this.infoContent_assignee = marker.assignee;
        //     this.infoContent_id = marker.alert_id;
        //     if (this.infoCurrentKey == key) {
        //         this.infoOpened = !this.infoOpened;
        //     } else {
        //         this.infoOpened = true;
        //         this.infoCurrentKey = key;
        //     }
        // },
        // trocarOpcao(item){
        //     this.opcaoSelecionada = item.title
        //     this.getAlerts(item.title)
        // },
        // assigneeAlert(user_id){
        //     console.log(user_id)
        // },
        // seeUser(nome){
        //     this.router.push({ name: 'usuario', params: { contractId: 123 }})

        //     console.log(nome)
        // }
    }
}
</script>

<style scoped>
.name_alert{
    color: black;
}
</style>
