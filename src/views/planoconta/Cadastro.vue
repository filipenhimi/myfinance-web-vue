<template>
    <div class="container mt-4">
        <h4>Cadastro de Plano de Contas</h4>

        <div v-if="loading" class="text-muted">
            Carregando dados do plano de contas...
        </div>

        <div v-else>
            <form @submit.prevent="salvar" class="mt-3">
                <div class="mb-3">
                    <label class="form-label">Descrição</label>
                    <input v-model="planoConta.descricao" type="text" class="form-control"
                        placeholder="Digite a descrição" required />
                </div>

                <div class="mb-3">
                    <label class="form-label">Tipo</label>
                    <select v-model="planoConta.tipo" class="form-select" required>
                        <option disabled value="">Selecione o tipo</option>
                        <option value="R">Receita</option>
                        <option value="D">Despesa</option>
                    </select>
                </div>

                <div class="mt-3">
                    <button type="submit" class="btn btn-success me-2">
                        {{ planoConta.id ? 'Atualizar' : 'Salvar' }}
                    </button>
                    <button type="button" class="btn btn-secondary" @click="voltar">
                        Voltar
                    </button>
                </div>
            </form>

            <div v-if="erro" class="alert alert-danger mt-3">
                {{ erro }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { api } from '../../api/api';

interface PlanoConta {
    id: number;
    descricao: string;
    tipo: string;
}

const route = useRoute();
const router = useRouter();

const planoConta = ref<PlanoConta>({
    id: 0,
    descricao: '',
    tipo: '',
});

const loading = ref(false);
const erro = ref('');

const voltar = () => {
    router.push({ name: 'planoconta' });
}

const salvar = async () => {
    try {
        loading.value = true;
        if (planoConta.value.id > 0) {
            await api.put<PlanoConta>('/planoconta', planoConta.value);
            alert('Registro atualizado com sucesso!');
        } else {
            const result = await api.post<PlanoConta>('/planoconta', planoConta.value);
            alert(`Registro inserido com sucesso! ID: ${result.id}`);
        }
        router.push({ name: 'planoconta' });
    } catch (e: any) {
        console.error('Erro ao salvar plano de conta:', e);
        erro.value = 'Erro ao salvar o plano de contas.';
    } finally {
        loading.value = false;
    }
};

onMounted(async () => {
    const id = route.params.id as string | undefined;
    if (id) {
        try {
            loading.value = true;
            const data = await api.get<PlanoConta>(`/planoconta/${id}`);
            planoConta.value = data;
        } catch (e: any) {
            console.error('Erro ao carregar plano de conta:', e);
            erro.value = 'Erro ao carregar o registro.';
        } finally {
            loading.value = false;
        }
    }
});

</script>