<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<template>
  <main class="stub">
<!-- header -->
 <header class="header">
    <button class="back" @click="router.push('/')">← Back</button>
    <h1>Explore</h1>
    <p class="subtitle">Discover wildlife and biodiversity near you!</p>
    </header>
<!-- map -->
    <div class="map-container">
      <img src="/public/map.jpg" class="map"/>
      <div class="you">You are here <br />📍</div>
      <div class="pin" style="top: 30%; left: 70%;">𖠰</div>
      <div class="pin" style="top: 60%; left: 30%;">𓅓</div>
    </div>
<!-- status -->
    <section class="weather">
      <strong>Weather: </strong>65°F • Clear
    </section>
  </main>
</template>

<style scoped>
.stub {
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
  background: linear-gradient(to bottom, #f0f7f0, #dfe9df);
  color: #1a3d1a;
  padding: 20px;
}
.header {
  width: 100%;
  max-width: 420px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
h1 {
  font-size: 26px;
  font-weight: 700;
  margin: 10px 0 0;
  color: #1a3d1a;
}
.subtitle {
  font-size: 14px;
  color: #4a7a4a;
  line-height: 1.5;
  margin: 0;
}
.back {
  align-self: flex-start;
  background: white;
  border: 2px solid #3a8a3a;
  color: #2d6a2d;
  padding: 8px 18px;
  border-radius: 99px;
  cursor: pointer;
  font-size: 15px;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  transition: all 0.2s ease;
}
.back:hover {
  transform: translateY(-1px);
  background: #f0f7f0;
}
.back:focus-visible {
  outline: 3px solid #3a8a3a;
  outline-offset: 2px;
}
.map-container {
  position: relative;
  width: 100%;
  max-width: 400px;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
  margin-top: 10px;
}
.map {
  width: 100%;
  display: block;
}
.you {
  position: absolute;
  text-align: center;
  top: 50%;
  left: 50%;
  transform: translate(70%, 80%);
  background: #e1e0e0;
  opacity: 0.9;
  border: 2px solid #000;
  padding: 4px 12px;
  border-radius: 8px;
  font-size: 10px;
  font-weight: 600;
  box-shadow: 0 2px 6px rgba(0,0,0,0.15);
}
.pin {
  position: absolute;
  font-size: 18px;
  transform: translate(-50%, -50%);
  background: #2d6a2d;
  color: white;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 6px rgba(0,0,0,0.2);
  border: 2px solid #000000;
}
.weather {
  margin-top: 10px;
  font-size: 15px;
  background: white;
  padding: 10px 16px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.08);
  font-weight: 500;
  color: #2d6a2d;
}
</style>