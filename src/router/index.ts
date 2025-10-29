import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import PlanoConta from '../views/planoconta/PlanoConta.vue'
import Transacoes from '../views/transacoes/Transacoes.vue'
import Cadastro from '../views/planoconta/Cadastro.vue'

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/about', name: 'About', component: About },
    { path: '/planoconta', name: 'planoconta', component: PlanoConta },
    { path: '/cadastroplanoconta/:id?', name: 'cadastroplanoconta', component: Cadastro },
    { path: '/transacoes', name: 'transacoes', component: Transacoes },
]
export const router = createRouter({
    history: createWebHistory(),
    routes
}) 