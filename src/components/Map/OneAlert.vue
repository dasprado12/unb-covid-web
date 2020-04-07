<template>
    <div class="map">
    <v-container>
        <v-row>
            <v-col cols="12">
                <div class="">
                    <v-menu top :offset-y="offset">
                        <template v-slot:activator="{ on }">
                            <v-btn
                            color="grey"
                            dark
                            v-on="on"
                            outlined
                            >
                            Alerta: {{ opcaoSelecionada }}
                            </v-btn>
                        </template>
                        <v-list>
                            <v-list-item
                            v-for="(item, index) in items"
                            :key="index"
                            @click="trocarOpcao(item)"
                            >
                            <v-list-item-title>{{ item.title }}</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </div>
            </v-col>
            <v-col cols="12">
                <gmap-map 
                ref="mymap" 
                :center="startLocation" 
                :zoom="zoom" 
                style="width: 100%; height: 700px"
                :shape="shape"
                >

                <gmap-info-window 
                :options="infoOptions" 
                :position="infoPosition" 
                :opened="infoOpened" 
                @closeclick="infoOpened=false"
                >
                    <h3> User: {{ infoContent_user }} </h3>  
                    <p> Assignee: {{ infoContent_assignee }} </p>                    
                    <v-btn text="" @click="seeUser(infoContent_user)">
                        Assinar
                    </v-btn>
                </gmap-info-window>

                <gmap-marker 
                v-for="(item, key) in coordinates" :key="key" 
                :position="getPosition(item)" 
                :clickable="true" 
                @click="toggleInfo(item, key)" />
                </gmap-map>
            </v-col>
        </v-row>
    </v-container>

    </div>
</template>

<script>
// import { Alert } from "../../funcoes/index.js";
// // import AlertCard from "./Map/AlertCard.vue";

// const markers = new Alert();
// export default {
//     name: 'map',
//         data (){
//             return {
//                 items: [
//                     { title: 'ABERTO' },
//                     { title: 'EM ANDAMENTO' },
//                     { title: 'FECHADO' }
//                 ],
//                 opcaoSelecionada: 'ABERTO',
//                 offset: true, 
//                 startLocation: {
//                     lat: -15.7639579,
//                     lng: -47.8692740,
//                 },
//             shape: {
//                 coords: [10, 10, 10, 15, 15, 15, 15, 10],
//                 type: 'poly'
//             },
//                 zoom: 15,
//                 coordinates: [],
//                 infoPosition: null,
//                 infoOpened: false,
//                 infoCurrentKey: null,
//                 infoContent_user: null,
//                 infoContent_assignee: null,
//                 infoContent_id: null,
//                 infoOptions: {
//                 pixelOffset: {
//                     width: 0,
//                     height: -35
//                 }
//                 },
//         }
//     },
//     async created(){
//         this.coordinates = (await markers.getAlerts(this.opcaoSelecionada)).data
//         console.log("Coordenadas: ", this.coordinates)
//     },
//     methods:{
//         async getAlerts(item){
//             this.coordinates = (await markers.getAlerts(item)).data;
//         },
//         getPosition: function(marker) {
//             return {
//                 lat: parseFloat(marker.data[0].latitude),
//                 lng: parseFloat(marker.data[0].longitude)
//             }
//         },
//         toggleInfo: function(marker, key) {
//             this.infoPosition = this.getPosition(marker);
//             this.infoContent_user = marker.user;
//             this.infoContent_assignee = marker.assignee;
//             this.infoContent_id = marker.alert_id;
//             if (this.infoCurrentKey == key) {
//                 this.infoOpened = !this.infoOpened;
//             } else {
//                 this.infoOpened = true;
//                 this.infoCurrentKey = key;
//             }
//         },
//         trocarOpcao(item){
//             this.opcaoSelecionada = item.title
//             this.getAlerts(item.title)
//         },
//         assigneeAlert(user_id){
//             console.log(user_id)
//         },
//         seeUser(nome){
//             this.router.push({ name: 'usuario', params: { contractId: 123 }})

//             console.log(nome)
//         }
//     }
// }
</script>
