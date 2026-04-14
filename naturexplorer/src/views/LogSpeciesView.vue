<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

type Category = 'Bird' | 'Plant' | 'Mammal' | 'Insect' | 'Reptile' | 'Fungi' | 'Other'

interface SpeciesEntry {
  id: number
  name: string
  category: Category
  location: string
  date: string
  notes: string
  image: string
}

const categories: Category[] = ['Bird', 'Plant', 'Mammal', 'Insect', 'Reptile', 'Fungi', 'Other']

const todayISO = new Date().toISOString().split('T')[0]

let nextId = 5

const entries = ref<SpeciesEntry[]>([
  {
    id: 1,
    name: 'Red-tailed Hawk',
    category: 'Bird',
    location: 'Riverside Trail, Oak Park',
    date: '2026-04-12',
    notes: 'Spotted circling above the meadow, likely hunting. Distinct rusty tail visible in sunlight.',
    image: '/red-tail-hawk.webp',
  },
  {
    id: 2,
    name: 'Chanterelle Mushroom',
    category: 'Fungi',
    location: 'Pine Ridge Forest',
    date: '2026-04-11',
    notes: 'Found a small cluster near a fallen oak. Golden-yellow, wavy cap edges.',
    image: '/chantrelle.webp',
  },
  {
    id: 3,
    name: 'Eastern Cottontail',
    category: 'Mammal',
    location: 'Backyard garden',
    date: '2026-04-10',
    notes: '',
    image: '/eastern-cottontail.avif',
  },
  {
    id: 4,
    name: 'Virginia Bluebells',
    category: 'Plant',
    location: 'Creekside path, Millbrook',
    date: '2026-04-08',
    notes: 'Full bloom along the creek bank. Beautiful clusters of blue-purple tubular flowers.',
    image: '/virginia-bluebells.webp',
  },
])

const sortedEntries = computed(() =>
  [...entries.value].sort((a, b) => (a.date < b.date ? 1 : -1))
)

const showModal = ref(false)

const form = reactive({
  name: '',
  category: 'Bird' as Category,
  location: '',
  date: todayISO,
  notes: '',
  image: '',
})

const errors = reactive({ name: false, location: false })

function openModal() {
  showModal.value = true
}

function closeModal() {
  showModal.value = false
  errors.name = false
  errors.location = false
}

function submit() {
  errors.name = !form.name.trim()
  errors.location = !form.location.trim()
  if (errors.name || errors.location) return

  entries.value.push({
    id: nextId++,
    name: form.name.trim(),
    category: form.category,
    location: form.location.trim(),
    date: form.date,
    notes: form.notes.trim(),
    image: form.image.trim(),
  })

  form.name = ''
  form.category = 'Bird'
  form.location = ''
  form.date = todayISO
  form.notes = ''
  form.image = ''
  closeModal()
}

const categoryStyle: Record<Category, { bg: string; color: string }> = {
  Bird:    { bg: '#dbeafe', color: '#1d4ed8' },
  Plant:   { bg: '#dcfce7', color: '#15803d' },
  Mammal:  { bg: '#fef3c7', color: '#b45309' },
  Insect:  { bg: '#ffedd5', color: '#c2410c' },
  Reptile: { bg: '#f3e8ff', color: '#7e22ce' },
  Fungi:   { bg: '#fce7f3', color: '#be185d' },
  Other:   { bg: '#f1f5f9', color: '#475569' },
}

function formatDate(iso: string) {
  const [y, m, d] = iso.split('-')
  return new Date(Number(y), Number(m) - 1, Number(d)).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  })
}
</script>

<template>
  <div class="page">
    <div class="container">

      <header class="page-header">
        <button class="back-btn" @click="router.push('/')" aria-label="Back to home">←</button>
        <h1 class="page-title">Log Species</h1>
        <button class="log-btn" @click="openModal">+ Log</button>
      </header>

      <section class="list-section">
        <h2 class="section-title">
          Logged Sightings
          <span class="count-badge">{{ sortedEntries.length }}</span>
        </h2>

        <div class="entry-list">
          <div v-for="entry in sortedEntries" :key="entry.id" class="entry-card">
            <div class="entry-image-wrap">
              <img v-if="entry.image" :src="entry.image" :alt="entry.name" class="entry-image" />
              <div v-else class="entry-image-placeholder">
                <span>🌿</span>
              </div>
            </div>
            <div class="entry-content">
              <div class="entry-top">
                <span class="entry-name">{{ entry.name }}</span>
                <span
                  class="entry-tag"
                  :style="{ background: categoryStyle[entry.category].bg, color: categoryStyle[entry.category].color }"
                >{{ entry.category }}</span>
              </div>
              <div class="entry-meta">
                <span class="entry-location">📍 {{ entry.location }}</span>
                <span class="entry-date">{{ formatDate(entry.date) }}</span>
              </div>
              <p v-if="entry.notes" class="entry-notes">{{ entry.notes }}</p>
            </div>
          </div>
        </div>
      </section>

    </div>

    <Teleport to="body">
      <Transition name="modal">
        <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
          <div class="modal">
            <div class="modal-header">
              <h2 class="modal-title">New Sighting</h2>
              <button class="close-btn" @click="closeModal" aria-label="Close">✕</button>
            </div>

            <div class="modal-body">
              <div class="field" :class="{ error: errors.name }">
                <label for="species-name">Species Name <span class="required">*</span></label>
                <input
                  id="species-name"
                  v-model="form.name"
                  type="text"
                  placeholder="e.g. American Robin"
                  @input="errors.name = false"
                />
                <span v-if="errors.name" class="error-msg">Please enter a species name.</span>
              </div>

              <div class="field">
                <label>Category</label>
                <div class="category-grid">
                  <button
                    v-for="cat in categories"
                    :key="cat"
                    type="button"
                    class="cat-chip"
                    :class="{ active: form.category === cat }"
                    :style="form.category === cat
                      ? { background: categoryStyle[cat].bg, color: categoryStyle[cat].color, borderColor: categoryStyle[cat].color }
                      : {}"
                    @click="form.category = cat"
                  >
                    {{ cat }}
                  </button>
                </div>
              </div>

              <div class="field" :class="{ error: errors.location }">
                <label for="location">Location <span class="required">*</span></label>
                <input
                  id="location"
                  v-model="form.location"
                  type="text"
                  placeholder="e.g. Riverside Trail"
                  @input="errors.location = false"
                />
                <span v-if="errors.location" class="error-msg">Please enter a location.</span>
              </div>

              <div class="field">
                <label for="sighting-date">Date</label>
                <input id="sighting-date" v-model="form.date" type="date" />
              </div>

              <div class="field">
                <label for="notes">Notes <span class="optional">(optional)</span></label>
                <textarea
                  id="notes"
                  v-model="form.notes"
                  rows="3"
                  placeholder="Observations, behavior, habitat…"
                />
              </div>

              <div class="field">
                <label for="image">Image Filename <span class="optional">(optional)</span></label>
                <input
                  id="image"
                  v-model="form.image"
                  type="text"
                  placeholder="e.g. /my-photo.jpg"
                />
              </div>
            </div>

            <div class="modal-footer">
              <button class="cancel-btn" @click="closeModal">Cancel</button>
              <button class="submit-btn" @click="submit">Log Species</button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
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

.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0 8px;
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

.section-title {
  font-size: 16px;
  font-weight: 700;
  color: #1a3d1a;
  margin: 0 0 14px;
  letter-spacing: 0.3px;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 8px;
}

.count-badge {
  font-size: 12px;
  font-weight: 700;
  background: #2d6a2d;
  color: #fff;
  border-radius: 50px;
  padding: 2px 9px;
  letter-spacing: 0;
  text-transform: none;
}

.list-section {
  margin-top: 12px;
}

.entry-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.entry-card {
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(34, 84, 34, 0.08);
  display: flex;
  align-items: stretch;
}

.entry-image-wrap {
  width: 80px;
  height: 80px;
  flex-shrink: 0;
  align-self: center;
  margin: 12px 0 12px 12px;
  border-radius: 10px;
  overflow: hidden;
}

.entry-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.entry-image-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #e8f5e4, #d4edce);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
}

.entry-content {
  flex: 1;
  min-width: 0;
  padding: 14px;
}

.entry-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 6px;
}

.entry-name {
  font-size: 16px;
  font-weight: 700;
  color: #1a3d1a;
  line-height: 1.3;
  flex: 1;
}

.entry-tag {
  font-size: 11px;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 50px;
  white-space: nowrap;
  flex-shrink: 0;
  letter-spacing: 0.2px;
}

.entry-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 8px;
}

.entry-location {
  font-size: 13px;
  color: #5a7a5a;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 1;
}

.entry-date {
  font-size: 12px;
  color: #8a9a8a;
  white-space: nowrap;
  flex-shrink: 0;
}

.entry-notes {
  font-size: 13px;
  color: #5a6a5a;
  line-height: 1.55;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.log-btn {
  padding: 8px 16px;
  background: linear-gradient(135deg, #3a8a3a, #2d6a2d);
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-family: inherit;
  box-shadow: 0 3px 10px rgba(45, 106, 45, 0.3);
  transition: transform 0.15s, box-shadow 0.15s;
  white-space: nowrap;
}

.log-btn:active {
  transform: scale(0.97);
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(10, 30, 10, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: 24px 16px;
  box-sizing: border-box;
}

.modal {
  width: 100%;
  max-width: 480px;
  background: #fff;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  max-height: 90svh;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 20px 0;
  flex-shrink: 0;
}

.modal-title {
  font-size: 20px;
  font-weight: 700;
  color: #1a3d1a;
  margin: 0;
  letter-spacing: -0.3px;
}

.close-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background: #f0f0f0;
  color: #555;
  font-size: 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s;
}

.close-btn:hover {
  background: #e0e0e0;
}

.modal-body {
  overflow-y: auto;
  padding: 18px 20px 8px;
  flex: 1;
}

.modal-footer {
  display: flex;
  gap: 10px;
  padding: 12px 20px 28px;
  flex-shrink: 0;
  border-top: 1px solid #f0f0f0;
}

.cancel-btn {
  flex: 1;
  padding: 14px;
  background: transparent;
  border: 1.5px solid #c8d8c8;
  border-radius: 14px;
  color: #4a6a4a;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  font-family: inherit;
  transition: background 0.15s;
}

.cancel-btn:hover {
  background: #f5f8f5;
}

.submit-btn {
  flex: 2;
  padding: 14px;
  background: linear-gradient(135deg, #3a8a3a, #2d6a2d);
  color: #fff;
  font-size: 15px;
  font-weight: 700;
  border: none;
  border-radius: 14px;
  cursor: pointer;
  letter-spacing: 0.2px;
  box-shadow: 0 4px 14px rgba(45, 106, 45, 0.3);
  font-family: inherit;
  transition: transform 0.15s, box-shadow 0.15s;
}

.submit-btn:active {
  transform: scale(0.98);
}

.field {
  margin-bottom: 16px;
}

.field label {
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: #3d5a3d;
  margin-bottom: 6px;
  letter-spacing: 0.1px;
}

.required { color: #c2410c; }
.optional { font-weight: 400; color: #8a9a8a; font-size: 12px; }

.field input[type="text"],
.field input[type="date"],
.field textarea {
  width: 100%;
  box-sizing: border-box;
  padding: 11px 14px;
  border: 1.5px solid #d4ddd4;
  border-radius: 12px;
  font-size: 15px;
  color: #1a3d1a;
  background: #fafbfa;
  outline: none;
  font-family: inherit;
  transition: border-color 0.15s, box-shadow 0.15s;
  -webkit-appearance: none;
  appearance: none;
}

.field input:focus,
.field textarea:focus {
  border-color: #3a8a3a;
  box-shadow: 0 0 0 3px rgba(58, 138, 58, 0.12);
  background: #fff;
}

.field textarea {
  resize: vertical;
  min-height: 80px;
  line-height: 1.5;
}

.field.error input {
  border-color: #c2410c;
}

.error-msg {
  display: block;
  font-size: 12px;
  color: #c2410c;
  margin-top: 5px;
}

.category-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.cat-chip {
  padding: 7px 14px;
  border-radius: 50px;
  border: 1.5px solid #c8d8c8;
  background: #f5f8f5;
  color: #4a6a4a;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: border-color 0.15s, background 0.15s, color 0.15s;
  font-family: inherit;
}

.cat-chip.active {
  border-color: currentColor;
  font-weight: 700;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
