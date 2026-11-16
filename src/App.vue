<script setup>
import { nextTick, onMounted, onUnmounted, ref } from 'vue'
import { github, media, projects } from './projects.js'
import { mountProjectMotion } from './projectMotion.js'

const modal = ref(null)
const selection = ref(null)
const imageIndex = ref(0)
const videoFailed = ref(false)
const marqueePaused = ref(false)
const page = ref(null)
const stack = ['Vue 3', 'JavaScript', 'Three.js', 'Node.js', 'uni-app', 'Express', 'MySQL', 'Unity', 'Unreal Engine']
let previousFocus
let revealObserver
let stageObserver
let disposeProjectMotion

onMounted(() => {
  const stages = page.value.querySelectorAll('.project-stage')
  if ('ResizeObserver' in window) {
    stageObserver = new ResizeObserver((entries) => {
      for (const { target } of entries) {
        target.style.setProperty('--stage-height', `${target.offsetHeight}px`)
      }
    })
    for (const stage of stages) {
      stageObserver.observe(stage, { box: 'border-box' })
    }
  }

  disposeProjectMotion = mountProjectMotion(stages)

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return

  revealObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue
      entry.target.classList.remove('awaiting-reveal')
      revealObserver.unobserve(entry.target)
    }
  }, { threshold: 0.1 })

  for (const element of page.value.querySelectorAll('[data-reveal]')) {
    if (element.getBoundingClientRect().top < window.innerHeight) continue
    element.classList.add('awaiting-reveal')
    revealObserver.observe(element)
  }
})

onUnmounted(() => {
  revealObserver?.disconnect()
  stageObserver?.disconnect()
  disposeProjectMotion?.()
})

function revealFocusedProject(event, projectId) {
  const control = event.target
  if (!control.matches(':focus-visible')) return

  const { x, y, width, height } = control.getBoundingClientRect()
  const foreground = document.elementFromPoint(x + width / 2, y + height / 2)
  if (foreground && !event.currentTarget.contains(foreground)) {
    document.getElementById(projectId).scrollIntoView({ behavior: 'instant' })
  }
}

async function showMedia(project, kind) {
  previousFocus = document.activeElement
  selection.value = { project, kind }
  imageIndex.value = 0
  videoFailed.value = false
  await nextTick()
  modal.value.showModal()
}

function onClose() {
  selection.value = null
  previousFocus?.focus()
}
</script>

<template>
  <a class="skip" href="#projects">跳转到作品</a>
  <main ref="page">
    <section id="top" class="hero" aria-labelledby="hero-title">
      <div class="hero-copy">
        <p class="availability hero-enter"><span aria-hidden="true"></span>正在寻找全栈开发岗位</p>
        <div class="hero-introduction">
          <h1 id="hero-title" class="hero-enter">刘赟楷<span class="hero-period">.</span>
            <span class="hero-role">全栈开发与三维交互</span>
          </h1>
          <p class="hero-intro hero-enter">重庆工程学院虚拟现实技术专业本科生。我的项目实践涵盖 Vue 前端、Node.js 接口开发和 Three.js 三维场景。</p>
          <a class="button primary hero-enter" href="#projects">浏览项目 <span aria-hidden="true">↓</span></a>
        </div>
        <a class="hero-github text-link hero-enter" :href="github" target="_blank" rel="noopener noreferrer">GitHub 主页 <span aria-hidden="true">↗</span></a>
      </div>
      <div class="hero-visual">
        <div class="hero-art"><img :src="media('solar-hero.webp')" alt="太阳系 3D 模拟器中的太阳与行星轨道" width="1400" height="979" fetchpriority="high"></div>
      </div>
    </section>

    <section id="projects" class="projects-section" aria-label="项目作品">
      <template v-for="project in projects" :key="project.id">
        <div :id="project.id" class="project-anchor" aria-hidden="true"></div>
        <article class="project-stage" :aria-labelledby="project.id + '-title'" @focusin="revealFocusedProject($event, project.id)">
          <div class="project-panel">
            <div class="project-body">
              <p class="category">{{ project.category }}</p>
              <div class="project-copy">
                <h2 :id="project.id + '-title'">{{ project.title }}</h2>
                <p class="project-description">{{ project.description }}</p>
                <ul class="tags" aria-label="技术栈"><li v-for="tag in project.tags" :key="tag">{{ tag }}</li></ul>
                <div class="project-actions">
                  <a class="button primary" :href="github + '/' + project.repo" target="_blank" rel="noopener noreferrer">查看源码 <span aria-hidden="true">↗</span></a>
                  <button v-if="project.video" class="button quiet" type="button" @click="showMedia(project, 'video')"><span aria-hidden="true">▶</span> 播放演示</button>
                  <span v-else class="video-pending"><span aria-hidden="true">▷</span> 演示视频待补充</span>
                </div>
              </div>
            </div>
            <button class="project-cover" :class="project.id" type="button" @click="showMedia(project, 'images')" :aria-label="'查看' + project.title + '的项目截图'">
              <span class="project-cover-media">
                <template v-if="project.id === 'mall'">
                  <img class="cover-admin" :src="media(project.images[0].file)" alt="" loading="lazy">
                  <img class="cover-phone" :src="media(project.images[1].file)" alt="" loading="lazy">
                </template>
                <img v-else :src="media(project.images[0].file)" alt="" loading="lazy">
              </span>
              <span class="cover-action" aria-hidden="true">⤢</span>
            </button>
          </div>
        </article>
      </template>
    </section>

    <section id="about" class="about container" aria-labelledby="about-title">
      <div class="section-head" data-reveal><h2 id="about-title">关于我</h2></div>
      <div class="about-grid">
        <div class="about-bio" data-reveal>
          <p class="about-intro">做项目时，我习惯先把问题拆成可验证的小步骤，再用页面和接口联调逐一确认。</p>
          <p class="education"><strong>重庆工程学院</strong><span>虚拟现实技术 · 本科</span><span>2023.09 — 2027.07</span></p>
        </div>
        <dl class="skills" data-reveal>
          <div><dt>前端</dt><dd>Vue 3 · Vue Router · Pinia · Element Plus · uni-app</dd></div>
          <div><dt>后端与数据库</dt><dd>Node.js · Express · MySQL · Sequelize</dd></div>
          <div><dt>三维开发</dt><dd>Three.js · Unity · Unreal Engine</dd></div>
        </dl>
      </div>
      <section class="stack" aria-labelledby="stack-title">
        <h3 id="stack-title">技术栈</h3>
        <div class="marquee" :class="{ paused: marqueePaused }">
          <div class="marquee-track">
            <ul v-for="copy in 2" :key="copy" class="marquee-list" :aria-hidden="copy === 2 ? 'true' : undefined">
              <li v-for="tool in stack" :key="tool">{{ tool }}</li>
            </ul>
          </div>
        </div>
        <button class="marquee-toggle" type="button" :aria-label="marqueePaused ? '继续滚动技术栈' : '暂停滚动技术栈'" @click="marqueePaused = !marqueePaused">
          <span aria-hidden="true">{{ marqueePaused ? '▷' : 'Ⅱ' }}</span>
        </button>
      </section>
    </section>
  </main>

  <footer>
    <div class="container footer-inner">
      <span>刘赟楷</span>
      <a class="text-link" :href="github" target="_blank" rel="noopener noreferrer">@lyktql666 <span aria-hidden="true">↗</span></a>
      <a class="back-top" href="#top">返回顶部 <span aria-hidden="true">↑</span></a>
    </div>
  </footer>

  <dialog ref="modal" data-lenis-prevent aria-labelledby="media-title" @close="onClose" @click.self="modal.close()">
    <div v-if="selection" class="dialog-content">
      <div class="dialog-head">
        <h2 id="media-title">{{ selection.project.title }}<span> / {{ selection.kind === 'video' ? '项目演示' : '项目截图' }}</span></h2>
        <button class="close" type="button" aria-label="关闭" autofocus @click="modal.close()">×</button>
      </div>
      <template v-if="selection.kind === 'video'">
        <video :src="media(selection.project.video)" :poster="media(selection.project.images[0].file)" controls playsinline preload="metadata" @error="videoFailed = true"></video>
        <p v-if="videoFailed" class="video-error">视频暂时无法在播放器中加载。<a :href="media(selection.project.video)" target="_blank" rel="noopener noreferrer">打开视频文件</a></p>
      </template>
      <template v-else>
        <figure>
          <img :src="media(selection.project.images[imageIndex].file)" :alt="selection.project.images[imageIndex].label">
          <figcaption>{{ selection.project.images[imageIndex].label }}</figcaption>
        </figure>
        <div v-if="selection.project.images.length > 1" class="image-options" aria-label="选择截图">
          <button v-for="(shot, index) in selection.project.images" :key="shot.file" type="button" :aria-pressed="index === imageIndex" @click="imageIndex = index">{{ shot.label }}</button>
        </div>
      </template>
    </div>
  </dialog>
</template>
