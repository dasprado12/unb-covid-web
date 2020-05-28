<template>
    <div>
        <v-data-table 
        dense 
        :headers="headers" 
        :items="data" 
        item-key="name" 
        class="elevation-1">
        <template v-slot:top>
            <v-toolbar flat>
                <v-toolbar-title>{{ current_date }}</v-toolbar-title>
            </v-toolbar>
        </template> 
        <template v-slot:body="{  }">
            <tbody>
                <tr :style="{ backgroundColor: get_color(item)}" v-for="item in data" :key="`${i}-${item._id}`">
                    <td>{{ item.regiao }}</td>
                    <td>{{ item.num }}</td>
                    <td>{{ item.porcentagem }}</td>
                    <td>{{ item.incidencia }}</td>
                    <td>{{ item.incidencia }}</td>
                    <td>{{ item.porcentagem }}</td>
                </tr>
            </tbody>
        </template>
        </v-data-table>
    </div>
</template>

<script>
export default {
    props: [ 'data' ],
    data(){
        return{
            headers: [
                { text: 'Região', align: 'start', value: 'regiao' },
                { text: 'Numero', value: 'num' },
                { text: 'Porcentagem', value: 'porcentagem' },
                { text: 'Incidencia', value: 'incidencia' },
                { text: 'Óbitos', value: 'obitos' },
                { text: 'Porcentagem Óbitos', value: 'porcentagem obitos' },
            ]
        }
    },
    computed:{
        current_date(){
            let data = new Date(this.data[0].dataExtracao)
            return data
        }
    },
    methods: {
        get_color(item){
            let regioes = "SUDOESTE, CENTRO SUL, CENTRAL, OESTE, NORTE, LESTE"
            if(regioes.includes(item.regiao.toUpperCase())){
                return '#a1a1a1'
            }
        }
    }
}
</script>