import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

gsap.registerPlugin(ScrollTrigger)

const stackedLayout = '(min-height: 600px) and (prefers-reduced-motion: no-preference), (orientation: portrait) and (prefers-reduced-motion: no-preference)'

export function mountProjectMotion(stages) {
  const media = gsap.matchMedia()

  media.add(stackedLayout, () => {
    const lenis = new Lenis({ autoRaf: true, lerp: 0.1, syncTouch: false })
    lenis.on('scroll', ScrollTrigger.update)

    for (const stage of stages) {
      const anchor = stage.previousElementSibling
      const panel = stage.querySelector('.project-panel')
      const cover = stage.querySelector('.project-cover')
      const coverMedia = cover.querySelector('.project-cover-media')
      const inset = () => parseFloat(getComputedStyle(stage).paddingTop)
      const enter = () => 'top bottom-=' + inset()

      // Measure the normal-flow anchors so the pinned or scaled cards never shift the triggers.
      gsap.fromTo(coverMedia, { scale: 1.2 }, {
        scale: 1,
        scrollTrigger: {
          trigger: anchor,
          start: enter,
          end: () => '+=' + cover.offsetHeight,
          scrub: 1,
        },
      })

      const nextAnchor = stage.nextElementSibling
      if (!nextAnchor) continue

      gsap.fromTo(panel, { scale: 1, filter: 'brightness(1)' }, {
        scale: 0.9,
        filter: 'brightness(0.2)',
        transformOrigin: '50% 0%',
        scrollTrigger: {
          trigger: nextAnchor,
          start: enter,
          end: 'top top',
          scrub: 1.5,
        },
      })
    }

    return () => lenis.destroy()
  })

  return () => media.revert()
}
