import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../Auth/Login.vue";

import ChooseSystem from "../views/Layout.vue";

import UnBSolidaria from "../views/LayoutSolidaria.vue";
import Usuarios from "../views/Commom/Users.vue";
import Maps from "../views/Solidaria/Map.vue";
import Alertas from "../views/Solidaria/Alerts.vue";
import Heat from "../views/Solidaria/HeatMap.vue";



import UnBSOS from "../views/LayoutSos.vue";
import sosAlertas from "../views/Sos/Alerts.vue";
// import Dados from "../views/Home/Dados.vue";
// import Teste from "../views/Home/components/charts/TreeChart.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'ChooseSystem',
    component: ChooseSystem,
  },
  {    
    path: '/solidaria',
    component: UnBSolidaria,
    children: [
      {
        path: "/solidaria/alertas",
        name: "alertas",
        component: Alertas
      },
      {
        path: "/solidaria/usuarios",
        name: "usuarios",
        component: Usuarios
      },
      {
        path: "/solidaria/map",
        name: "maps",
        component: Maps,
      },
      {
        path: "/solidaria/heatmap",
        name: "heat",
        component: Heat
      }
    ]
  },
  {
    path: '/sos',
    component: UnBSOS,
    children: [
      {
        path: "/sos/alertas",
        name: "alertas",
        component: sosAlertas
      },
      {
        path: "/sos/usuarios",
        name: "usuarios",
        component: Usuarios
      }
    ]
  },
  {
    path: "/login",
    name: "login",
    component: Login
  }
  // },
  // {
  //   path: "/",
  //   component: HomeLayout,
  //   children: [
  //       {
  //         path: "/",
  //         name: "home",
  //         component: Home,
  //       },
  //       {
  //         path: "/Dados",
  //         name: "dados",
  //         component: Dados,
  //       },
  //       {
  //         path: "/login",
  //         name: "Login",
  //         component: Login
  //       },
  //       {
  //         path: "/teste",
  //         name: "Teste",
  //         component: Teste
  //       }
  //   ]
  // }
];

const router = new VueRouter({
  routes
});

let token = localStorage.getItem('user_token')

router.beforeEach((to, from, next) => {
  if( ((to.name != "login") ) && !token) {
    next({ name: "login" })
  } else {
    next()
  }
})

export default router;
