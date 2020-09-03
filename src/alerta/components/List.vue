<template>
    <div>
        <v-data-table
            :headers="headers"
            :items="alerts"
            class="elevation-1"
        >
                <template v-slot:body="{ items }">
                    <tbody>
                        <tr v-for="(item, i) in items" :key="`${i}-${item.id}`">
                            <td>{{ item.id }}</td>
                            <td v-if="item.stauts"> {{ item.status }} </td>
                            <td v-else> <v-chip color="red lighten-3"> Aberto </v-chip> </td>
                            <td>{{ item.name }}</td>
                            <td>{{ item.whatsapp }}</td>
                            <td>{{ item.createdAt | datetime }}</td>
                            <!-- <td> <v-chip :color="`${ageColor(item.birth_date)}`"> {{ item.birth_date | age }} </v-chip> </td> -->
                            <td>
                                <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
                            </td>
                        </tr>
                    </tbody>
                </template>
        </v-data-table>
    </div>
</template>


<script>

export default {
    props: [ 'alerts' ],
    data () {
        return {
            headers: [
                { text: 'ID', align: 'left', value: 'id', sortable: 'id' },
                { text: 'Status', value: 'status' },
                { text: 'Nome', value: 'name' },
                { text: 'Whatsapp', value: 'whatsapp' },
                { text: 'Criado em', value: 'createdAt' },
                { text: 'Actions', value: 'action', sortable: false }
            ],
        }
    },
    }
</script>