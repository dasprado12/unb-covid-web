<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="alerts"
      class="elevation-1"
      :search="search"
      :sort-by="['id']"
      :sort-desc="['false']"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Alertas</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-row no-gutters class="mainSearch  pa-3">
              <v-col class="mainSearch" cols=4>
              <v-text-field
              class="searchLabel"
              v-model="search"
              append-icon="mdi-account-search"
              label="Nome"
              single-line
              hide-details
              @input="filterSearch"
            ></v-text-field>
              </v-col>
              <v-col class="mainSearch" cols=4>
              <v-menu
                ref="menu1"
                v-model="menu1"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="dateFrom"
                    label="De"
                    persistent-hint
                    single-line
                    prepend-icon="mdi-calendar"
                    @blur="date = parseDate(dateFrom)"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="dateFrom" no-title @input="menu1 = false"></v-date-picker>
              </v-menu>
              </v-col>
              <v-col class="mainSearch" cols=4>
              <v-menu
                ref="menu2"
                v-model="menu2"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                disabled
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="dateTo"
                    label="Até hoje"
                    persistent-hint
                    single-line
                    disabled
                    prepend-icon="mdi-calendar"
                    @blur="date = parseDate(dateTo)"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="dateTo" no-title @input="menu2 = false"></v-date-picker>
              </v-menu>
              </v-col>
            </v-row>

          <!-- AQUI COMEÇA O MODAL -->
          <v-dialog v-model="dialog" max-width="500px">
            <v-card>
              <v-card-title class="green lighten-2">
                <span class="headline">User</span>
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

        <v-toolbar flat>
          <v-layout row wrap ma-1>
            <v-flex xs12>
                    <v-select
                      v-model="sintoms"
                      :items="items"
                      single-line
                      attach
                      chips
                      color="red"
                      label="Sintomas"
                      multiple
                    ></v-select>
            </v-flex>
          </v-layout>
        </v-toolbar>

      </template>
      <template v-slot:body="{ items }">
        <tbody>
          <tr :style="{ backgroundColor: getColor(item)}" v-for="item in items"  :key="`${i}-${item.id}`" 
            
          >
            <td>{{ item.id }}</td>
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
      sintoms: '',
      dateFrom: '',
      dateTo: '',
      search: '',
      dialog: false,
      items: ['Febre','Tosse seca','Falta de ar','Cansaço'],
      alerts: [],
      Lista: [],
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
      }
    }),
    computed: {
      headers() {
        return [
          { 
            text: 'ID', 
            align: 'left', 
            value: 'id',
            sortable: 'id'
          },
          { 
            text: 'Nome', 
            value: 'name' 
          },
          { 
            text: 'Sintomas', 
            value: 'sintoms',
            filter: value => {
              if (!this.sintoms) return true;
              if( this.sintoms.every( f => value.includes(f) ) ){
                return value
              }
            }
          },
          { 
            text: 'Whatsapp', 
            value: 'whatsapp' 
          },
          { 
            text: 'Hora', 
            value: 'createdAt',
            filter: value => {
              if (!this.dateFrom && !this.dateTo) return true;
              let currentDate = new Date(value)
              let dateFrom = new Date(this.dateFrom)
              let dateTo = null
              if(!this.dateTo){
                dateTo = new Date(Date.now())
              }else{
                dateTo = new Date(value)
              }
              if(dateFrom < currentDate && dateTo > currentDate){
                return value
              }else{
                console.log('EU SOU MENOOOOOOOOR')
              }
            }
          },
          { 
            text: 'Actions', 
            value: 'action', 
            sortable: false 
          },
        ]
      }
    },

    // watch: {
    //   dialog (val) {
    //     val || this.close()
    //   },
    // },

    async mounted() {
      this.list_alerts()
    },
    methods: {
      getColor(alert){
        let amountAlerts = alert.sintoms.split(',').length
        if(alert.sintoms == "Falta de ar"){
          return '#d61d1da1'
        }else if(amountAlerts == 1){
          return '#51d61da1'
        }else if(amountAlerts == 2){
          return '#d6d31da1'
        }else if(amountAlerts > 2){
          return '#d61d1da1'
        }
      },
      async list_alerts(){
        let alerta = (await NewUser.get_helps()).data
        // let sintomas = []
        for(let i = 0; i < alerta.length; i++){
          alerta[i]['sintoms'] = alerta[i]['sintoms'].split(',').join(', ')
        }
        this.alerts = alerta.reverse()
      },
      editItem (item) {
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
    },
  }
</script>

<style scoped>
.red{
  background-color: #beb64acc;
  color: rgb(255, 251, 0);
}
.mainSearch{
  padding-top: 15px;
}
</style>