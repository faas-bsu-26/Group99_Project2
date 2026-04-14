<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const profile = {
  name: 'Alex Thompson',
  username: '@alexnature42',
  initials: 'AT',
}


const posts = [
  { id: 1, species: 'Red-tailed Hawk',      image: '/red-tail-hawk.webp' },
  { id: 2, species: 'Chanterelle Mushroom', image: '/chantrelle.webp' },
  { id: 3, species: 'Virginia Bluebells',   image: '/virginia-bluebells.webp' },
  { id: 4, species: 'Eastern Cottontail',   image: '/eastern-cottontail.avif' },
]

const events = [
  {
    id: 1,
    name: 'Spring Bird Count',
    date: 'Apr 19, 2026',
    time: '6:30 AM',
    location: 'Lakeside Nature Reserve',
  },
  {
    id: 2,
    name: 'Wildflower Walk at Eagle Creek',
    date: 'Apr 26, 2026',
    time: '9:00 AM',
    location: 'Eagle Creek Park, Trailhead B',
  },
  {
    id: 3,
    name: 'Nocturnal Wildlife Tour',
    date: 'May 3, 2026',
    time: '7:30 PM',
    location: 'Whispering Pines State Forest',
  },
]
</script>

<template>
  <div class="page">
    <div class="container">

      <!-- Header -->
      <header class="page-header">
        <button class="back-btn" @click="router.push('/')" aria-label="Back to home">←</button>
        <h1 class="page-title">My Account</h1>
        <span class="header-spacer" />
      </header>

      <!-- Profile -->
      <section class="profile-card">
        <div class="avatar">{{ profile.initials }}</div>
        <div class="profile-info">
          <span class="profile-name">{{ profile.name }}</span>
          <span class="profile-username">{{ profile.username }}</span>
          <div class="profile-stats">
            <span class="stat"><strong>{{ posts.length }}</strong> logs</span>
            <span class="stat-divider" />
            <span class="stat"><strong>{{ events.length }}</strong> events</span>
          </div>
        </div>
      </section>

      <!-- Species logs -->
      <section class="content-section">
        <div class="section-title-row">
          <h2 class="section-title">My Species Logs</h2>
          <span class="scroll-hint">Scroll ›</span>
        </div>
        <div class="photo-scroll">
          <div v-for="post in posts" :key="post.id" class="photo-card">
            <div class="photo-wrap">
              <img v-if="post.image" :src="post.image" :alt="post.species" class="photo-img" />
              <div v-else class="photo-placeholder">🌿</div>
            </div>
            <span class="photo-name">{{ post.species }}</span>
          </div>
        </div>
      </section>

      <!-- Events -->
      <section class="content-section">
        <h2 class="section-title">Upcoming Events</h2>
        <div class="event-list">
          <div v-for="event in events" :key="event.id" class="event-card">
            <div class="event-accent" />
            <div class="event-body">
              <div class="event-top">
                <span class="event-name">{{ event.name }}</span>
                <span class="attending-badge">Attending</span>
              </div>
              <div class="event-meta">
                <span>📅 {{ event.date }} · {{ event.time }}</span>
              </div>
              <div class="event-meta">
                <span>📍 {{ event.location }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  </div>
</template>

<style scoped>
/* ── Page shell ── */
.page {
  min-height: 100svh;
  background: linear-gradient(160deg, #f5f0e8 0%, #ede8dc 50%, #e4ddd0 100%);
  display: flex;
  justify-content: center;
  padding-bottom: 48px;
  box-sizing: border-box;
}

.container {
  width: 100%;
  max-width: 480px;
  padding: 0 16px;
  box-sizing: border-box;
}

/* ── Header ── */
.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0 16px;
  gap: 12px;
}

.back-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid #3a8a3a;
  background: transparent;
  color: #2d6a2d;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: background 0.15s, color 0.15s;
}

.back-btn:hover,
.back-btn:active {
  background: #2d6a2d;
  color: #fff;
}

.page-title {
  font-size: 22px;
  font-weight: 700;
  color: #1a3d1a;
  margin: 0;
  letter-spacing: -0.3px;
}

.header-spacer {
  width: 40px;
  flex-shrink: 0;
}

/* ── Profile card ── */
.profile-card {
  display: flex;
  align-items: center;
  gap: 18px;
  background: #fff;
  border-radius: 20px;
  padding: 20px;
  margin-bottom: 24px;
  box-shadow: 0 2px 12px rgba(34, 84, 34, 0.1);
}

.avatar {
  width: 68px;
  height: 68px;
  border-radius: 50%;
  background: linear-gradient(135deg, #3a8a3a, #2d6a2d);
  color: #fff;
  font-size: 22px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  letter-spacing: 1px;
}

.profile-info {
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-width: 0;
}

.profile-name {
  font-size: 18px;
  font-weight: 700;
  color: #1a3d1a;
  line-height: 1.2;
}

.profile-username {
  font-size: 13px;
  color: #8a9a8a;
  font-weight: 400;
}

.profile-stats {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 6px;
}

.stat {
  font-size: 13px;
  color: #5a7a5a;
}

.stat strong {
  color: #1a3d1a;
  font-weight: 700;
}

.stat-divider {
  width: 1px;
  height: 12px;
  background: #d0ddd0;
}

/* ── Section headings ── */
.content-section {
  margin-bottom: 28px;
}

.section-title {
  font-size: 16px;
  font-weight: 700;
  color: #1a3d1a;
  margin: 0 0 12px;
  letter-spacing: 0.3px;
  text-transform: uppercase;
}

/* ── Photo scroll ── */
.section-title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.section-title-row .section-title {
  margin-bottom: 0;
}

.scroll-hint {
  font-size: 13px;
  font-weight: 600;
  color: #3a8a3a;
  letter-spacing: 0.2px;
}

.photo-scroll {
  display: flex;
  gap: 12px;
  overflow-x: auto;
  padding-bottom: 8px;
  scrollbar-width: none;
  scroll-snap-type: x mandatory;
}

.photo-scroll::-webkit-scrollbar {
  display: none;
}

.photo-card {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  scroll-snap-align: start;
}

.photo-wrap {
  width: 120px;
  height: 120px;
  border-radius: 12px;
  overflow: hidden;
  background: linear-gradient(135deg, #e8f5e4, #d4edce);
  box-shadow: 0 2px 8px rgba(34, 84, 34, 0.08);
}

.photo-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.photo-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
}

.photo-name {
  font-size: 11px;
  font-weight: 600;
  color: #3d5a3d;
  text-align: center;
  line-height: 1.3;
  width: 120px;
}

/* ── Event cards ── */
.event-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.event-card {
  background: #fff;
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(34, 84, 34, 0.07);
  display: flex;
  gap: 14px;
  align-items: stretch;
}

.event-accent {
  width: 4px;
  border-radius: 4px;
  background: linear-gradient(180deg, #3a8a3a, #2d6a2d);
  flex-shrink: 0;
}

.event-body {
  flex: 1;
  min-width: 0;
}

.event-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 6px;
}

.event-name {
  font-size: 15px;
  font-weight: 700;
  color: #1a3d1a;
  line-height: 1.3;
  flex: 1;
}

.attending-badge {
  font-size: 11px;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 50px;
  background: #dcfce7;
  color: #15803d;
  white-space: nowrap;
  flex-shrink: 0;
  letter-spacing: 0.2px;
}

.event-meta {
  font-size: 12px;
  color: #8a9a8a;
  margin-bottom: 3px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
