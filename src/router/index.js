import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../Auth/Login.vue";
import LayoutSistema from "../views/LayoutSistema.vue";

import Maps from "../views/System/Map.vue";
import Usuarios from "../views/System/Users.vue";
import Alertas from "../views/System/Alerts.vue";
import Heat from "../views/System/HeatMap.vue";
import DFmap from "../views/System/DFmap.vue";

import HomeLayout from "../views/Home.vue";
import Home from "../views/Home/Home.vue";
import Dados from "../views/Home/Dados.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/System",
    name: 'system',
    component: LayoutSistema,
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
        },
        {
          path: '/DFmap',
          name: 'DFmap',
          component: DFmap
        }
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
