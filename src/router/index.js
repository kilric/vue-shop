import Vue from 'vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Element from "less/lib/less/tree/element";
import Login from "../components/Login";
import Home from "../components/Home";

Vue.use(VueRouter);
Vue.use(ElementUI);
// Vue.use(Element);

const routes = [
  {
    path:'/login',
    name:'login',
    component:Login
  },
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/home',
    component: Home,
    name: 'home'
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

// 路由导航守卫
router.beforeEach((to,from,next) => {
  if (to.path === '/login') return next();
  const tokenStr = window.sessionStorage.getItem('token');
  if (!tokenStr) return next('/login'); // 如果无效，强制跳转到登录
  // 携带token，则放行
  next();
});

router.afterEach((to,from) => {
  console.log('离开！' + from.name);
  console.log('去往' + to.name);
});

export default router
