<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

type Category = 'Hiking' | 'Bird Watching' | 'Foraging' | 'Photography' | 'Wildlife'

interface Activity {
  id: number
  title: string
  category: Category
  date: string
  time: string
  checked: boolean
}

const categories: ('All' | Category)[] = ['All', 'Hiking', 'Bird Watching', 'Foraging', 'Photography', 'Wildlife']

const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
const tomorrow = new Date(Date.now() + 86400000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

const activities = ref<Activity[]>([
  { id: 1,  title: 'Morning Trail Hike',           category: 'Hiking',        date: today,    time: '7:00 AM',  checked: false },
  { id: 2,  title: 'Dawn Bird Survey',              category: 'Bird Watching', date: today,    time: '6:30 AM',  checked: false },
  { id: 3,  title: 'Wildflower Identification Walk',category: 'Foraging',      date: today,    time: '9:00 AM',  checked: false },
  { id: 4,  title: 'Creek-side Nature Photography', category: 'Photography',   date: today,    time: '10:30 AM', checked: false },
  { id: 5,  title: 'Deer Meadow Watch',             category: 'Wildlife',      date: today,    time: '5:30 PM',  checked: false },
  { id: 6,  title: 'Ridge Line Trek',               category: 'Hiking',        date: today,    time: '8:00 AM',  checked: false },
  { id: 7,  title: 'Raptor Spotting Session',       category: 'Bird Watching', date: today,    time: '4:00 PM',  checked: false },
  { id: 8,  title: 'Wild Mushroom Foray',           category: 'Foraging',      date: tomorrow, time: '8:30 AM',  checked: false },
  { id: 9,  title: 'Macro Insect Photography',      category: 'Photography',   date: tomorrow, time: '11:00 AM', checked: false },
  { id: 10, title: 'Fox Den Observation',           category: 'Wildlife',      date: tomorrow, time: '6:00 PM',  checked: false },
])

const search = ref('')
const activeFilter = ref<'All' | Category>('All')

const filtered = computed(() => {
  const q = search.value.trim().toLowerCase()
  return activities.value.filter(a => {
    const matchesCategory = activeFilter.value === 'All' || a.category === activeFilter.value
    const matchesSearch = !q || a.title.toLowerCase().includes(q)
    return matchesCategory && matchesSearch
  })
})

const categoryStyle: Record<Category, { bg: string; color: string }> = {
  'Hiking':        { bg: '#dcfce7', color: '#15803d' },
  'Bird Watching': { bg: '#dbeafe', color: '#1d4ed8' },
  'Foraging':      { bg: '#fef3c7', color: '#b45309' },
  'Photography':   { bg: '#f3e8ff', color: '#7e22ce' },
  'Wildlife':      { bg: '#ffedd5', color: '#c2410c' },
}
</script>

<template>
  <div class="page">
    <div class="container">

      <header class="page-header">
        <button class="back-btn" @click="router.push('/')" aria-label="Back to home">←</button>
        <h1 class="page-title">Today's Activities</h1>
        <span class="header-spacer" />
      </header>

      <div class="search-wrap">
        <span class="search-icon">🔍</span>
        <input
          v-model="search"
          type="text"
          class="search-input"
          placeholder="Search activities…"
        />
        <button v-if="search" class="search-clear" @click="search = ''">✕</button>
      </div>

      <div class="filter-row">
        <button
          v-for="cat in categories"
          :key="cat"
          class="filter-chip"
          :class="{ active: activeFilter === cat }"
          @click="activeFilter = cat"
        >
          {{ cat }}
        </button>
      </div>

      <div class="activity-list">
        <div
          v-for="activity in filtered"
          :key="activity.id"
          class="activity-card"
          :class="{ done: activity.checked }"
          @click="activity.checked = !activity.checked"
        >
          <div class="checkbox" :class="{ checked: activity.checked }">
            <svg v-if="activity.checked" viewBox="0 0 12 10" fill="none">
              <polyline points="1,5 4.5,8.5 11,1" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>

          <div class="card-body">
            <div class="card-top">
              <span class="card-title">{{ activity.title }}</span>
              <span
                class="card-tag"
                :style="{ background: categoryStyle[activity.category].bg, color: categoryStyle[activity.category].color }"
              >{{ activity.category }}</span>
            </div>
            <div class="card-meta">
              <span class="card-date">Date: {{ activity.date }}</span>
              <span class="card-time">Time: {{ activity.time }}</span>
            </div>
          </div>
        </div>

        <div v-if="filtered.length === 0" class="empty-state">
          <span class="empty-icon">🌿</span>
          <p>No activities match your search.</p>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
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
  font-size: 20px;
  font-weight: 700;
  color: #1a3d1a;
  margin: 0;
  letter-spacing: -0.3px;
  white-space: nowrap;
}

.header-spacer {
  width: 40px;
  flex-shrink: 0;
}

/* ── Search ── */
.search-wrap {
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.search-icon {
  position: absolute;
  left: 14px;
  font-size: 15px;
  pointer-events: none;
}

.search-input {
  width: 100%;
  box-sizing: border-box;
  padding: 12px 40px 12px 40px;
  border: 1.5px solid #d4cfc7;
  border-radius: 50px;
  font-size: 15px;
  color: #1a3d1a;
  background: #fff;
  outline: none;
  font-family: inherit;
  transition: border-color 0.15s, box-shadow 0.15s;
  -webkit-appearance: none;
  appearance: none;
}

.search-input:focus {
  border-color: #3a8a3a;
  box-shadow: 0 0 0 3px rgba(58, 138, 58, 0.12);
}

.search-input::placeholder {
  color: #a0a89a;
}

.search-clear {
  position: absolute;
  right: 14px;
  background: none;
  border: none;
  color: #a0a89a;
  font-size: 14px;
  cursor: pointer;
  padding: 0;
  line-height: 1;
}

.filter-row {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding-bottom: 4px;
  margin-bottom: 16px;
  scrollbar-width: none;
}

.filter-row::-webkit-scrollbar {
  display: none;
}

.filter-chip {
  flex-shrink: 0;
  padding: 7px 16px;
  border-radius: 50px;
  border: 1.5px solid #c0cfc0;
  background: #fff;
  color: #5a7a5a;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  font-family: inherit;
  white-space: nowrap;
  transition: background 0.15s, color 0.15s, border-color 0.15s;
}

.filter-chip.active {
  background: #2d6a2d;
  border-color: #2d6a2d;
  color: #fff;
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.activity-card {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  background: #fff;
  border-radius: 16px;
  padding: 14px 16px;
  box-shadow: 0 2px 8px rgba(34, 84, 34, 0.07);
  cursor: pointer;
  transition: opacity 0.2s, background 0.2s;
  -webkit-tap-highlight-color: transparent;
}

.activity-card.done {
  background: #f7f5f2;
  opacity: 0.7;
}

.checkbox {
  flex-shrink: 0;
  width: 22px;
  height: 22px;
  border-radius: 6px;
  border: 2px solid #b0c8b0;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2px;
  transition: background 0.15s, border-color 0.15s;
}

.checkbox.checked {
  background: #2d6a2d;
  border-color: #2d6a2d;
}

.checkbox svg {
  width: 12px;
  height: 10px;
}

.card-body {
  flex: 1;
  min-width: 0;
}

.card-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 6px;
}

.card-title {
  font-size: 15px;
  font-weight: 600;
  color: #1a3d1a;
  line-height: 1.35;
  flex: 1;
  transition: color 0.2s;
}

.done .card-title {
  text-decoration: line-through;
  color: #8a9a8a;
}

.card-tag {
  font-size: 11px;
  font-weight: 700;
  padding: 3px 9px;
  border-radius: 50px;
  white-space: nowrap;
  flex-shrink: 0;
  letter-spacing: 0.2px;
}

.card-meta {
  display: flex;
  align-items: center;
  gap: 12px;
}

.card-date,
.card-time {
  font-size: 12px;
  color: #8a9a8a;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 48px 0;
  color: #8a9a8a;
  font-size: 15px;
}

.empty-icon {
  font-size: 36px;
}
</style>
