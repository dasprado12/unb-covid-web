<template>
    <div>
        <v-toolbar dark color="primary">
            <v-toolbar-side-icon></v-toolbar-side-icon>
            <v-app-bar-nav-icon class="white--text" @click="drawer = !drawer"> </v-app-bar-nav-icon>
            <v-toolbar-title class="white--text">
                <span class="white--text font-weight-light"> UnB </span>
                <span class="white--text"> SOS </span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon to="/alerta">
                    <v-icon>mdi-home</v-icon>
            </v-btn>
            <v-btn icon to="/alerta/reports">
                <v-icon>mdi-exclamation</v-icon>
            </v-btn>
            <v-btn icon to="/alerta/users">
                <v-icon>mdi-account</v-icon>
            </v-btn>
            <v-btn icon @click="signout()">
                <v-icon>mdi-exit-to-app</v-icon>
            </v-btn>
        </v-toolbar>



<v-menu
    v-model="drawer"
    :close-on-content-click="false"
    :nudge-width="200"
    offset-x
>

    <v-card>
        <v-img
            src="https://picsum.photos/510/300?random"
            aspect-ratio="1.1"
        />
        <v-card-title>
            {{ user.name }}
        </v-card-title>
        <v-card-subtitle>
            <div>
                {{ user.email }} 
            </div>
            <div>
                {{ user.profile }}
            </div>
        </v-card-subtitle>
        <v-card-actions>
            <!-- <v-switch
                v-model="$vuetify.theme.dark"
                hide-details
                inset
                label="Theme Dark"
            /> -->
        </v-card-actions>
    </v-card>
    </v-menu>

    
</div>
</template>

<script>
export default {
    name: "ToolBar",
    components: {  },
    data(){
        return {
            user: {
                name: "",
                role: "",
                profile: "",
            },
            drawer: false,
            nulo: "Maria",
            items: [
                { color: "green", icon: 'mdi-home', title: 'Home', route: '/alerta' },
                { color: "red", icon: 'mdi-exclamation', title: 'Alertas', route: '/alerta/reports' },
                { color: "blue", icon: 'mdi-account', title: 'Usuários', route: '/alerta/users' },
            ],
        }
    },
    mounted(){
        this.get_user()
        this.profile();

    },
    methods: {
        get_user(){
            this.user.name = localStorage.getItem("user_name")
            this.user.email = localStorage.getItem("user_email")
            this.user.profile = localStorage.getItem("user_profile")
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
