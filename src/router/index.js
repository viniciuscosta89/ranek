/* eslint-disable no-unused-vars */
import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Produto from '../views/Product.vue';
import Login from '../views/Login.vue';
import User from '../views/user/User.vue';
import UserProducts from '../views/user/UserProducts.vue';
import UserPurchases from '../views/user/UserPurchases.vue';
import UserSales from '../views/user/UserSales.vue';
import UserEdit from '../views/user/UserEdit.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/produto/:id',
    name: 'produto',
    component: Produto,
    props: true,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/usuario',
    component: User,
    meta: {
      login: true,
    },
    children: [
      {
        path: '',
        name: 'usuario',
        component: UserProducts,
      },
      {
        path: 'compras',
        name: 'compras',
        component: UserPurchases,
      },
      {
        path: 'vendas',
        name: 'vendas',
        component: UserSales,
      },
      {
        path: 'editar',
        name: 'usuario-editar',
        component: UserEdit,
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return window.scrollTo({ top: 0, behavior: 'smooth' });
  },
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.login)) {
    if (!window.localStorage.token) {
      next('/login');
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
