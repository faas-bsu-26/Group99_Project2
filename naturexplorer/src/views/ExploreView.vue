<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<template>
  <div class="stub">
    <button class="back" @click="router.push('/')">← Back</button>
    <h1>Explore</h1>
    <div class="map-container">
      <img src="/public/map.png" class="map"/>
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
.stub { 
  min-height: 100svh; 
  display: flex; 
  flex-direction: column; 
  align-items: center;
  gap: 20px; 
  background: linear-gradient(to bottom,#f0f7f0, #c3c3c3); 
  color: #1a3d1a; 
  padding: 20px;
}
h1{
  font-size: 28px;
  font-weight: 700;
  margin-top: 10px;
  color: black;
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
.back:hover{
  transform: translateY(-1px);
  background: #f0f7f0;
}
.map-container{
  position: relative; 
  width: 100%;
  max-width: 400px;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
  margin-top: 20px;
}
.map{
  width: 100%; 
  display: block;
  border-radius: 12px;
}
.you{
  position: absolute; 
  top: 50%; 
  left: 50%; 
  transform: translate(-50%, -120%);
  background: #ffffff;
  padding: 6px 10px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  box-shadow: 0 2px 6px rgba(0,0,0,0.15);
}
.pin{ 
  position: absolute; 
  font-size: 20px;
  transform: translate(-50%, -50%);
  background: #2d6a2d;
  color: white;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 6px rgba(0,0,0,0.2);
}
.weather{ 
  margin-top: 15px; 
  font-size: 18px;
  background: white;
  padding: 10px 16px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.08);
  font-weight: 500;
}
</style>
