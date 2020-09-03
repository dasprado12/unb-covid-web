<template>
<nav>
    <!-- Top toolbar -->
    <v-app-bar class="green darken-1" flat app>
    <v-app-bar-nav-icon class="black--text" @click="drawer = !drawer"> </v-app-bar-nav-icon>
    <v-toolbar-title class="text-uppercase grey--text">
        <span class="black--text font-weight-light"> UnB </span>
        <span class="black--text"> SOS </span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn color="black" @click="signout()" text>
        <span> Sign Out </span>
        <v-icon right> fas fa-sign-out-alt </v-icon>
    </v-btn>
    </v-app-bar>
    <!-- Side toolbar -->
    <v-row>
    <v-navigation-drawer class="white" v-model="drawer" app >
        <br>
        <v-list-item>
            <v-img src="https://picsum.photos/510/300?random" aspect-ratio="1.7"></v-img>
        </v-list-item>
        <v-list-item>
        <v-list-item-content>
            <v-list-item-title class="title title-space">
            Daniel Silva do Prado{{ user.name }}
            </v-list-item-title>
            <v-list-item-subtitle class="title-space">
            danielsprado12@gmail.com
            </v-list-item-subtitle>
            <v-list-item-subtitle class="title-space">
            <span> <b> Cargo: </b></span> Vigia
            </v-list-item-subtitle>
        </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list dense nav>
        
        
        <!-- Display items -->
        <v-list-item
            v-for="item in items"
            :key="item.title"
            :to="item.route"
        >
            <v-list-item-icon>
                <v-icon :color="item.color">{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
        </v-list>
        <template v-slot:append>
            <div class="toCenter pa-5">
            <v-switch
                v-model="$vuetify.theme.dark"
                hide-details
                inset
                label="Theme Dark"
            />
            </div>
        </template>
    </v-navigation-drawer>
    </v-row>
</nav>
</template>

<script>


export default {
name: "ToolBar",
components: {  },
data(){
    return {
    user: '',
    drawer: true,
    nulo: "Maria",
    items: [
        { color: "green", icon: 'mdi-home', title: 'Home', route: '/alerta' },
        { color: "red", icon: 'mdi-exclamation', title: 'Alertas', route: '/alerta/reports' },
        { color: "blue", icon: 'mdi-account', title: 'Usuários', route: '/alerta/users' },
    ],
    name: "Meu nome",
    role: "Meu papel",
    }
},
mounted(){
    this.get_user()
    this.profile();

},
methods: {
    get_user(){
    },
    mainMenu(){
    location.href = '/'
    },
    signout(){
    localStorage.clear()
    location.href = '/'
    },
    
}
};
</script>

<style scoped>
.picture{
    padding-top: 10px;
}
#title{
background-color:rgb(161, 161, 161);
text-align: center;
}

.menu{
text-align: center;
}

.toolcolor{
background-color: rgb(53, 156, 39);
}

.title-space{
padding-left: 10px;
}
</style>
