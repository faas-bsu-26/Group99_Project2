<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
const navItems = [
  {
    label: "Today's Activities",
    image: '/activities.png',
    route: '/activities',
    description: "See what events and experiences are happening today",
  },
  {
    label: 'Log Species',
    image: '/leaf.png',
    route: '/log-species',
    description: 'Record a new plant/animal sighting',
  },
  {
    label: 'Explore',
    image: '/map.png',
    route: '/explore',
    description: 'Discover nearby nature trails and hotspots',
  },
]
</script>

<template>
  <main class="home">
    <div class="container">
<!-- header-->
      <header class="header">
        <h1 class="title">Welcome to<br />
          <span class="brand">NaturExplorer</span>
        </h1>
        <p class="subtitle">Step outside. Discover the wild.<br />Every walk is a new adventure.</p>
      </header>

<!-- navigation -->
      <nav class="nav">
        <ul class="nav-list">
        <button
          v-for="item in navItems"
          :key="item.route"
          class="nav-btn"
          @click="router.push(item.route)"
          :aria-label="item.label + ' - ' + item.description"
        >
          <span class="btn-icon">
            <img :src="item.image" :alt="item.label + ' icon'" class="btn-icon-img" />
          </span>
          <span class="btn-content">
            <span class="btn-label">{{ item.label }}</span>
            <span class="btn-desc">{{ item.description }}</span>
          </span>
          <span class="btn-arrow">›</span>
        </button>
        </ul>
      </nav>
<!-- footer -->
      <footer class="footer">
        <button class="account-btn" @click="router.push('/account')">
          <span class="account-icon">👤</span>
          My Account
        </button>
      </footer>
    </div>
  </main>
</template>

<style scoped>
.home {
  min-height: 100svh;
  background: linear-gradient(160deg, #f5f0e8 0%, #ede8dc 50%, #e4ddd0 100%);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 0 16px 32px;
  box-sizing: border-box;
}
.container {
  width: 100%;
  max-width: 480px;
  display: flex;
  flex-direction: column;
  min-height: 100svh;
}
.header {
  padding: 56px 8px 40px;
  text-align: center;
}
.title {
  font-size: 32px;
  font-weight: 700;
  color: #1a3d1a;
  line-height: 1.25;
  margin: 0 0 12px;
  letter-spacing: -0.5px;
}
.brand {
  color: #2d6a2d;
  font-size: 38px;
}
.subtitle {
  font-size: 16px;
  color: #4a7a4a;
  line-height: 1.6;
  margin: 0;
  font-weight: 400;
}
.nav {
  flex: 1;
}
.nav-list{
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.nav-btn {
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
  padding: 20px 22px;
  background: #ffffff;
  border: none;
  border-radius: 18px;
  cursor: pointer;
  text-align: left;
  box-shadow:
    0 2px 8px rgba(34, 84, 34, 0.1),
    0 1px 3px rgba(34, 84, 34, 0.08);
  transition: transform 0.15s ease, box-shadow 0.15s ease, background 0.15s ease;
  position: relative;
  overflow: hidden;
}
.nav-btn::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 5px;
  background: linear-gradient(180deg, #3a8a3a, #2d6a2d);
  border-radius: 18px 0 0 18px;
}
.nav-btn:active {
  transform: scale(0.98);
  box-shadow: 0 1px 4px rgba(34, 84, 34, 0.12);
}
@media (hover: hover) {
  .nav-btn:hover {
    background: #f5fbf5;
    box-shadow:
      0 6px 20px rgba(34, 84, 34, 0.15),
      0 2px 6px rgba(34, 84, 34, 0.1);
    transform: translateY(-2px);
  }
}
.btn-icon {
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  background: linear-gradient(135deg, #e8f5e4, #d4edce);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.btn-icon-img {
  width: 28px;
  height: 28px;
  object-fit: contain;
}

.btn-content {
  display: flex;
  flex-direction: column;
  gap: 3px;
  flex: 1;
}

.btn-label {
  font-size: 17px;
  font-weight: 600;
  color: #1a3d1a;
}
.btn-desc {
  font-size: 13px;
  color: #6a9a6a;
}
.btn-arrow {
  font-size: 24px;
  color: #3a8a3a;
  flex-shrink: 0;
}
.footer {
  padding-top: 28px;
  display: flex;
  justify-content: center;
}
.account-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 28px;
  background: transparent;
  border: 2px solid #3a8a3a;
  border-radius: 50px;
  color: #2d6a2d;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease, transform 0.15s ease;
}
.account-btn:active {
  transform: scale(0.97);
}
@media (hover: hover) {
  .account-btn:hover {
    background: #2d6a2d;
    color: #ffffff;
  }
  .account-btn:hover .account-icon {
    filter: brightness(0) invert(1);
  }
}
.account-icon {
  font-size: 18px;
  transition: filter 0.15s ease;
}
</style>