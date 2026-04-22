<template>
    <main class="page">
<!-- header -->
    <header class="header">
        <button class="back" @click="router.push('/')">&lt; Home</button>
        <h1>My Collection</h1>
        <p>Personal record of your wildlife and plant sightings.</p>
    </header>
        <section aria-label="Saved species collection">
            <ul class="list">
                <li class="card" v-for="entry in entries" :key="entry.id">
                    <h2 class="name">{{ entry.name }}</h2>
                    <p class="meta"> 📍 {{ entry.location }}</p>
                    <p class="meta">🗓 {{ entry.date }}</p>
                </li>
            </ul>
        </section>
    </main>
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
.page {
  min-height: 100svh;
  padding: 20px;
  background: linear-gradient(to bottom, #f0f7f0, #e6efe6);
  color: #1a3d1a;
}
.header {
  max-width: 420px;
  margin: 0 auto 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
h1 {
  font-size: 24px;
  font-weight: 700;
  margin: 10px;
}
.subtitle {
  font-size: 14px;
  color: #4a7a4a;
  margin: 0;
}
.back {
  align-self: flex-start;
  background: white;
  border: 2px solid #3a8a3a;
  color: #2d6a2d;
  padding: 8px 16px;
  border-radius: 999px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s ease;
}
.back:hover {
  background: #f0f7f0;
}
.list {
  list-style: none;
  padding: 0;
  margin: 0 auto;
  max-width: 420px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.card {
  background: white;
  padding: 14px 16px;
  border-radius: 14px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.08);
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.name {
  font-size: 16px;
  font-weight: 700;
  margin: 0;
  color: #1a3d1a;
}
.meta {
  font-size: 13px;
  margin: 0;
  color: #4a6a4a;
}
</style>