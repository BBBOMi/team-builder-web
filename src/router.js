import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Signup from './views/signup/Signup'
import Login from './views/login/Login'
import store from './store/modules/auth'
import Admin from "./views/admin/Admin";

Vue.use(Router);

const requireAuth = () => (from, to, next) => {
  if (store.getters.getAuth) return next();
  next('/login')
};

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      beforeEnter: requireAuth()
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup,
      props: true
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      props: true
    },
    {
      path: '/example',
      name: 'Example',
      component: () => import(/* webpackChunkName: "example" */ './views/Example.vue')
    },
    {
      path: '/editor',
      name: 'Editor',
      component: () => import(/* webpackChunkName: "editor" */ './views/Editor.vue')
    },
    {
      path: '/info',
      name: 'Info',
      component: () => import(/* webpackChunkName: "editor" */ './views/info/Info.vue')
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin
    },
    {
      path: '*',
      name: 'NotFound',
      component: () => import(/* webpackChunkName: "NotFound" */ './views/NotFound.vue')
    },
    {
      path: '/session',
      name: 'Session',
      component: () => import(/* webpackChunkName: "Main" */ './views/Main.vue'),
    },
  ]
})
