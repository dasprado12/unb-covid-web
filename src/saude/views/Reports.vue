<template>
    <div class="alerts">
        <v-card>
            <v-tabs v-model="tab">
                <v-tab key="Data">Data</v-tab>
                <v-divider class="mx-4" inset vertical/>
                <v-tab key="Status">Status</v-tab>
                <v-divider class="mx-4" inset vertical/> 
                <v-tab key="List">Lista</v-tab>
                <v-divider class="mx-4" inset vertical/> 
                <v-tab key="Map">Mapa</v-tab>
            </v-tabs>
        </v-card>
        
        <v-card class="content">
            <v-tabs-items v-model="tab">
                <v-tab-item key="Data">
                    <raw-data :alerts="alerts"></raw-data>
                </v-tab-item>
                <v-tab-item key="Status">
                    <status :alerts="alerts"></status>
                </v-tab-item>
                <v-tab-item key="List">
                    <lista :alerts="alerts"></lista>
                </v-tab-item>
                <v-tab-item key="Map">
                    <mapa :alerts="alerts"></mapa>
                </v-tab-item>
            </v-tabs-items>
        </v-card>
    </div>
</template>

<script>
import RawData from "../components/Data.vue"
import Status from "../components/Status.vue"
import Lista from "../components/List.vue"
import Mapa from "../components/Map.vue"

// let sos = new Sos()

export default {
    components: { Lista, Mapa, Status, RawData },
    data(){
        return {
            tab: null,
            alerts: []
        }
    },
    async mounted(){
        this.get_alerts()
    },
    methods: {
        async get_alerts(){
            // this.alerts = (await sos.get_sos()).data
            this.alerts = [
                { id: 1, name: "Daniel Prado", symptoms: [ "Shortness of Breath" ], whatsapp: "(61)996288109", createdAt: "2020-09-05T12:24", user_location: { lat: -15.677825, lng: -48.200378 } },
                { id: 2, name: "Lucas Almeida", symptoms: [ "Headache" ], whatsapp: "(61)984277568", createdAt: "2020-09-08T13:25", user_location: { lat: -15.7881243, lng: -47.8886533 } },
                { id: 3, name: "Jonathas Alves", symptoms: [ "Headache", "Cough" ], whatsapp: "(61)984277568", createdAt: "2020-09-18T18:25", user_location: { lat: -15.7781243, lng: -47.8887554 } },
                { id: 4, name: "Natália Marques", symptoms: [ "Fever" ], whatsapp: "(61)984277568", createdAt: "2020-09-19T19:18", user_location: { lat: -15.9370083, lng: -48.0316865 } },
                { id: 5, name: "Francisco Caldas", symptoms: [ "Headache", "Chest Pain" ], whatsapp: "(61)984277568", createdAt: "2020-09-29T20:15", user_location: { lat: -15.8197544, lng: -47.9119445 } },
                { id: 6, name: "Lucas Martins", symptoms: [ "Chest Pain", "Sneeze" ], whatsapp: "(61)984277568", createdAt: "2020-10-01T08:47", user_location: { lat: -15.7958708, lng: -47.9375816 } },
                { id: 7, name: "Nayara Silva", symptoms: [ "Headache" ], whatsapp: "(61)984277568", createdAt: "2020-10-05T11:29", user_location: { lat: -15.8287442, lng: -48.1103061 } },
                { id: 8, name: "Timóteo Sousa", symptoms: [ "Chest Pain" ], whatsapp: "(61)984277568", createdAt: "2020-10-05T12:35", user_location: { lat: -15.8370083, lng: -48.0116865 } },
                { id: 9, name: "Paulo Mendes", symptoms: [ "Fever" ], whatsapp: "(61)984277568", createdAt: "2020-10-05T13:18", user_location: { lat: -15.8079534, lng: -48.0699521 } },
                { id: 10, name: "Leonardo Almeida", symptoms: [ "Diarrhea" ], whatsapp: "(61)984277568", createdAt: "2020-10-06T13:59", user_location: { lat: -15.6472881, lng: -47.7975552 } },
                { id: 11, name: "Maria Flávia", symptoms: [ "Chest Pain" ], whatsapp: "(61)984277568", createdAt: "2020-10-06T14:12", user_location: { lat: -15.6298814, lng: -47.6482754 } },
                { id: 12, name: "André Cavalcanti", symptoms: [ "Fatigue", "Chest Pain" ], whatsapp: "(61)984277568", createdAt: "2020-10-06T14:58", user_location: { lat: -15.8186697, lng: -47.7853781 } },
            ]
        }
    },
}
</script>

<style scoped>
.content{
    margin-top: 1%;
}
</style>