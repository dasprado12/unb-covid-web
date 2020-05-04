<template>
  <nav>
    <v-app-bar flat app color="grey lighten-4">
      <v-app-bar-nav-icon class="grey--text" @click="drawer = !drawer"> </v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase grey--text">
        <span class="font-weight-light"> UnB </span>
        <span> Solidaria </span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="grey" @click="signout()" text>
        <span> Sign Out </span>
        <v-icon right> fas fa-sign-out-alt </v-icon>
      </v-btn>
    </v-app-bar>

<v-row>
  

    <v-navigation-drawer 
      v-model="drawer" app class="indigo lighten-4" 

    >
      <v-list-item>
        <v-avatar color="indigo">
          <span class="white--text headline">:) </span>
        </v-avatar>
        <v-list-item-content>
          <v-list-item-title class="title title-space">
            {{ user.name }}
          </v-list-item-title>
          <v-list-item-subtitle class="title-space">
            {{ user.email }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
        dense
        nav
      >
      <v-list-group
        prepend-icon="mdi-map"
      >
        <template v-slot:activator>
          <v-list-item-title>Visualization</v-list-item-title>
        </template>
        <v-list-item
          v-for="item in map_items"
          :key="item.title"
          :to="item.route"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>


        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.route"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

        </v-row>
  </nav>
</template>

<script>
import { Session } from "../functions/Sessions.js"

let loged_user = new Session;

export default {
  name: "ToolBar",
  components: {  },
  data(){
    return {
      user: '',
      drawer: true,
      nulo: "Maria",
      items: [
        { icon: 'mdi-alert', title: 'Alertas', route: '/' },
        { icon: 'mdi-human', title: 'Usuários', route: '/usuarios' },
      ],
      map_items: [
        { icon: 'mdi-map-marker', title: 'Map', route: '/map' },
        { icon: 'mdi-map-marker-circle', title: 'Heat Map', route: '/heatmap' },
      ],
      name: "Meu nome",
      role: "Meu papel",
    }
  },
  mounted(){
    this.get_user()
  },
  methods: {
    get_user(){
      this.user = loged_user.return_user()
    },
    signout(){
      localStorage.clear()
      location.href = '/'
    }
  }
};
</script>

<style scoped>
#title{
  background-color:rgb(161, 161, 161);
  text-align: center;
}

.menu{
  text-align: center;
}

.toolcolor{
  background-color: aqua;
}

.title-space{
  padding-left: 10px;
}
</style>
