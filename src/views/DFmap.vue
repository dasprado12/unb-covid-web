<template>
    <div class="page">

        <v-tabs v-model="tab" center>
            <v-tab key="List" v-on:click="tabPressed = false">Lista</v-tab>
            <v-tab key="Graph" v-on:click="tabPressed = true">Grafico</v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
            <v-tab-item key="List">
                <div class="display">
                    <v-div>
                        <v-btn small @click="set_date(item)" v-for="item in datas" :key="item">
                            {{item.substr(5,5)}}
                        </v-btn>
                    </v-div>
                </div><br>

                <v-tabs v-model="tab2" center>
                    <v-tab key="table" v-on:click="tabPressed = false">Table</v-tab>
                    <v-tab key="map" v-on:click="tabPressed = true">Map</v-tab>
                </v-tabs>


                <v-tabs-items v-model="tab2">
                    <v-tab-item key="table">
                        <list-map v-bind:data="filtered_data"></list-map>
                    </v-tab-item>
                    <v-tab-item key="map">
                        <div class="nothingToDisplay">
                            Nada a mostrarrrrr
                        </div>
                    </v-tab-item>
                </v-tabs-items>
            </v-tab-item>
            <v-tab-item key="Graph">
                <div class="">
                    <regions v-bind:dados="dados"></regions>
                </div>
            </v-tab-item>
        </v-tabs-items>


    </div>
</template>

<script>
import locations from "../sesdf/index.js"
import listMap from "../components/Sesdf/List.vue"
import Regions from "../components/Sesdf/Regions.vue"

export default {
    components: { listMap, Regions },
    data(){
        return{
            tab: null,
            tab2: null,
            dados: locations.DF,
            datas: '',
            data_atual: '',
            data_inicio: '',
            data_final: ''
        }
    },
    computed: {
        filtered_data(){
            let data = this.data_atual
            let result = this.dados.filter( d => { let time = d.dataExtracao
                                    return ( time == data )} )
            return result
        }
    },
    mounted(){
        this.get_datas()
    },
    methods: {
        filter_data(value){
            let array = []
            for(let i = 0; i < this.dados.length; i++){
                if(this.dados[i].dataExtracao == value){
                    array.push(this.dados[i])
                }
            }
            return array
        },
        get_datas(){
            let data = null
            let retorno = []
            for(let i = 0; i < this.dados.length; i++){
                data = this.dados[i].dataExtracao

                retorno.indexOf(data) === -1 ? retorno.push(data) : console.log("This item already exists");

                
            }
            console.log(retorno)
            this.datas = retorno  
        },
        set_date(item){
            this.data_atual = item
        }
    }
    
}
</script>

<style scoped>
.display{
    font-size: 20px;
    border-radius: 25px;
    width: 100%;
    text-align: center;
}
.nothingToDisplay{
    text-align: center;
    background-color: rgb(226, 103, 103);
}
</style>