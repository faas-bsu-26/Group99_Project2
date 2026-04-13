<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<template>
  <div class="stub">
    <button class="back" @click="router.push('/')">← Back</button>
  </div>
</template>

<style scoped>
.stub { min-height: 100svh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 16px; background: #f0f7f0; color: #1a3d1a; }
.back { background: none; border: 2px solid #3a8a3a; color: #2d6a2d; padding: 8px 18px; border-radius: 50px; cursor: pointer; font-size: 15px; font-weight: 600; }
</style>
