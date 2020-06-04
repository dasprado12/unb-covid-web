import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../Auth/Login.vue";

import LayoutUnbSolidaria from "../views/LayoutUnbSolidaria.vue";
import Usuarios from "../views/System/Users.vue";

import Maps from "../views/System/solidaria/Map.vue";
import Alertas from "../views/System/solidaria/Alerts.vue";
import Heat from "../views/System/solidaria/HeatMap.vue";

// import Socorro from "../views/System/Socorro.vue";

import HomeLayout from "../views/Home.vue";
import Home from "../views/Home/Home.vue";
import Dados from "../views/Home/Dados.vue";
import Teste from "../views/Home/components/charts/TreeChart.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/System",
    name: 'system',
    component: LayoutUnbSolidaria,
    children: [
        {
          path: "/map",
          name: "maps",
          component: Maps,
        },
        {
          path: "/usuarios",
          name: "usuarios",
          component: Usuarios
        },
        {
          path: "/alertas",
          name: "alertas",
          component: Alertas
        },
        {
          path: "/heatmap",
          name: "heat",
          component: Heat
        }
        // {
        //   path: "/socorro",
        //   name: "socorro",
        //   component: Socorro
        // }
    ]
  },
  {
    path: "/",
    component: HomeLayout,
    children: [
        {
          path: "/",
          name: "home",
          component: Home,
        },
        {
          path: "/Dados",
          name: "dados",
          component: Dados,
        },
        {
          path: "/login",
          name: "Login",
          component: Login
        },
        {
          path: "/teste",
          name: "Teste",
          component: Teste
        }
    ]
  }
];

const router = new VueRouter({
  routes
});

// let token = localStorage.getItem('user_token')

// router.beforeEach((to, from, next) => {
//   if((to.name == "system") && !token) {
//     next({ name: "Login" })
//   } else {
//     next()
//   }
// })

export default router;
