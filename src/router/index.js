import Vue from "vue";
import VueRouter from "vue-router";
import Signin from "../components/auth/Signin.vue";
import Signup from "../components/auth/Signup.vue";
import ForgotPass from "../components/auth/Forgot-pass.vue";
import ResetPass from "../components/auth/Reset-pass.vue";
import Home from "../components/home/Home.vue"
import Dashboard from "../components/dashboard/Dashboard.vue";
import Profile from "../components/profile/Profile.vue";
import Index from "../components/landing/Index.vue";
import UserMgmt from "../components/UserMgmt/UserMgmt.vue";


Vue.use(VueRouter);

const routes = [
  // {
  //   path: '/',
  //   name: 'landing',
  //   component: Index
  // },
  {
    path: "/login",
    name: "login",
    component: Signin
  },
  {
    path: "/sign-up",
    name: "sign-up",
    component: Signup
  },
  {
    path: "/forgot-password",
    name: "forgotPassword",
    component: ForgotPass
  },
  {
    path: "/reset-password/:token",
    name: "resetPass",
    component: ResetPass
  },
  {
    path:"/home",
    name: "home",
    component: Home,
    redirect: '/home/dashboard',
    meta: { requiresAuth: true },
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: Dashboard,
        meta: { requiresAuth: true }
      },
      {
        path: "user-management",
        name: "userMgmt",
        component: UserMgmt,
        meta: { requiresAuth: true }
      },  
      {
        path: "my-profile",
        name: "profile",
        component: Profile,
        meta: { requiresAuth: true }
      },  
    ]
  },
  {
    path: '*',
    redirect: "/login"
  }
];

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!sessionStorage.getItem('token')) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router;
