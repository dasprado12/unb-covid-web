<template>
    <div>
        <v-data-table
            :headers="headers"
            :items="users"
            sort-by="calories"
            class="elevation-1"
            :search="search"
        >
            <template v-slot:top>
                <v-toolbar flat color="white">
                    <v-toolbar-title>Usuários</v-toolbar-title>
                    <v-spacer/>
                        <v-text-field
                            v-model="search"
                            append-icon="mdi-search"
                            label="Pesquisar"
                            single-line
                            hide-details
                        ></v-text-field>
                    <v-dialog v-model="dialog" max-width="500px">
                    <v-card>
                        <v-card-title> <span class="headline">{{editedItem.name | capitalize}}</span> </v-card-title>
                        <v-card-text>
                            <v-container>
                                <v-row>
                                <v-col cols="12" sm="6" md="6">
                                    <v-text-field disabled v-model="editedItem.link_unb" label="Função"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                    <v-text-field disabled v-model="editedItem.whatsapp" label="Telefone"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="12" md="12">
                                    <v-text-field disabled v-model="editedItem.email" label="E-mail"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="12" md="12">
                                    <v-text-field disabled v-model="editedItem.address" label="Endereço"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                    <v-text-field disabled v-model="editedItem.matricula_unb" label="Matrícula"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                    <v-text-field disabled v-model="editedItem.birth_date" label="Data de Nascimento"></v-text-field>
                                </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>
                        <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="red darken-1" text @click="close">Fechar</v-btn>
                        </v-card-actions>
                    </v-card>
                    </v-dialog>
                </v-toolbar>
            </template>
                <template v-slot:body="{ items }">
                    <tbody>
                        <tr v-for="(item, i) in items" :key="`${i}-${item.id}`">
                            <td>{{ item.name | capitalize }}</td>
                            <td>{{ item.link_unb }}</td>
                            <td>{{ item.whatsapp }}</td>
                            <td> <v-chip :color="`${ageColor(item.birth_date)}`"> {{ item.birth_date | age }} </v-chip> </td>
                            <td>
                                <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
                            </td>
                        </tr>
                    </tbody>
                </template>
            <template v-slot:item="{ item }">
            <v-icon
                small
                class="mr-2"
                @click="editItem(item)"
            >
                mdi-pencil
            </v-icon>
            <v-icon
                small
                @click="deleteItem(item)"
            >
                mdi-delete
            </v-icon>
            </template>
            <template v-slot:no-data>
                <v-btn color="primary" @click="initialize">Reset</v-btn>
            </template>
        </v-data-table>
    </div>
</template>


<script>
import { User } from "../../functions/index.js"

let api_user = new User();

export default {
    data: () => ({
    dialog: false,
    search: "",
    headers: [
        { text: 'Name', align: 'start', sortable: false, value: 'name' },
        { text: 'Função', value: 'link_unb' },
        { text: 'Telefone', value: 'whatsapp' },
        { text: 'Idade', value: 'birth_date' },
        { text: 'Actions', value: 'actions', sortable: false },
    ],
    users: [],
    desserts: [],
    editedIndex: -1,
    editedItem: {
    },
    defaultItem: {
    },
    }),

    computed: {
    formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
    },

    watch: {
    dialog (val) {
        val || this.close()
    },
    },

    async created () {
        this.users = (await api_user.get_users()).data
        this.initialize()
    },

    methods: {

        editItem (item) {
            this.editedIndex = this.desserts.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },

        deleteItem (item) {
            const index = this.desserts.indexOf(item)
            confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
        },

        close () {
            this.dialog = false
            this.$nextTick(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
            })
        },

        save () {
            if (this.editedIndex > -1) {
                Object.assign(this.desserts[this.editedIndex], this.editedItem)
            } else {
                this.desserts.push(this.editedItem)
            }
                this.close()
        },

        ageColor(age){
            let year = parseInt(age.substr(-4))
            let current = new Date().getFullYear()
            age = current - year
            if(age < 22){
                return "green lighten-3"
            }else if(age >= 22 && age < 50){
                return "yellow darken-1"
            }else{
                return "red lighten-3"
            }
        }
    },
}
</script>