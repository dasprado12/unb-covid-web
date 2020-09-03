import Vue from "vue";
import VueRouter from "vue-router";
// import jwt from "jsonwebtoken"
import jwt_decode from "jwt-decode"
import Project from "../home/Home.vue"
import Home from "../home/views/Home.vue"
import Login from "../Auth/Login.vue";

import AlertaSystem from "../alerta/Alerta.vue";
import AlertaHome from "../alerta/views/Home.vue"
import AlertaReports from "../alerta/views/Reports.vue"
import AlertaUsers from "../alerta/views/Users.vue"


// import ChooseSystem from "../views/Layout.vue";

// import UnBSolidaria from "../views/LayoutSolidaria.vue";
// import Usuarios from "../views/Commom/Users.vue";
// import Maps from "../views/Solidaria/Map.vue";
// import Alertas from "../views/Solidaria/Alerts.vue";
// import Heat from "../views/Solidaria/HeatMap.vue";



// import UnBSOS from "../views/LayoutSos.vue";
// import sosAlertas from "../views/Sos/Alerts.vue";

let token = localStorage.getItem('user_token')

let decode = jwt_decode(token)


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Project,
    children: [
      {
        path: "",
        component: Home,
      },
      {
        path: "login",
        name: "Login",
        component: Login
      }
    ]
  },
  {
    path: "/alerta",
    component: AlertaSystem,
    beforeEnter: (to, from, next)=>{
      if( !(Date.now() >= decode * 1000)){
        next()
      }else{
        next({name: "Login", query: { message: "error" }})
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
  }
];

const router = new VueRouter({
  routes
});

// router.beforeEach((to, from, next) => {
//   if( ((to.name == "Login") )) {
//     alert("true")
//     next({path: "/"})
//   } else {
//     next()
//   }
// })

// let aux = true

// router.beforeEach((to, from, next) => {
//   if( ((to.name == "alerta"))) {
//     next({ name: "login" })
//   }else {
//     alert('po')
//   }
// })


// let token = localStorage.getItem('user_token')

// let res = undefined

// if(token){
  // res = api_test.token(token)
// }
// console.log("Meu token é: "+ res)

// router.beforeEach((to, from, next) => {
//   if( ((to.name != "login") ) && !token) {
//     next({ name: "login" })
//   } else {
//     next()
//   }
// })

// router.beforeEach( (to, from, next) => {
//   if( to.name == "dashboard" ){ next({name: "Project"}) } 
// } )

export default router;
