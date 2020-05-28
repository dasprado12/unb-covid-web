<template>
  <div class="text-center">

    <v-simple-table dense>
      <template v-slot:default>
        <thead>
          <tr>
            
            <th class="text-left">Name</th>
            <th class="text-left">status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in alerts" :key="item.name">
            <td>{{ item.user }}</td>
            <td>{{ item.status }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
import { Alert } from "../../funcoes/index.js";

let novoAlert = new Alert();
  export default {
    props: [ 'user_id' ],
    data () {
      return {
        alerts: '',
      }
    },
    async mounted(){
      this.alerts = (await novoAlert.getAlert(this.user_id)).data
    },
    methods: {
      getAlerts(){

      }
    }
  }
</script>