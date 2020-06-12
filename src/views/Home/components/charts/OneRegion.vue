<template>
    <div>
        <v-card flat>
            <v-card-title>
                {{ region }}
            </v-card-title>
            <v-card-text>
                <line-chart
                    v-bind:infected="filtrado_inf.data"
                    v-bind:time="dates"
                    v-bind:death="filtrado_obt.data"
                    :key="numId"
                />
            </v-card-text>
            <v-card-text>
                <v-container fluid>
                        <v-row justify="space_around">
                            <v-checkbox v-model="selected" label="Infectados" value="Infectados"></v-checkbox>
                            <v-checkbox v-model="selected" label="Obitos" value="Obitos"></v-checkbox>
                        </v-row>
                </v-container>
            </v-card-text>
        </v-card>
    </div>
</template>
<script>
import LineChart from "./LineChart.vue";
import data from "../../../../example/index.js"
import dates from "../../../../example/dates.js"

export default {
    components: { LineChart },
    props: [ 
        'region'
    ],
    data(){
        return{
            dados: data.DF,
            numId: 0,
            dates: dates.dates,
            selected: ['Infectados', 'Obitos'],
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
            
        }
    },
    created(){
        this.filter_data()
        this.numId++
    },
    methods: {
        filter_data(){
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
                if(this.dados[i].regiao.toUpperCase() == this.region){
                    this.selecionado = this.dados[i].regiao
                    this.filtrado_inf.data.push(this.dados[i].num)
                    this.filtrado_obt.data.push(this.dados[i].obitos)
                }
            }
            this.filtrado_inf.time = this.dates
            this.numId++
        }
    },
    watch: {
        selected: function(val) {
            if( !val.includes('Obitos') ){
                this.obitos = [0]
                this.numId++
            }
            if( val.includes('Obitos') ){
                this.obitos = this.dados_filtrados.obitos
                this.numId++
            }
            if( !val.includes('Infectados') ){
                this.infectados = [0]
                this.numId++
            }
            if( val.includes('Infectados') ){
                this.infectados = this.dados_filtrados.infectados
                this.numId++
            }
        }
    }
}
</script>