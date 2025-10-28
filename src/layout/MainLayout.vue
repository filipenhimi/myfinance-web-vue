<template>
    <div class="container-fluid">
        <div class="row">
            <nav class="col-md-2 d-none d-md-block bg-light 
sidebar vh-100 pt-4">
                <ul class="nav flex-column">
                    <li class="nav-item">
                        <RouterLink class="nav-link" to="/">Home</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink class="nav-link" to="/about">About</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink class="nav-link" to="/planoconta">Plano Conta</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink class="nav-link" to="/transacoes">Transações Financeiras</RouterLink>
                    </li>
                </ul>
            </nav>
            <main class="col-md-10 pt-4">
                <router-view />
            </main>
        </div>
    </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.sidebar {
    border-right: 1px solid #ddd;
}
</style>