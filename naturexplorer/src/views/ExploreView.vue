<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<template>
  <div class="stub">
    <button class="back" @click="router.push('/')">← Back</button>
    <h1>Explore</h1>
    <div class="map-container">
      <img src="/map.png" class="map"/>
      <div class="you">You are here</div>
      <div class="pin" style="top: 30%; left: 60%;">𖠰</div>
      <div class="pin" style="top: 60%; left: 30%;">𓅓</div>
    </div>
    <div class="weather">
      65°F • Clear
    </div>
  </div>
</template>

<style scoped>
.stub { min-height: 100svh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 16px; background: #f0f7f0; color: #1a3d1a; padding: 20px;}
.back { background: none; border: 2px solid #3a8a3a; color: #2d6a2d; padding: 8px 18px; border-radius: 50px; cursor: pointer; font-size: 15px; font-weight: 600; }
.map-container{position: relative; margin-top: 20px;}
.map{width: 100%; border-radius: 12px;}
.you{position: absolute; top: 50%; left: 50%; font-size: 20px;}
.pin{ position: absolute; font-size: 20px;}
.weather{ margin-top: 15px; font-size: 18px;}
</style>
