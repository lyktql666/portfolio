<script setup>
import { nextTick, ref } from 'vue'
import { github, media, projects } from './projects.js'

const modal = ref(null)
const selection = ref(null)
const imageIndex = ref(0)
const videoFailed = ref(false)
let previousFocus

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
  <header class="site-header" id="top">
    <div class="container header-inner">
      <a href="#top" class="brand" aria-label="刘赟楷，返回首页"><span class="mark">L<span>.</span></span><span>刘赟楷</span></a>
      <nav aria-label="页面导航">
        <a href="#projects">项目作品</a>
        <a href="#about">关于我</a>
      </nav>
      <a class="github-top" :href="github" target="_blank" rel="noopener noreferrer">GitHub <span aria-hidden="true">↗</span></a>
    </div>
  </header>

  <main>
    <section class="hero container" aria-labelledby="hero-title">
      <div class="hero-copy">
        <p class="eyebrow"><span></span>个人作品集</p>
        <h1 id="hero-title">刘赟楷<span>.</span></h1>
        <p class="hero-role">全栈开发<span> / </span>三维交互</p>
        <p class="hero-intro">重庆工程学院虚拟现实技术专业本科生。我的项目实践涵盖 Vue 前端、Node.js 接口开发和 Three.js 三维场景。</p>
        <div class="hero-actions">
          <a class="button primary" href="#projects">浏览项目 <span aria-hidden="true">↓</span></a>
          <a class="button quiet" :href="github" target="_blank" rel="noopener noreferrer">GitHub 主页 <span aria-hidden="true">↗</span></a>
        </div>
      </div>
      <a class="hero-visual" href="#solar" aria-label="查看太阳系 3D 模拟器项目">
        <img :src="media('solar-hero.webp')" alt="星空中发光的太阳与行星轨道" width="1400" height="1050" fetchpriority="high">
        <span class="visual-caption"><span><small>SOLAR SYSTEM</small>太阳系 3D 模拟器</span><span class="visual-arrow" aria-hidden="true">↘</span></span>
      </a>
    </section>

    <section id="projects" class="projects-section" aria-labelledby="projects-title">
      <div class="container">
        <div class="section-head">
          <div><p class="section-label">SELECTED PROJECTS</p><h2 id="projects-title">项目作品</h2></div>
          <a class="text-link" :href="github + '?tab=repositories'" target="_blank" rel="noopener noreferrer">全部 GitHub 仓库 <span aria-hidden="true">↗</span></a>
        </div>
        <div class="project-grid">
          <article v-for="project in projects" :key="project.id" :id="project.id" class="project-card">
            <button class="project-cover" :class="project.id" type="button" @click="showMedia(project, 'images')" :aria-label="'查看' + project.title + '的项目截图'">
              <template v-if="project.id === 'mall'">
                <img class="cover-admin" :src="media(project.images[0].file)" alt="" loading="lazy">
                <img class="cover-phone" :src="media(project.images[1].file)" alt="" loading="lazy">
              </template>
              <img v-else :src="media(project.images[0].file)" alt="" loading="lazy">
              <span class="cover-action" aria-hidden="true">⤢</span>
            </button>
            <div class="project-body">
              <p class="category">{{ project.category }}</p>
              <h3>{{ project.title }}</h3>
              <p class="project-description">{{ project.description }}</p>
              <ul class="tags" aria-label="技术栈"><li v-for="tag in project.tags" :key="tag">{{ tag }}</li></ul>
              <div class="project-actions">
                <a class="text-link" :href="github + '/' + project.repo" target="_blank" rel="noopener noreferrer">查看源码 <span aria-hidden="true">↗</span></a>
                <button v-if="project.video" class="video-button" type="button" @click="showMedia(project, 'video')"><span aria-hidden="true">▶</span> 播放演示</button>
                <span v-else class="video-pending"><span aria-hidden="true">▷</span> 演示视频待补充</span>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section id="about" class="about container" aria-labelledby="about-title">
      <div>
        <p class="section-label">ABOUT</p>
        <h2 id="about-title">关于我</h2>
        <p class="about-intro">我正在寻找全栈开发岗位。做项目时，我喜欢先把问题拆成可验证的小步骤，再用页面和接口联调逐一确认。</p>
        <p class="education"><strong>重庆工程学院</strong><span>虚拟现实技术 · 本科</span><span>2023.09 — 2027.07</span></p>
      </div>
      <dl class="skills">
        <div><dt>前端</dt><dd>Vue 3 · Vue Router · Pinia · Element Plus · uni-app</dd></div>
        <div><dt>后端与数据库</dt><dd>Node.js · Express · MySQL · Sequelize</dd></div>
        <div><dt>三维开发</dt><dd>Three.js · Unity · Unreal Engine</dd></div>
      </dl>
    </section>
  </main>

  <footer>
    <div class="container footer-inner">
      <span>刘赟楷</span>
      <a class="text-link" :href="github" target="_blank" rel="noopener noreferrer">@lyktql666 <span aria-hidden="true">↗</span></a>
      <a class="back-top" href="#top">返回顶部 <span aria-hidden="true">↑</span></a>
    </div>
  </footer>

  <dialog ref="modal" aria-labelledby="media-title" @close="onClose" @click.self="modal.close()">
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
