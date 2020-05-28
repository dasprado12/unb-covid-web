<template>
    <div class="regions">
        <v-card>
            <v-card-title>
                <lista-ra 
                    v-bind:regioes="regioes"
                    v-on:childToParent="onChildClick"    
                />
                <v-spacer></v-spacer>
                <div>
                    {{ selecionado }}
                </div>
            </v-card-title>
        <line-chart
            v-bind:data_inf="filtrado_inf.data"
            v-bind:time_inf="filtrado_inf.time"
            v-bind:name_inf="filtrado_inf.name"
            v-bind:data_obt="filtrado_obt.data"
            v-bind:time_obt="filtrado_obt.time"
            v-bind:name_obt="filtrado_obt.name"
            :key="numId"
        />
        </v-card>
    </div>
</template>

<script>
import LineChart from "./Graph/LineChart.vue"
import ListaRa from "./ListRA.vue"

export default {
    name: 'regions',
    props: [ 'dados' ],
    components: { LineChart, ListaRa },
    data(){
        return{
            regioes: [],
            selecionado: '',
            filtrado_inf: {
                data: [],
                time: [],
                name: 'chart'
            },
            filtrado_obt: {
                data: [],
                time: [],
                name: 'chart'
            },
            numId: 1,
        }
    },
    mounted(){
        this.filter_regions()
    },
    computed: {

    },
    methods: {
        onChildClick (item) {
            this.filter_data(item)
        },
        filter_regions(){
            let regioes = []
            let data = null
            for(let i = 0; i < this.dados.length; i++){
                data = this.dados[i].regiao.toUpperCase()
                regioes.indexOf(data) === -1 ? regioes.push(data) : console.log("This item already exists");
            }
            this.regioes = regioes
        },
        filter_data(value){
            this.filtrado_inf = {
                data: [],
                time: [],
                name: 'chart'
            },
            this.filtrado_obt = {
                data: [],
                time: [],
                name: 'chart'
            }
            for(let i = 0; i < this.dados.length; i++){
                if(this.dados[i].regiao.toUpperCase() == value){
                    this.selecionado = this.dados[i].regiao
                    this.filtrado_inf.data.push(this.dados[i].num)
                    this.filtrado_inf.time.push(this.dados[i].dataExtracao)
                    this.filtrado_inf.name = this.dados[i].regiao
                    this.filtrado_obt.data.push(this.dados[i].obitos)
                    this.filtrado_obt.time.push(this.dados[i].dataExtracao)
                    this.filtrado_obt.name = this.dados[i].regiao
                }
            }
            this.numId++
        }
    }
}
</script>

<style scoped>
#RA_name{
    margin-top: 15px;
    margin-bottom: 15px;
    font-size: 25px;
}
</style>