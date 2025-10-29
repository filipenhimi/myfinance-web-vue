<template>
    <div class="container mt-4">
        <h4>Plano de Contas</h4>

        <button class="btn btn-info" @click="cadastrar">Cadastrar Plano de Conta</button>

        <div v-if="loading" class="text-muted">
            Carregando dados do plano de contas...
        </div>

        <div v-else-if="erro" class="alert alert-danger">
            {{ erro }}
        </div>

        <div v-else-if="planoConta.length > 0">
            <table class="table table-striped table-bordered mt-3">
                <thead class="table-light">
                    <tr>
                        <th>ID</th>
                        <th>Descrição</th>
                        <th>Tipo</th>
                        <th>#</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="plano in planoConta" :key="plano.id">
                        <td>{{ plano.id }}</td>
                        <td>{{ plano.descricao }}</td>
                        <td>{{ plano.tipo }}</td>
                        <td>
                            <button class="btn btn-warning" @click="editar(plano.id)">Editar</button>
                            <button class="btn btn-danger mx-2" @click="excluir(plano.id)">Excluir</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div v-else class="alert alert-info">
            Nenhum plano de conta encontrado.
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { api } from '../../api/api'
import { router } from '../../router';
import type { ExclusaoModel } from '../../models/ExclusaoModel';

interface PlanoConta {
    id: number;
    descricao: string;
    tipo: string;
}

const planoConta = ref<PlanoConta[]>([]);
const loading = ref(true);
const erro = ref('');

const cadastrar = () => {
    router.push('cadastroplanoconta');
}

const editar = (id: number) => {
    router.push({ name: 'cadastroplanoconta', params: { id: id } });
}

const excluir = async (id: number) => {
    try {
        const data = await api.delete<ExclusaoModel>(`/planoconta/${id}`);
        console.log(data.sucesso);
    } catch (e: any) {
        erro.value = 'Erro ao excluir o plano de contas.';
        console.error(e);
    } finally {
        carregarTabela();
        loading.value = false;
    }
}

const carregarTabela = async () => {
    try {
        const data = await api.get<PlanoConta[]>('/planoconta');
        planoConta.value = data;
    } catch (e: any) {
        erro.value = 'Erro ao carregar o plano de contas.';
        console.error(e);
    } finally {
        loading.value = false;
    }
}

onMounted(async () => {
    carregarTabela();
});

</script>