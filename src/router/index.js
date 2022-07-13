import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import AgregarEventosView from '../views/AgregarEventosView.vue'
import AdministracionView from '../views/AdministracionView.vue'
import EventoView from '../views/EventoView.vue'
import VerTodoView from '../views/VerTodoView.vue'
import CategoriasView from '../views/CategoriasView.vue'
import TestView from '../views/TestView.vue'
import { currentUserPromise } from '../firebase'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/miseventos/:uid',
    name: 'miseventos',
    component: AdministracionView,
    meta: {
      auth: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/agregareventos',
    name: 'agregareventos',
    component: AgregarEventosView
  },
  {
    path: '/vertodo',
    name: 'vertodo',
    component: VerTodoView
  },
  {
    path: '/evento/:id',
    component: EventoView
  },
  {
    path: '/eventos/:categoria',
    component: CategoriasView
  },
  
  {
    path: '/test',
    name: 'test',
    component: TestView
  },
  {
    path: '/about',
    name: 'AboutView',
    component: AboutView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, from, next) => {
  const requireAuth = to.meta.auth
  const user = await currentUserPromise()

  if (requireAuth) {
    if (user) {
      next();
    } else {
      console.log("no existe el usuario")
      next("/login")
    }
  } else {
    next()
  }
})

export default router
