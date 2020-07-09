<template>
  <v-app class="grey lighten-4">
    <v-container>
      <!-- Each group -->
      <v-div v-if="links.length == 0">
        <nav>
                <v-btn color="grey" @click="signout()" text>
        <span> Sign Out </span>
        <v-icon right> fas fa-sign-out-alt </v-icon>
      </v-btn>
        </nav>
        <v-card class="red lighten-1">
          <v-card-title>Você não tem permissão para visualizar esse painel</v-card-title>
        </v-card>
      </v-div>
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

      links: []
    }
  },
  methods: {
    doSomething(link){
      location.href = link;
    },
    signout(){
      localStorage.clear()
      location.href = '/'
    },
     verifyProfile(){
      let profile = localStorage.getItem('user_profile')
      if(profile ==="admin"){
        this.links= [
          { key: 1, name: 'UnB Solidaria', color: 'red lighten-1', link: '/solidaria' },
          { key: 2, name: 'SOS UnB', color: 'green lighten-1', link: '/sos' }
        ]
      }
      else if(profile ==="vigilante"){
          this.links= [
        { key: 2, name: 'SOS UnB', color: 'green lighten-1', link: '/sos' }
        ]
      }
      else if(profile==="profissional"){
          this.links= [
          { key: 1, name: 'UnB Solidaria', color: 'red lighten-1', link: '/solidaria' },
        ]        
      }
      else{
        //mudar esse else quando o sistema estiver completo
        this.links= []
      }
    }
  },
  mounted(){
      this.verifyProfile();
  }
  
};
</script>
