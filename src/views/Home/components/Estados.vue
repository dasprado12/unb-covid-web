<template>
    <div>
        {{ dates }}
        <region></region>
    </div>
</template>

<script>
import Dados from "../../../example/index.js";
import Region from "./charts/Region.vue"

export default {
    components: { Region },
    data(){
        return {
            data: Dados.DF,
            dates: null
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
        }
    }
}
</script>

<style scoped>
</style>