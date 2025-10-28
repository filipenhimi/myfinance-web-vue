<template>
    <div class="container mt-4">
        <h4>Plano de Contas</h4>

        <div v-if="loading" class="text-muted">
            Carregando dados do plano de contas...
        </div>

        <div v-else-if="erro" class="alert alert-danger">
            {{ erro }}
        </div>

        <div v-else-if="planoConta">
            <div class="card mt-3">
                <div class="card-body">
                    <p class="card-text mb-1"><strong>ID:</strong> {{ planoConta.id }}</p>
                    <p class="card-text mb-1"><strong>Descrição:</strong> {{ planoConta.descricao }}</p>
                    <p class="card-text mb-1"><strong>Tipo:</strong> {{ planoConta.tipo }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { api } from '../../api/api'

interface PlanoConta {
    id: number;
    descricao: string;
    tipo: string;
}

const planoConta = ref<PlanoConta | null>(null);
const loading = ref(true);
const erro = ref('');

onMounted(async () => {
    try {
        const data = await api.get<PlanoConta>('/planoconta/1');
        planoConta.value = data;
    } catch (e: any) {
        erro.value = 'Erro ao carregar o plano de contas.';
        console.error(e);
    } finally {
        loading.value = false;
    }
});
</script>