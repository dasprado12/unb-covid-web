import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../Auth/Login.vue";
import LayoutSistema from "../views/LayoutSistema.vue";
import Maps from "../views/Map.vue";
import Usuarios from "../views/Usuarios.vue";
import Alertas from "../views/Alertas.vue";
import Heat from "../views/HeatMap.vue";
// import { userAuth } from "../states/userAuth.js";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
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
          path: "/",
          name: "alertas",
          component: Alertas
        },
        {
          path: "/heatmap",
          name: "heat",
          component: Heat
        }
    ]
  },
  {
      path: "/login",
      name: "Login",
      component: Login
  }
];

const router = new VueRouter({
  routes
});

let token = localStorage.getItem('user_token')

router.beforeEach((to, from, next) => {
  if((to.name !== "Login") && !token) {
    next({ name: "Login" })
  } else {
    next()
  }
})

export default router;
