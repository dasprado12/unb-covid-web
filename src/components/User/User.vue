<template>
    <div class="conta">
        <v-dialog
        v-model="dialog"
        width="900"
        >
        <template v-slot:activator="{ on }">
            <v-btn
            color="grey"
            dark
            v-on="on"
            text
            >
            Ver perfil
            </v-btn>
        </template>

        <v-card>
            <v-card-title
            class="headline blue lighten-2"
            primary-title
            >
            User
            </v-card-title>

            <v-card-text >
                <br>
                <v-row v-show="antiShow" >
                    <v-row>
                        <v-col cols="4" sm="12" md="5">
                            <v-text-field
                            v-model="user.name"
                            label="name"
                            disabled
                            >
                            </v-text-field>
                        </v-col>
                        <v-col cols="4" sm="12" md="5">
                            <v-text-field
                            v-model="user.email"
                            label="email"
                            disabled
                            >
                            </v-text-field>
                        </v-col>
                        <v-col cols="4" sm="12" md="2">
                            <v-file-input 
                                multiple 
                                label="Photo"
                            ></v-file-input>
                        </v-col>
                    </v-row>
                </v-row>
                <v-row v-show="show">
                    <v-form v-model="valid" >
                        <v-card width="100%">
                            <v-card-text>
                                <v-row>
                                    <v-col cols="12">
                                        <v-text-field
                                        v-model="editedItem.name"
                                        label="name"
                                        >
                                        </v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field
                                        v-model="editedItem.email"
                                        label="email"
                                        >
                                        </v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field
                                        v-model="firstPassword"
                                        label="Password"
                                        >
                                        </v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field
                                        v-model="secondPassword"
                                        label="New Password"
                                        >
                                        </v-text-field>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                            <v-divider></v-divider>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn 
                                    text 
                                    color="green"
                                    @click="updateUser()"
                                >
                                    Update
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-form>
                </v-row>
                <user-alerts v-show="!show" v-bind:user_id="user_id"></user-alerts>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn 
                text
                @click="editUser(user)"
                v-bind:style="[show ? {'color': 'red'} : {'color': 'grey'}]" 
            >
                Edit user
            </v-btn>
            <v-btn
                color="primary"
                text
                @click="dialog = false"
            >
                Close
            </v-btn>
            </v-card-actions>
        </v-card>
        </v-dialog>
    </div>    
</template>

<script>
import { User } from "../../funcoes/index.js"
import userAlerts from "../Alert/userAlerts.vue";
import { userAuth } from "../../states/userAuth.js"

let novoUser = new User();

export default {
    props: [ 'user_id' ],
    components: { userAlerts },
    data() {
        return {
            dialog: false,
            show: false,
            antiShow: true,
            user: '',
            editedItem: {
                user_id: '',
                papel: '',
                device_id: '',
                name: '',
                email: '',
                password: ''

            }
        }
    },
    async created(){
        this.user = userAuth.userData
        
    },
    methods: {
        editUser(item){
            if(this.show == false){
                this.show = true
            }else{
                this.show = false
            }
            this.editedItem = Object.assign({}, item)
            // this.editedItem.email = this.user.email
            // this.editedItem.password = this.user.password
        },
        close(){
            this.dialog = false
        },
        updateUser(){
            novoUser.updateUser(this.editedItem)
            console.log(this.editedItem.email)
        }
    }
}
</script>

<style scoped>

</style>