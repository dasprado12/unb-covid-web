<template>
    <div id="app">
    <v-card-title>
        <div id="RA_name">
        </div>
    </v-card-title>

        <vue-apex-charts 
            width="100%" 
            type="line" 
            :options="options" 
            :series="series"
        ></vue-apex-charts>

    </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'

export default {
    props: [ 
        'data_inf', 'time_inf', 'name_inf', 
        'data_obt', 'time_obt', 'name_obt' 
    ],
    components: {
        VueApexCharts
    },
    data(){
        return {
            options: {
                stroke: {
                    curve: 'smooth',
                },
                colors: [ '#2E93fA', '#c21f1f' ],
                chart: {
                    id: 'vuechart-example'
                },
                xaxis: {
                    categories: this.time_inf
                }
            },
            series: [
                {
                    name: 'Infectados',
                    data: this.data_inf
                },
                {
                    name: 'Óbitos',
                    data: this.data_obt
                }
            ]
            
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