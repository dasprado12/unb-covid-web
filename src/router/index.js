import Vue from "vue";
import VueRouter from "vue-router";
import jwt_decode from "jwt-decode"


// import Home from "../home/views/Home.vue"
import Login from "../Auth/Login.vue";

import AlertaSystem from "../alerta/Alerta.vue";
import AlertaHome from "../alerta/views/Home.vue"
import AlertaReports from "../alerta/views/Reports.vue"
import AlertaUsers from "../alerta/views/Users.vue"


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Login,
    name: "Login"
  },
  {
    path: "/alerta",
    component: AlertaSystem,
    beforeEnter: (to, from, next)=>{
      let token = localStorage.getItem('user_token')
      let decode = false
      
      if(token){
        decode = jwt_decode(token)
      }
      if( !( Date.now() < decode.exp * 1000 ) ){
        next({name: "Login", query: { message: "error" }})
        console.log('Something went wrong')
      }else{
        next()
      }
    },
    children: [
      {
        path: "",
        name: "Home",
        component: AlertaHome
      },
      {
        path: "reports",
        name: "reports",
        component: AlertaReports
      },
      {
        path: "users",
        name: "users",
        component: AlertaUsers
      }
    ]
  },
  {
    path: '*',
    beforeEnter: (to, from, next) => {
      next({name: "Login"})
    }
  }
];

const router = new VueRouter({
  routes
});

export default router;
