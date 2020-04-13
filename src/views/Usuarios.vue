<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="users"
      class="elevation-1"
      :search="search"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Usuários</v-toolbar-title>
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
                      <v-col cols="12" sm="66" md="6">
                        <v-text-field v-model="editedItem.name" label="Nome" disabled></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="66" md="6">
                        <v-text-field v-model="editedItem.email" label="Email" disabled></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field v-model="editedItem.whatsapp" label="Whatsapp" disabled></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field v-model="editedItem.address" label="Endereço" disabled></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field v-model="editedItem.birth_date" label="Nascimento" disabled></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field v-model="editedItem.link_unb" label="Vinculo" disabled></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field v-model="editedItem.risk_group" label="Grupo de Risco" disabled></v-text-field>
                      </v-col>
                  </v-row>
                  <!-- <h2> Todos os alertas </h2>
                  <div>
                    {{ listaAlertas(editedItem.user_id) }}
                  </div> -->
                  <v-row>
                    <!-- <v-col cols="12" sm="12" md="12">

                    </v-col> -->
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <contato></contato>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Fechar</v-btn>
                <!-- <v-btn color="blue darken-1" text @click="save">Atualizar</v-btn> -->
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!-- AQUI ACABA O MODAL -->
        </v-toolbar>
      </template>

      <template v-slot:body="{ items }">
        <tbody>
          <tr :style="{ backgroundColor: getColor(item)}" v-for="item in items" :key="item.name" 
            
          >
            <td> {{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.email }}</td>
            <td>{{ item.whatsapp }}</td>
            <td>{{ item.address }}</td>
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
import contato from '../components/contatoEmergencia.vue';
import { User } from "../functions/index.js"

let NewUser = new User();

  export default {
    components: { contato },
    data: () => ({
      color: '#ffffff',
      dialog: false,
      headers: [
        { text: 'ID', align: 'left', sortable: false, value: 'id' },
        { text: 'Nome', value: 'name' },
        { text: 'E-mail', value: 'email' },
        { text: 'Whatsapp', value: 'whatsapp' },
        { text: 'Endereço', value: 'address' },
        { text: 'Actions', value: 'action', sortable: false },
      ],
      users: [],
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
      this.list_user()
    },

    methods: {
      getColor(user){
        let birth = user.birth_date.split('/')[2]
        let today = new Date().getFullYear()
        let age = today - parseInt(birth)
        console.log(user.name, age, user.risk_group)
        if(user.risk_group.length == 0 && age < 60){
          return '#51d61da1'
        }else if(user.risk_group.length != 0 && age < 60 || user.risk_group.length == 0 && age >= 60 ){
          return '#d6d31da1'
        }else if(user.risk_group.length != 0 && age >= 60){
          return '#d61d1da1'
        }
      },
      async list_user(){
        let usuario = (await NewUser.get_users()).data
        this.users = usuario
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
  background-color: #51d61d75;
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