<template>
    <div>
        <v-container>
            Quantity of 
        </v-container>
        <v-row class="main">
            <v-col v-for="i in symptoms" :key="i" cols="3">
                <v-card flat :class="chipColor(i)">
                    <v-card-subtitle>
                        <h2>{{i}}</h2>
                    </v-card-subtitle>
                    <v-card-text>
                        <h3>
                            {{ getQtd(i) }}
                        </h3>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
export default {
    props: ['alerts'],
    data(){
        return {
            symptoms: [],
            final: []
        }
    },
    mounted(){
        this.mountStatus(this.alerts)
    },
    beforeMount(){

    },
    methods: {
        mountStatus(alerts){
            let all_symptoms = alerts.map(function(item){ return item.symptoms }).toString().split(",")
            let symptoms = all_symptoms.filter((este, i) => all_symptoms.indexOf(este) === i);
            this.symptoms = symptoms
            return symptoms
        },
        getQtd(item){
            return this.alerts.map(function(i){ return i.symptoms.includes(item) }).filter(Boolean).length
        },
        chipColor(item){
            if(item == "Shortness of Breath"){
                return "red lighten-3"
            }else 
            if(item == "Chest Pain"){
                return "orange lighten-3"
            }else
            if(item == "Cough"){
                return "yellow darken-1"
            }else
            if(item == "Sneeze"){
                return "green lighten-3"
            }else
            if(item == "Headache"){
                return "blue lighten-3"
            }else
            if(item == "Fever"){
                return "blue"
            }else
            if(item == "Diarrhea"){
                return "purple lighten-3"
            }else
            if(item == "Fatigue"){
                return "purple lighten-1"
            }
            else{
                return "grey"
            }
        }
    }
}
</script>

<style scoped>
.main{
    padding-left: 10px;
    padding-right: 10px;
}
</style>