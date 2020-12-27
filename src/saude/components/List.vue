<template>
    <v-card flat>
            <v-data-table
                :headers="headers"
                :items="alerts"
                :search="search"
            >
            <template v-slot:top>
            <v-toolbar flat color="white">
                    <v-toolbar-title>Alerts</v-toolbar-title>
                    <v-spacer/>
                        <v-text-field
                            v-model="search"
                            append-icon="mdi-search"
                            label="Search"
                            single-line
                            hide-details
                        ></v-text-field>
                    <v-dialog v-model="dialog" max-width="500px">
                    
                    </v-dialog>
                </v-toolbar>
            </template>
                <template v-slot:body="{ items }">
                    <tbody class="text--thin">
                        <tr v-for="(item, i) in items" :key="`${i}-${item.id}`" :class="rowColor(item.symptoms)">
                            <td>{{ item.id }}</td>
                            <td>
                                {{ item.name.split(" ")[0]   }}
                                <!-- <span class="blurried">{{ item.name.split(" ")[1]   }}</span> -->
                            </td>
                            <td> <v-chip v-for="i in item.symptoms" :key="i" :color="chipColor(i)"> {{ i }} </v-chip></td>
                            <td class="blurried">{{ item.whatsapp }}</td>
                            <td>{{ item.createdAt | datetime }}</td>
                            <!-- <td>
                                <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
                            </td> -->
                        </tr>
                    </tbody>
                </template>
            </v-data-table>
    </v-card>
</template>


<script>

export default {
    props: [ 'alerts' ],
    data () {
        return {
            search: '',
            headers: [
                { text: 'ID', align: 'left', value: 'id', sortable: 'id' },
                { text: 'Name', value: 'name' },
                { text: 'Symptoms', value: 'symptoms' },
                { text: 'Whatsapp', value: 'whatsapp' },
                { text: 'Created at', value: 'createdAt' },
            ],
        }
    },
    methods: {
        rowColor(items){
            let arr_size = items.length
            if(arr_size > 2 || items.includes("Shortness of Breath")){
                return "red lighten-4"
            }
            if(arr_size == 1){
                return "green lighten-4"
            }
            if(arr_size == 2){
                return "orange lighten-4"
            }
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
.blurried{
    -webkit-filter: blur(5px);
    -moz-filter: blur(5px);
    -o-filter: blur(5px);
    -ms-filter: blur(5px);
    filter: blur(2px);
    width: 10px;
    height: 10px;
}
</style>