<template>
    <div class="estados">
        <v-container>
            <v-row>
                <v-col cols="12" sm="2" md="2">
                    <v-card >
                        <v-toolbar color="teal" dark>
                            <v-app-bar-nav-icon></v-app-bar-nav-icon>
                            <v-toolbar-title>Estados</v-toolbar-title>
                        </v-toolbar>
                        <v-list>
                            <v-btn text @click="refresh()">Refresh</v-btn>
                            <v-list-group v-for="item in items" :key="item.title">
                                <template v-slot:activator>
                                    <v-list-item-content>
                                        <v-list-item-title v-text="item.title"></v-list-item-title>
                                    </v-list-item-content>
                                </template>
                                <v-list-item v-for="i in item.items" :key="i">
                                    <v-container fluid>
                                            <v-checkbox :key="i.title" v-model="selected" :label="i.title" :value="i.title" ></v-checkbox>
                                    </v-container>
                                </v-list-item>
                            </v-list-group>
                        </v-list>
                    </v-card>
                </v-col>
                <v-col cols="12" sm="10" md="10">
                    <v-card>
                        <v-tabs v-model="tab" centered>
                            <v-tab key="Brasil">Line</v-tab>
                                <v-divider class="mx-4" inset vertical/>
                            <v-tab key="Estados">Bar</v-tab>
                        </v-tabs>
                        <v-tabs-items v-model="tab">
                            <v-tab-item key="Brasil">
            <v-row >
                <v-col cols="12" sm="6" md="6" v-for="city in selected" :key="city">
                        <one-region v-bind:region="city"></one-region>
                </v-col>
            </v-row>
                            </v-tab-item>
                            <v-tab-item key="Estados">
                                <div class="estado-bar">
                                    <region
                                    v-bind:regions="selected"
                                    v-bind:key="keyNum"
                                    ></region>
                                </div>
                            </v-tab-item>
                        </v-tabs-items>
                    
                    </v-card>
                </v-col>
            </v-row>
        </v-container>

    </div>
</template>


<script>
import Dados from "../../../example/index.js";
import Region from "./charts/Region.vue";
import OneRegion from "./charts/OneRegion.vue";

export default {
    components: { Region, OneRegion },
    data(){
        return {
            tab: null,
            data: Dados.DF,
            drawer: true,
            keyNum:0,
        selected: [],    
        items: [
            {
                title: 'DF',
                items: [
                    { title: "ÁGUAS CLARAS" }, 
                    { title: "RECANTO DAS EMAS" }, 
                    { title: "SAMAMBAIA" }, 
                    { title: "TAGUATINGA" }, 
                    { title: "VICENTE PIRES" }, 
                    { title: "CENTRAL" }, 
                    { title: "SUDOESTE" }, 
                    { title: "PLANO PILOTO" }, 
                    { title: "SUDOESTE/OCTOGONAL" }, 
                    { title: "LAGO NORTE" }, 
                    { title: "LAGO SUL" }, 
                    { title: "VARJÃO DO TORTO" }, 
                    { title: "CENTRO SUL" }, 
                    { title: "CANDANGOLÂNDIA" }, 
                    { title: "PARKWAY" }, 
                    { title: "GUARÁ" }, 
                    { title: "NÚCLEO BANDEIRANTE" }, 
                    { title: "RIACHO FUNDO I" }, 
                    { title: "RIACHO FUNDO II" }, 
                    { title: "SCIA (ESTRUTURAL)" }, 
                    { title: "CRUZEIRO" }, 
                    { title: "NORTE" }, 
                    { title: "FERCAL" }, 
                    { title: "PLANALTINA" }, 
                    { title: "SOBRADINHO I" }, 
                    { title: "SOBRADINHO II" }, 
                    { title: "GAMA" }, 
                    { title: "SANTA MARIA" }, 
                    { title: "LESTE" }, 
                    { title: "JARDIM BOTÂNICO" }, 
                    { title: "ITAPOÃ" }, 
                    { title: "PARANOÁ" }, 
                    { title: "SÃO SEBASTIÃO" }, 
                    { title: "SUL" }, 
                    { title: "OESTE" }, 
                    { title: "BRAZLÂNDIA" }, 
                    { title: "CEILÂNDIA" }, 
                    { title: "POPULAÇÃO PRIVADA DE LIBERDADE" }, 
                    { title: "S I A" }, 
                    { title: "RA EM INVESTIGAÇÃO" }
                ],
            }   
        ],
        }
    },
    methods:{
        filter_dates(){
            let data = null
            let retorno = []
            for(let i = 0; i < this.data.length; i++){
                data = this.data[i].dataExtracao
                retorno.indexOf(data) === -1 ? retorno.push(data) : console.log("This item already exists");
            }
            this.dates = retorno
        },
        refresh(){
            this.keyNum++;
            console.log(this.keyNum);
        }
    }
}
</script>

<style scoped>
</style>
