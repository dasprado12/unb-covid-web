<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Login form</v-toolbar-title>
                <v-spacer />
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
    <v-snackbar v-model="snackbar">
      Email ou senha incorretos
      <v-btn color="red" text @click="snackbar = false">
        Close
      </v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import axios from "axios";
import endpoint from "../config/endpoint";
export default {
  props: {
    source: String
  },
  data() {
    return {
      snackbar: false,
      login: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    login_form() {
      const address = endpoint.get("sessions");
      axios.post(address, this.login).then(function(response) {
        if (response.status == 200 && response.data.user.profile != "admin") {
          localStorage.setItem("app_user", JSON.stringify(response.data));
          localStorage.setItem("user_name", response.data.user.name);
          localStorage.setItem("user_id", response.data.user.id);
          localStorage.setItem("user_email", response.data.user.email);
          localStorage.setItem("user_whatsapp", response.data.user.whatsapp);
          localStorage.setItem("user_profile", response.data.user.profile);
          localStorage.setItem("user_token", response.data.token);
          location.href = "/";
        } else {
          this.snackbar = true;
        }
      });
    }
  }
};
</script>
