import Vue from 'vue';
import VueRouter from 'vue-router';
import Main from '../views/Main.vue'
Vue.use(VueRouter);

async function checkAuth(to, from, next) {
  try {
    await Vue.prototype.$api.checkAuth();
    next();
  } catch (err) {
    console.log(err);
  }
}

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('../views/Auth.vue'),
    children: [
      {
        path: 'sign-in',
        name: 'SignIn',
        component: () => import('../views/SignIn.vue'),
      },
      {
        path: 'sign-up',
        name: 'SignUp',
        component: () => import('../views/SignUp.vue'),
      },
    ]
  },
  {
    path: '/seller/:id',
    name: 'Seller',
    component: () => import('../views/Seller.vue'),
  },
  {
    path: '/shop-item/:id',
    name: 'ShopItem',
    component: () => import('../views/ShopItem.vue'),
  },
  {
    path: '/seller-shop-item/:id',
    name: 'SellerShopItem',
    component: () => import('../views/SellerShopItem.vue'),
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue'),
    beforeEnter: checkAuth
  },
  {
    path: '/seller-profile',
    name: 'SellerProfile',
    component: () => import('../views/SellerProfile.vue'),
    beforeEnter: checkAuth
  },
  {
    path: '/chats',
    name: 'Chats',
    component: () => import('../views/Chats.vue'),
    beforeEnter: checkAuth
  },
  {
    path: '/chat/:id',
    name: 'Chat',
    component: () => import('../views/Chat.vue'),
    beforeEnter: checkAuth
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
