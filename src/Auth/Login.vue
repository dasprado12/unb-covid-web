<template>
  <v-app id="inspire">
  <div class="login-page">
  <div class="form">
    <form class="login-form">
      <input type="text" placeholder="username" v-model="login.email"/>
      <input type="password" placeholder="password" v-model="login.password"/>
      <button @click="login_form()">login</button>
      <p class="message"> <a href="https://www.unb.br">Universidade de Brasília</a></p>
    </form>
  </div>
</div>
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
      },
      message: '',
      timeToShow: true
    };
  },
  mounted(){
    // this.getMessage()
  },
  methods: {
    // getMessage(){
    //   if(this.$route.query.message == "error"){
    //     this.snackbar = true
    //   }
    // },
    login_form() {
      const address = endpoint.get("sessions");
      axios.post(address, this.login).then(response => {
        console.log(response)
        // debugger;
        // && response.data.user.profile == "admin"
        if (response.status == 200 ) {
          localStorage.clear('')
          localStorage.setItem("app_user", JSON.stringify(response.data));
          localStorage.setItem("user_name", response.data.user.name);
          localStorage.setItem("user_id", response.data.user.id);
          localStorage.setItem("user_email", response.data.user.email);
          localStorage.setItem("user_whatsapp", response.data.user.whatsapp);
          localStorage.setItem("user_profile", response.data.user.profile);
          localStorage.setItem("user_token", response.data.token);
          this.$router.push("/alerta")
        }
      })
      .catch(() => {
        this.snackbar = true;
      });
    }
  }
};
</script>

<style scoped>
@import url(https://fonts.googleapis.com/css?family=Roboto:300);

.login-page {
  width: 360px;
  padding: 8% 0 0;
  margin: auto;
}
.form {
  position: relative;
  z-index: 1;
  background: #FFFFFF;
  max-width: 360px;
  margin: 0 auto 100px;
  padding: 45px;
  text-align: center;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
}
.form input {
  font-family: "Roboto", sans-serif;
  outline: 0;
  background: #f2f2f2;
  width: 100%;
  border: 0;
  margin: 0 0 15px;
  padding: 15px;
  box-sizing: border-box;
  font-size: 14px;
}
.form button {
  font-family: "Roboto", sans-serif;
  text-transform: uppercase;
  outline: 0;
  background: #4CAF50;
  width: 100%;
  border: 0;
  padding: 15px;
  color: #FFFFFF;
  font-size: 14px;
  -webkit-transition: all 0.3 ease;
  transition: all 0.3 ease;
  cursor: pointer;
}
.form button:hover,.form button:active,.form button:focus {
  background: #43A047;
}
.form .message {
  margin: 15px 0 0;
  color: #b3b3b3;
  font-size: 12px;
}
.form .message a {
  color: #4CAF50;
  text-decoration: none;
}
.form .register-form {
  display: none;
}
.container {
  position: relative;
  z-index: 1;
  max-width: 300px;
  margin: 0 auto;
}
.container:before, .container:after {
  content: "";
  display: block;
  clear: both;
}
.container .info {
  margin: 50px auto;
  text-align: center;
}
.container .info h1 {
  margin: 0 0 15px;
  padding: 0;
  font-size: 36px;
  font-weight: 300;
  color: #1a1a1a;
}
.container .info span {
  color: #4d4d4d;
  font-size: 12px;
}
.container .info span a {
  color: #000000;
  text-decoration: none;
}
.container .info span .fa {
  color: #EF3B3A;
}
.inspire {
  background: #76b852; /* fallback for old browsers */
  background: -webkit-linear-gradient(right, #76b852, #8DC26F);
  background: -moz-linear-gradient(right, #76b852, #8DC26F);
  background: -o-linear-gradient(right, #76b852, #8DC26F);
  background: linear-gradient(to left, #76b852, #8DC26F);
  font-family: "Roboto", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;      
}
</style>