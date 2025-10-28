import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import PlanoConta from '../views/planoconta/PlanoConta.vue'
import Transacoes from '../views/transacoes/Transacoes.vue'

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/about', name: 'About', component: About },
    { path: '/planoconta', name: 'Plano de Contas', component: PlanoConta },
    { path: '/transacoes', name: 'Transações Financeiras', component: Transacoes },
]
export const router = createRouter({
    history: createWebHistory(),
    routes
}) 