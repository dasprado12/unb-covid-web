<template>
  <v-app id="inspire">
    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>Login form</v-toolbar-title>
                <v-spacer />
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      :href="source"
                      icon
                      large
                      target="_blank"
                      v-on="on"
                    >
                      <v-icon>mdi-</v-icon>
                    </v-btn>
                  </template>
                  <span>Source</span>
                </v-tooltip>
                <v-tooltip right>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      icon
                      large
                      href="https://codepen.io/johnjleider/pen/pMvGQO"
                      target="_blank"
                      v-on="on"
                    >
                    </v-btn>
                  </template>
                  <span>Codepen</span>
                </v-tooltip>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Login"
                    v-model="login.email"
                    name="login"
                    prepend-icon="mdi-email"
                    type="text"
                  />

                  <v-text-field
                    id="password"
                    label="Password"
                    v-model="login.password"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
                  />
                  
                </v-form>

              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn @click="login_form()" color="primary">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
    <v-snackbar
      v-model="snackbar"
    >
      Email ou senha incorretos
      <v-btn
        color="red"
        text
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>

import axios from 'axios';

  export default {
    props: {
      source: String,
    },
    data(){
        return {
          snackbar: false,
          login: {
              email: 'daniel@email.com',
              password: '123456'
          }
        }
    },
    methods: {
        login_form(){
            const ip = "http://35.215.210.191:3333/sessions"
            axios
            .post( ip , this.login)
            .then( function(response) {
                console.log(response.status == 200)
                if( response.status == 200 ){
                  localStorage.setItem('user_name', response.data.user.name)
                  localStorage.setItem('user_id', response.data.user.id)
                  localStorage.setItem('user_email', response.data.user.email)
                  localStorage.setItem('user_whatsapp', response.data.user.whatsapp)
                  localStorage.setItem('user_token', response.data.token)
                  location.href = '/'
                }else{
                  this.snackbar = true
                }
                
            })
            .catch( function (error) {
              console.log("error: ", error)
            })
            
        },

        }
    }
  
</script>