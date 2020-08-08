<template>
  <v-app class="grey lighten-4">
    <v-container>
    <v-app-bar flat app>
      <v-toolbar-title class="text-uppercase grey--text">
        <span class="font-weight-light"> UnB </span>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn color="grey" @click="signout()" text>
        <span> Sign Out </span>
        <v-icon right> fas fa-sign-out-alt </v-icon>
      </v-btn>
    </v-app-bar><br><br><br>
      <!-- Each group -->
      <v-row v-for="link in links" :key="link.key">
          <v-col cols="12" xs="12" sm="12" md="12" lg="12">
              <v-card :class="link.color" :to="link.link">
                <v-card-title>
                  <!-- <router-link :>Home</router-link> -->
                  {{ link.name }}
                </v-card-title>
              </v-card>
          </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>

export default {

  data(){
    return {
      links: [
        { key: 1, name: 'UnB Solidaria', color: 'red lighten-1', link: '/solidaria' },
        { key: 2, name: 'SOS UnB', color: 'green lighten-1', link: '/sos' }
      ]
    }
  },
  methods: {
    doSomething(link){
      console.log(link)
      location.href = link;
    }
  }
};
</script>
