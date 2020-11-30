<template>
    <div class="alerts">
        <v-card>
            <v-tabs v-model="tab">
                <v-tab key="Brasil">Lista</v-tab>
                    <v-divider class="mx-4" inset vertical/>
                <v-tab key="Estados">Mapa</v-tab>
            </v-tabs>
        </v-card>
        
        <v-card class="content">
            <v-tabs-items v-model="tab">
                <v-tab-item key="Brasil">
                    <lista v-bind:alerts="alerts"></lista>
                </v-tab-item>
                <v-tab-item key="Estados">
                    <div>
                        <mapa :alerts="alerts"></mapa>
                    </div>
                </v-tab-item>
            </v-tabs-items>
        </v-card>
    </div>
</template>

<script>
import { Sos } from "../../functions/index.js"
import Lista from "../components/List.vue"
import Mapa from "../components/Map.vue"

let sos = new Sos()

export default {
    components: { Lista, Mapa },
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
            this.alerts = (await sos.get_sos()).data
        }
    },
}
</script>

<style scoped>
.content{
    margin-top: 1%;
}
</style>