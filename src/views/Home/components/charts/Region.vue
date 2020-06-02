<template>
    <div>
        <v-row>
            <v-col cols="12" md="2">
            </v-col>
            <v-col cols="12" md="8">
                <v-card>
                    <v-card-title>
                        DF
                    </v-card-title>
                <v-card-text>
                    <bar-chart
                        v-bind:infected="infectados"
                        v-bind:time="dates"
                        v-bind:death="obitos"
                        v-bind:region="regions"
                        :key="numId"
                    />
                </v-card-text>
                    <v-container fluid>
                            <v-row justify="space_around">
                                <v-checkbox class="mx-2" v-model="selected" label="Infectados" value="Infectados"></v-checkbox>
                                <v-checkbox v-model="selected" label="Obitos" value="Obitos"></v-checkbox>
                            </v-row>
                    </v-container>
                </v-card>
            </v-col>
            <v-col cols="12" md="2">
            </v-col>
        </v-row>
    </div>
</template>

<script>
import data from "../../../../example/index.js"
import dates from "../../../../example/dates.js"
import regions from "../../../../example/regions.js"
import barChart from "./BarChart.vue";

export default {
    components: { 
        barChart
    },
    data(){
        return {
            name: 'DF',
            selected: ['Infectados', 'Obitos'],
            dates: dates.dates,
            dados: data.DF,
            regions: regions.regions,
            dados_filtrados: {
                infectados: [],
                dia: [],
                obitos: []
            },
            infectados: [],
            dia: [],
            obitos: [],
            numId: 0
        }
    },
    computed: {
    },
    mounted(){
        this.filter_data()
        this.numId++
    },
    methods: {
        filter_data(){
            let tamanho = this.dates.length - 1;
            let day = this.dates[tamanho];
            

            //para cada regiao
            for(let i = 0; i < this.regions.length; i++ ){
                let infectados = 0
                let obitos = 0
                for(let j = 0; j < this.dados.length; j++){
                    //compara se a regiao coincide

                    if( this.regions[i] == this.dados[j].regiao.toUpperCase() ){
                        console.log(this.dados[j].dataExtracao);
                        //compara se a data coincide
                        if(day == this.dados[j].dataExtracao){
            
                        infectados += this.dados[j].num
                        obitos += this.dados[j].obitos
                        console.log("obitos "+ obitos);
                        }
                    }
                }
                this.dados_filtrados.infectados.push(infectados)
                this.dados_filtrados.obitos.push(obitos)
            }
            this.infectados = this.dados_filtrados.infectados
            this.obitos = this.dados_filtrados.obitos
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

<style scoped>
.selector{
    text-align: center;
    align-content: center;
}
</style>


