<script setup>
import { ref } from 'vue'
import { media } from './projects.js'

const { project } = defineProps({ project: { type: Object, required: true } })
const activeIndex = ref(0)
const track = ref(null)
const dragging = ref(false)
const dragOffset = ref(0)
let swipe = null

function moveSlide(direction) {
  if (dragging.value) return
  const next = activeIndex.value + direction
  if (next >= 0 && next < project.images.length) activeIndex.value = next
}

function startSwipe(event) {
  if (swipe || !event.isPrimary || event.button !== 0) return
  swipe = { id: event.pointerId, x: event.clientX, y: event.clientY, time: event.timeStamp }
}

function updateSwipe(event) {
  if (swipe?.id !== event.pointerId) return
  const dx = event.clientX - swipe.x
  const dy = event.clientY - swipe.y

  if (!dragging.value) {
    if (Math.max(Math.abs(dx), Math.abs(dy)) < 9) return
    if (Math.abs(dy) >= Math.abs(dx)) {
      swipe = null
      return
    }

    const width = track.value.clientWidth
    const transform = new DOMMatrixReadOnly(getComputedStyle(track.value).transform)
    swipe.width = width
    swipe.scale = width / track.value.getBoundingClientRect().width
    swipe.offset = transform.m41 + activeIndex.value * width
    event.currentTarget.setPointerCapture(event.pointerId)
    dragging.value = true
  }

  const offset = swipe.offset + dx * swipe.scale
  const atStart = activeIndex.value === 0 && offset > 0
  const atEnd = activeIndex.value === project.images.length - 1 && offset < 0
  dragOffset.value = Math.max(-swipe.width, Math.min(swipe.width, atStart || atEnd ? offset / 3 : offset))
}

function consumeTouchSwipe(event) {
  if (dragging.value && event.touches.length === 1 && event.cancelable) event.preventDefault()
}

function endSwipe(event, cancelled = false) {
  if (swipe?.id !== event.pointerId) return
  let direction = 0
  if (dragging.value && !cancelled) {
    const distance = event.clientX - swipe.x
    const time = event.timeStamp - swipe.time
    const threshold = Math.min(94, swipe.width / swipe.scale * 0.17)
    const flicked = time < 260 && Math.abs(distance) >= 26
    if (flicked || Math.abs(distance) >= threshold) direction = distance < 0 ? 1 : -1
  }

  swipe = null
  dragging.value = false
  dragOffset.value = 0
  if (direction) moveSlide(direction)
}
</script>

<template>
  <div
    class="project-cover"
    :class="project.id"
    role="group"
    aria-roledescription="截图轮播"
    :aria-label="project.title"
    @keydown.left.prevent="moveSlide(-1)"
    @keydown.right.prevent="moveSlide(1)"
  >
    <div
      class="carousel-viewport"
      :class="{ dragging }"
      @pointerdown="startSwipe"
      @pointermove="updateSwipe"
      @touchmove="consumeTouchSwipe"
      @pointerup="endSwipe"
      @pointercancel="endSwipe($event, true)"
      @lostpointercapture="endSwipe($event, true)"
      @pointerleave="!dragging && endSwipe($event, true)"
    >
      <div class="project-cover-media">
        <div ref="track" class="carousel-track" :style="{ transform: `translate3d(calc(${-activeIndex * 100}% + ${dragOffset}px), 0, 0)` }">
          <div v-for="(shot, index) in project.images" :key="shot.file" class="carousel-slide" :aria-hidden="index !== activeIndex">
            <template v-if="project.id === 'mall' && index === 0">
              <img class="cover-admin" :src="media(shot.file)" :alt="shot.label" loading="lazy">
              <img class="cover-phone" :src="media(project.images[1].file)" alt="" loading="lazy">
            </template>
            <img v-else class="carousel-image" :src="media(shot.file)" :alt="shot.label" loading="lazy">
          </div>
        </div>
      </div>
    </div>

    <template v-if="project.images.length > 1">
      <button class="carousel-arrow previous" type="button" aria-label="上一张截图" :aria-disabled="activeIndex === 0" @click="moveSlide(-1)">
        <span aria-hidden="true"></span>
      </button>
      <button class="carousel-arrow next" type="button" aria-label="下一张截图" :aria-disabled="activeIndex === project.images.length - 1" @click="moveSlide(1)">
        <span aria-hidden="true"></span>
      </button>
      <span class="carousel-count" role="status" :aria-label="`第 ${activeIndex + 1} 张截图，共 ${project.images.length} 张`">{{ activeIndex + 1 }}/{{ project.images.length }}</span>
    </template>
  </div>
</template>
