<template>
<div>
    <v-btn class="button" @click="reload()">
        reload heatmap     
    </v-btn><br>
    <vue-google-heatmap 
        ref="reloadComponent"
        :key="componentKey"
        :points="points"
        :initial-zoom=15
        :lat=-15.7639579
        :lng=-47.8692740
        style="width: 100%; height: 900px;" />
</div>
</template>

<script>
import { Help } from "../functions/index.js"
let NewHelp = new Help();
// const mapMarker = require('../assets/red-dot.png')

export default {
    name: 'map',
        data (){
            return {
                componentKey: 0,
                points: []
            }
        },
    async mounted(){
        this.list_alerts();
    },
    methods:{
        async list_alerts(){
        let alertas = (await NewHelp.get_helps()).data
        let alerta = null
        let all_alertas = []
        let location = null
        let latitude = null
        let longitude = null
        for(let i = 0; i < alertas.length; i++){
            location = alertas[i].user_location.split(",")
            latitude = location[0]
            longitude= location[1]
            alerta = { lat: parseFloat(latitude), lng: parseFloat(longitude) }
            all_alertas.push(alerta)
        }
            this.points = all_alertas
            this.$refs.reloadComponent.$forceUpdate()
        },
        reload(){
            this.$refs.reloadComponent.$forceUpdate()
            this.componentKey += 1
            console.log(this.points)
        }
    },
    
}
</script>

<style scoped>
.name_alert{
    color: black;
}
.button{
    margin-bottom: 10px;
}
</style>
