<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="alerts"
      class="elevation-1"
      :search="search"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Alertas</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-text-field
          v-model="search"
          append-icon="mdi-account-search"
          label="search"
          single-line
          hide-details
        ></v-text-field>
        
          <!-- AQUI COMEÇA O MODAL -->
          <v-dialog v-model="dialog" max-width="500px">
            <v-card>
              <v-card-title class="green lighten-2">
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>
              <v-card-text>
                <v-container>
        
                  
                  <v-row>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field v-model="editedItem.id" label="ID" disabled></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field v-model="editedItem.name" label="Nome" disabled></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12" md="12">
                        <v-text-field v-model="editedItem.sintoms" label="Sintomas" disabled></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field v-model="editedItem.whatsapp" label="Whatsapp" disabled></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field v-model="editedItem.createdAt" label="Hora" disabled></v-text-field>
                      </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-btn text disabled> Ver no mapa </v-btn>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Fechar</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!-- AQUI ACABA O MODAL -->
          
        </v-toolbar>
      </template>

      <template v-slot:body="{ items }">
        <tbody>
          <tr v-for="item in items" :key="item.name" 
            
          >
            <td :class="{backgroundCoor: red}"> {{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.sintoms }}</td>
            <td>{{ item.whatsapp }}</td>
            <td>{{ item.createdAt }}</td>
            <td> <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon> </td>
          </tr>
        </tbody>

      </template>
      
      <template v-slot:item.action="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { Help } from "../functions/index.js"

let NewUser = new Help();

  export default {
    data: () => ({
      dialog: false,
      headers: [
        { text: 'ID', align: 'left', sortable: false, value: 'id' },
        { text: 'Nome', value: 'name' },
        { text: 'Sintomas', value: 'email' },
        { text: 'Whatsapp', value: 'whatsapp' },
        { text: 'Hora', value: 'address' },
        { text: 'Actions', value: 'action', sortable: false },
      ],
      alerts: [],
      Lista: [],
      search: '',
      editedIndex: -1,
      editedItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
      defaultItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
    }),
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'User' : 'Atualizar Alerta'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
    },

    async mounted() {
      this.list_alerts()
    },

    methods: {
      async list_alerts(){
        let alerta = (await NewUser.get_helps()).data
        this.alerts = alerta
      },
      editItem (item) {
        // this.editedIndex = this.Alerts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        if (this.editedIndex > -1) {
            // listAlerts.updateAlert()
          // console.log(this.Alerts[this.editedIndex].uid)
        } else {
          this.desserts.push(this.editedItem)
        }
        this.close()
      },
    },
  }
</script>

<style scoped>
.red{
  background-color: red;
  color: red;
}
/* .high {
  background-color: rgba(255,0,0,.5)
}
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
} */
</style>