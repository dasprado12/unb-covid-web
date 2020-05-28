<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="users"
      class="elevation-1"
      :search="search"
      :sort-by="['id']"
      :sort-desc="['false']"
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
              <v-card-title :style="{ backgroundColor: getColor(editedItem)}">
                <span class="headline">{{ editedItem.id }} - {{ editedItem.name }}</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-img
                    height="100%"
                    src="https://cdn.vuetifyjs.com/images/cards/server-room.jpg"
                  />
                  <v-row>
                    <v-col cols="12" sm="66" md="6">
                      <v-text-field v-model="editedItem.email" label="Email" disabled></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field v-model="editedItem.whatsapp" label="Whatsapp" disabled></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field v-model="editedItem.address" label="Endereço" disabled></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field v-model="editedItem.birth_date" label="Nascimento" disabled></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field v-model="editedItem.link_unb" label="Vinculo" disabled></v-text-field>
                    </v-col>
                    <v-col v-show="riskGroup" cols="12" sm="12" md="12">
                      <v-text-field v-model="editedItem.risk_group" label="Grupo de Risco" disabled></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-select
                        required
                        item-text="name"
                        label="Perfil"
                        item-value="value"
                        v-model="editedItem.profile_id"
                        :items="profiles"
                      ></v-select>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-btn color="red darken-1" text @click="riskGroup = !riskGroup">Ver grupo de risco</v-btn>
                <v-spacer></v-spacer>
                <v-btn small color="primary" @click="saveProfile">Salvar</v-btn>
                <v-btn color="blue darken-1" text @click="close">Fechar</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!-- AQUI ACABA O MODAL -->
        </v-toolbar>
      </template>

      <template v-slot:body="{ items }">
        <tbody>
          <tr
            :style="{ backgroundColor: getColor(item)}"
            v-for="(item, i) in items"
            :key="`${i}-${item.id}`"
          >
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.email }}</td>
            <td>{{ item.whatsapp }}</td>
            <td>{{ item.address }}</td>
            <td>
              <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
            </td>
          </tr>
        </tbody>
      </template>

      <template v-slot:item.action="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { User } from "../functions/index.js";

let NewUser = new User();

export default {
  data: () => ({
    riskGroup: false,
    search: "",
    color: "#ffffff",
    dialog: false,
    headers: [
      { text: "ID", align: "left", value: "id", sortable: "id" },
      { text: "Nome", value: "name", sortable: false },
      { text: "E-mail", value: "email" },
      { text: "Whatsapp", value: "whatsapp" },
      { text: "Endereço", value: "address" },
      { text: "Actions", value: "action", sortable: false }
    ],
    users: [],
    profiles: [],
    Lista: [],
    editedItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0
    },
    defaultItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0
    }
  }),

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  async mounted() {
    await this.list_user();
    await this.get_profiles();
  },

  methods: {
    getColor(user) {
      if (!user.birth_date) {
        return "#51d61da1";
      }
      let birth = user.birth_date.split("/")[2];
      let today = new Date().getFullYear();
      let age = today - parseInt(birth);
      if (user.risk_group.length == 0 && age < 60) {
        return "#51d61da1";
      } else if (
        (user.risk_group.length != 0 && age < 60) ||
        (user.risk_group.length == 0 && age >= 60)
      ) {
        return "#d6d31da1";
      } else if (user.risk_group.length != 0 && age >= 60) {
        return "#d61d1da1";
      }
    },
    async list_user() {
      let usuario = (await NewUser.get_users()).data;
      this.users = usuario;
    },
    async get_profiles() {
      this.profiles = (await NewUser.get_profiles()).data;
    },
    editItem(item) {
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    async saveProfile() {
      await NewUser.put_profiles([
        {
          profile_id: this.editedItem.profile_id,
          user_id: this.editedItem.id
        }
      ]);
      this.close();
    },
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
      }, 300);
    }
  },
  save() {
    if (this.editedIndex > -1) {
      // listAlerts.updateAlert()
      // console.log(this.Alerts[this.editedIndex].uid)
    } else {
      this.desserts.push(this.editedItem);
    }
    this.close();
  }
};
</script>

<style scoped>
.red {
  background-color: #51d61d75;
}
</style>
