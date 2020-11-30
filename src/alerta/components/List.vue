<template>
    <v-card flat>
            <v-data-table
                :headers="headers"
                :items="alerts"
                :search="search"
            >
            <template v-slot:top>
            <v-toolbar flat color="white">
                    <v-toolbar-title>Alertas</v-toolbar-title>
                    <v-spacer/>
                        <v-text-field
                            v-model="search"
                            append-icon="mdi-search"
                            label="Pesquisar"
                            single-line
                            hide-details
                        ></v-text-field>
                    <v-dialog v-model="dialog" max-width="500px">
                    
                    </v-dialog>
                </v-toolbar>
            </template>
                <template v-slot:body="{ items }">
                    <tbody class="text--thin">
                        <tr v-for="(item, i) in items" :key="`${i}-${item.id}`">
                            <td>{{ item.id }}</td>
                            <td v-if="item.stauts"> {{ item.status }} </td>
                            <td v-else> <v-chip color="red lighten-3"> Aberto </v-chip> </td>
                            <td>{{ item.name }}</td>
                            <td>{{ item.whatsapp }}</td>
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
                { text: 'Status', value: 'status' },
                { text: 'Nome', value: 'name' },
                { text: 'Whatsapp', value: 'whatsapp' },
                { text: 'Criado em', value: 'createdAt' },
                // { text: 'Actions', value: 'action', sortable: false }
            ],
        }
    },
    }
</script>