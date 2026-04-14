<template>
    <div class="page">
        <button class="back" @click="router.push('/')">&lt; Home</button>
        <h1>My Collection</h1>
        <div class="card" v-for="entry in entries" :key="entry.id">
            <h3>{{ entry.name }}</h3>
            <p>{{ entry.location }}</p>
            <p>{{ entry.date }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
const entries = [
    {id:1, name: 'Hawk', location: 'Trail', date: 'Apr 12'},
    {id:2, name: 'Cattail', location: 'Creek', date: 'Apr 8'}
] 
</script>

<style scoped>
.page{
    padding: 20px;
}
.card{
    background: white;
    padding: 12px;
    margin: 10px;
    border-radius: 12px;
}
.back{
    margin-bottom: 10px;
}
</style>