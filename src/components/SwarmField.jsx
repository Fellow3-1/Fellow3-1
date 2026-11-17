import { useEffect, useRef } from 'react'
import { getTheme } from '../theme.js'

/* Scroll-coupled Reynolds boids + topology mesh for Section 03 (Infrastructure).
   All physics run in contiguous Float32Arrays outside React state; the loop
   sleeps completely whenever the section leaves the viewport or the tab hides,
   and renders a single static constellation when reduced motion is active. */

const PALETTES = {
  light: {
    grid: 'rgba(17, 19, 24, 0.065)',
    clusters: [
      { hex: '#e02f75', rgb: '224, 47, 117' }, // 01 sys · rose
      { hex: '#0e7a48', rgb: '14, 122, 72' },  // 02 net · emerald
      { hex: '#7b3f97', rgb: '123, 63, 151' }, // 03 cloud · iris
      { hex: '#b63d8e', rgb: '182, 61, 142' }, // 04 data · magenta-iris
    ],
    edgeRgb: '123, 63, 151',
    edgeAlpha: [0.07, 0.14, 0.24],
    trunkRgb: '95, 96, 104',
    trunkAlpha: 0.18,
    labelMuted: 'rgba(95, 96, 104, 0.82)',
    labelActive: '#111318',
    ringAlpha: 0.22,
  },
  dark: {
    grid: 'rgba(243, 237, 242, 0.06)',
    clusters: [
      { hex: '#ff5796', rgb: '255, 87, 150' }, // 01 sys · neon pink
      { hex: '#3bdb84', rgb: '59, 219, 132' }, // 02 net · phosphor green
      { hex: '#b27ee8', rgb: '178, 126, 232' }, // 03 cloud · iris
      { hex: '#ff85b8', rgb: '255, 133, 184' }, // 04 data · soft neon rose
    ],
    edgeRgb: '178, 126, 232',
    edgeAlpha: [0.09, 0.18, 0.32],
    trunkRgb: '167, 149, 166',
    trunkAlpha: 0.22,
    labelMuted: 'rgba(167, 149, 166, 0.82)',
    labelActive: '#f3edf2',
    ringAlpha: 0.3,
  },
}

const clamp = (v, lo, hi) => (v < lo ? lo : v > hi ? hi : v)
const smoothstep = (e0, e1, x) => {
  const t = clamp((x - e0) / (e1 - e0), 0, 1)
  return t * t * (3 - 2 * t)
}

function phaseName(p, focus) {
  if (focus >= 0) return 'routing'
  if (p < 0.24) return 'scatter'
  if (p < 0.54) return 'flocking'
  if (p < 0.84) return 'mesh'
  return 'stream'
}

/* Deterministic PRNG so the initial field and reduced-motion snapshot stay tidy */
function mulberry32(seed) {
  let a = seed >>> 0
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export default function SwarmField({ sectionRef, groups, activeIndex, pinnedIndex, onHover, onSelect }) {
  const canvasRef = useRef(null)
  const phaseRef = useRef(null)
  const meterRef = useRef(null)
  const activeRef = useRef(activeIndex)

  useEffect(() => {
    activeRef.current = activeIndex
  }, [activeIndex])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined
    if (typeof navigator !== 'undefined' && /jsdom/i.test(navigator.userAgent || '')) {
      return undefined
    }

    let ctx = null
    try {
      ctx = canvas.getContext('2d', { alpha: true })
    } catch {
      return undefined
    }
    if (!ctx) return undefined

    let width = 0
    let height = 0
    let dpr = 1
    let count = 0

    /* typed-array swarm buffers */
    let px = new Float32Array(0)
    let py = new Float32Array(0)
    let vx = new Float32Array(0)
    let vy = new Float32Array(0)
    let homeX = new Float32Array(0)
    let homeY = new Float32Array(0)
    let phase = new Float32Array(0)
    let radius = new Float32Array(0)
    let cluster = new Uint8Array(0)

    /* 4 cluster hubs positioned across the viewport */
    const hubs = [
      { x: 0, y: 0, code: groups[0]?.code || 'sys' },
      { x: 0, y: 0, code: groups[1]?.code || 'net' },
      { x: 0, y: 0, code: groups[2]?.code || 'cloud' },
      { x: 0, y: 0, code: groups[3]?.code || 'data' },
    ]

    let theme = getTheme()
    let targetP = 0.5
    let smoothP = 0.2
    let scrollVel = 0
    let lastScrollY = window.scrollY
    let inView = true
    let hidden = document.hidden
    let rafId = 0
    let lastPhaseLabel = ''
    let clock = 0

    const pointer = { x: 0, y: 0, active: false }

    const isReduced = () =>
      document.documentElement.classList.contains('reduce') ||
      Boolean(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches)

    const computeHubs = () => {
      const compact = width < 580
      if (compact) {
        /* 2x2 constellation on narrow phones with generous bottom margin for labels */
        hubs[0].x = width * 0.27
        hubs[0].y = height * 0.30
        hubs[1].x = width * 0.73
        hubs[1].y = height * 0.28
        hubs[2].x = width * 0.29
        hubs[2].y = height * 0.64
        hubs[3].x = width * 0.73
        hubs[3].y = height * 0.62
      } else {
        /* staggered 4-node backbone across the wide plot */
        hubs[0].x = width * 0.15
        hubs[0].y = height * 0.54
        hubs[1].x = width * 0.385
        hubs[1].y = height * 0.38
        hubs[2].x = width * 0.625
        hubs[2].y = height * 0.55
        hubs[3].x = width * 0.855
        hubs[3].y = height * 0.40
      }
    }

    const seedSwarm = (nextCount) => {
      const rand = mulberry32(31042026)
      count = nextCount
      px = new Float32Array(count)
      py = new Float32Array(count)
      vx = new Float32Array(count)
      vy = new Float32Array(count)
      homeX = new Float32Array(count)
      homeY = new Float32Array(count)
      phase = new Float32Array(count)
      radius = new Float32Array(count)
      cluster = new Uint8Array(count)

      for (let i = 0; i < count; i += 1) {
        const c = i & 3
        cluster[i] = c
        const hx = (0.04 + rand() * 0.92) * width
        const hy = (0.08 + rand() * 0.84) * height
        homeX[i] = hx
        homeY[i] = hy
        px[i] = hx
        py[i] = hy
        const ang = rand() * Math.PI * 2
        const spd = 0.45 + rand() * 0.85
        vx[i] = Math.cos(ang) * spd
        vy[i] = Math.sin(ang) * spd
        phase[i] = rand() * Math.PI * 2
        radius[i] = i % 9 === 0 ? 3.1 : 1.7 + rand() * 1.05
      }
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const nextW = Math.max(1, Math.round(rect.width))
      const nextH = Math.max(1, Math.round(rect.height))
      const nextDpr = Math.min(window.devicePixelRatio || 1, 2)
      /* A resize tick with no real change must not touch the backing store:
         assigning canvas.width clears the bitmap, which reads as the whole
         field blinking out. Bail out when nothing actually moved. */
      if (nextW === width && nextH === height && nextDpr === dpr && count > 0) return
      const prevW = width
      const prevH = height

      width = nextW
      height = nextH
      dpr = nextDpr
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      computeHubs()

      const desired = width < 560 ? 52 : width < 900 ? 72 : 92
      if (count !== desired || prevW === 0 || prevH === 0) {
        seedSwarm(desired)
      } else {
        const sx = width / prevW
        const sy = height / prevH
        for (let i = 0; i < count; i += 1) {
          px[i] *= sx
          py[i] *= sy
          homeX[i] *= sx
          homeY[i] *= sy
        }
      }

      /* Resetting the backing store clears the bitmap. When the loop is
         asleep (section off-screen, tab hidden) nothing would repaint it
         until the next scroll, leaving a blank field — so paint one frame
         right away instead of waiting for the next tick. */
      if (isReduced()) drawStatic()
      else step(1 / 60)
    }

    const measureScroll = () => {
      const rect = canvas.getBoundingClientRect()
      const vh = window.innerHeight || 800
      /* measured against the viewport plot itself so every scroll phase —
         scatter (0), flocking (0.3), mesh (0.65) and exit stream (0.9) —
         plays out visibly on both wide desktops and tall phone layouts */
      const start = vh * 0.92
      const end = -Math.max(40, rect.height * 0.24)
      targetP = clamp((start - rect.top) / Math.max(1, start - end), 0, 1)

      const nowY = window.scrollY
      const dy = nowY - lastScrollY
      lastScrollY = nowY
      /* signed velocity impulse, clamped so fast wheel flicks stay graceful */
      scrollVel = clamp(scrollVel + dy * 0.09, -15, 15)
    }

    const drawGrid = (pal) => {
      const step = width < 560 ? 26 : 30
      ctx.fillStyle = pal.grid
      for (let y = 16; y < height - 10; y += step) {
        for (let x = 18; x < width - 10; x += step) {
          ctx.fillRect(x, y, 1.25, 1.25)
        }
      }
    }

    const drawBackbone = (pal, meshStrength, focus, t) => {
      if (meshStrength < 0.04) return

      /* trunk curves linking the 4 domain hubs + packet motes riding them */
      const pairs = width < 580
        ? [[0, 1], [0, 2], [1, 3], [2, 3], [1, 2]]
        : [[0, 1], [1, 2], [2, 3], [0, 2], [1, 3]]

      ctx.save()
      ctx.lineWidth = 1
      ctx.setLineDash([3, 5])
      for (let k = 0; k < pairs.length; k += 1) {
        const [a, b] = pairs[k]
        const ha = hubs[a]
        const hb = hubs[b]
        const mx = (ha.x + hb.x) * 0.5
        const lift = (k % 2 === 0 ? -1 : 1) * (k >= 3 ? 28 : 16)
        const my = (ha.y + hb.y) * 0.5 + lift
        const highlighted = focus === a || focus === b
        const alpha = pal.trunkAlpha * meshStrength * (highlighted ? 1.55 : focus >= 0 ? 0.45 : 1)
        const rgb = highlighted ? pal.clusters[focus].rgb : pal.trunkRgb

        ctx.strokeStyle = `rgba(${rgb}, ${alpha.toFixed(3)})`
        ctx.beginPath()
        ctx.moveTo(ha.x, ha.y)
        ctx.quadraticCurveTo(mx, my, hb.x, hb.y)
        ctx.stroke()

        /* travelling packet pulse along each active link */
        if (t !== null && (k < 3 || highlighted)) {
          const raw = (t * (0.28 + k * 0.05) + k * 0.31) % 1
          const u = focus === b ? raw : focus === a ? 1 - raw : raw
          const inv = 1 - u
          const qx = inv * inv * ha.x + 2 * inv * u * mx + u * u * hb.x
          const qy = inv * inv * ha.y + 2 * inv * u * my + u * u * hb.y
          const pCol = pal.clusters[highlighted ? focus : b]
          ctx.fillStyle = `rgba(${pCol.rgb}, ${(0.72 * meshStrength).toFixed(3)})`
          ctx.beginPath()
          ctx.arc(qx, qy, highlighted ? 2.6 : 2, 0, Math.PI * 2)
          ctx.fill()
        }
      }
      ctx.setLineDash([])

      /* hub anchor rings + monospace-spaced codes */
      const ringBase = width < 580 ? 22 : 30
      ctx.font = '600 10.5px Inter, ui-sans-serif, system-ui, sans-serif'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'

      for (let h = 0; h < 4; h += 1) {
        const hub = hubs[h]
        const col = pal.clusters[h]
        const isFocus = focus === h
        const dim = focus >= 0 && !isFocus ? 0.38 : 1
        const pulse = t !== null ? Math.sin(t * 2.1 + h * 1.4) * 2.4 : 0
        const r = ringBase * (0.72 + 0.28 * meshStrength) + (isFocus ? 7 : 0) + pulse * meshStrength

        ctx.strokeStyle = `rgba(${col.rgb}, ${(pal.ringAlpha * meshStrength * dim * (isFocus ? 1.85 : 1)).toFixed(3)})`
        ctx.lineWidth = isFocus ? 1.5 : 1
        ctx.beginPath()
        ctx.arc(hub.x, hub.y, r, 0, Math.PI * 2)
        ctx.stroke()

        /* inner core beacon */
        ctx.fillStyle = `rgba(${col.rgb}, ${(0.85 * meshStrength * dim).toFixed(3)})`
        ctx.beginPath()
        ctx.arc(hub.x, hub.y, isFocus ? 4 : 3, 0, Math.PI * 2)
        ctx.fill()

        /* subtle code stamp under the ring */
        if (meshStrength > 0.35) {
          const labelAlpha = smoothstep(0.35, 0.7, meshStrength) * dim
          ctx.globalAlpha = labelAlpha
          ctx.fillStyle = isFocus ? pal.labelActive : pal.labelMuted
          ctx.fillText(hub.code.toUpperCase(), hub.x, hub.y + r + 12)
          ctx.globalAlpha = 1
        }
      }
      ctx.restore()
    }

    const drawAgentsAndEdges = (pal, flockStrength, velBoost, focus) => {
      const linkDist = width < 560 ? 52 : 64
      const linkDistSq = linkDist * linkDist
      const edgeScale = 0.35 + 0.65 * flockStrength

      /* batch proximity links into 3 opacity buckets -> 3 stroke calls total */
      const b0 = new Path2D()
      const b1 = new Path2D()
      const b2 = new Path2D()
      let c0 = 0
      let c1 = 0
      let c2 = 0

      for (let i = 0; i < count; i += 1) {
        const xi = px[i]
        const yi = py[i]
        const ci = cluster[i]
        let links = 0
        for (let j = i + 1; j < count; j += 1) {
          const dx = px[j] - xi
          const dy = py[j] - yi
          const d2 = dx * dx + dy * dy
          if (d2 >= linkDistSq || d2 < 16) continue
          /* cap links per node so clusters read as crisp geometry, not hairballs */
          links += 1
          if (links > 4) break

          const ratio = 1 - Math.sqrt(d2) / linkDist
          const sameFocus = focus >= 0 && (ci === focus || cluster[j] === focus)
          const tier = sameFocus ? ratio + 0.25 : focus >= 0 ? ratio * 0.55 : ratio
          if (tier > 0.62) {
            b2.moveTo(xi, yi)
            b2.lineTo(px[j], py[j])
            c2 += 1
          } else if (tier > 0.32) {
            b1.moveTo(xi, yi)
            b1.lineTo(px[j], py[j])
            c1 += 1
          } else {
            b0.moveTo(xi, yi)
            b0.lineTo(px[j], py[j])
            c0 += 1
          }
        }
      }

      const activeRgb = focus >= 0 ? pal.clusters[focus].rgb : pal.edgeRgb
      ctx.lineWidth = 0.9
      if (c0) {
        ctx.strokeStyle = `rgba(${pal.edgeRgb}, ${(pal.edgeAlpha[0] * edgeScale).toFixed(3)})`
        ctx.stroke(b0)
      }
      if (c1) {
        ctx.strokeStyle = `rgba(${activeRgb}, ${(pal.edgeAlpha[1] * edgeScale).toFixed(3)})`
        ctx.stroke(b1)
      }
      if (c2) {
        ctx.strokeStyle = `rgba(${activeRgb}, ${(pal.edgeAlpha[2] * edgeScale).toFixed(3)})`
        ctx.stroke(b2)
      }

      /* directional boid glyphs: oriented micro-darts with velocity wakes */
      for (let i = 0; i < count; i += 1) {
        const x = px[i]
        const y = py[i]
        const u = vx[i]
        const v = vy[i]
        const spd = Math.hypot(u, v) || 1
        const nx = u / spd
        const ny = v / spd
        const c = cluster[i]
        const col = pal.clusters[c]
        const isFocus = focus === c
        const alpha = focus >= 0 ? (isFocus ? 0.96 : 0.34) : 0.86
        const r = radius[i] * (isFocus ? 1.15 : 1)

        /* kinetic tail stretches as the visitor scrolls rapidly */
        const tail = Math.min(18, spd * (2.6 + velBoost * 2.2))
        if (tail > 3.2) {
          ctx.strokeStyle = `rgba(${col.rgb}, ${(alpha * 0.32).toFixed(3)})`
          ctx.lineWidth = Math.max(1, r * 0.55)
          ctx.beginPath()
          ctx.moveTo(x, y)
          ctx.lineTo(x - nx * tail, y - ny * tail)
          ctx.stroke()
        }

        /* crisp oriented boid chevron/dart */
        const tipX = x + nx * (r * 1.95)
        const tipY = y + ny * (r * 1.95)
        const backX = x - nx * (r * 1.15)
        const backY = y - ny * (r * 1.15)
        const wing = r * 1.05
        const wx = -ny * wing
        const wy = nx * wing

        ctx.fillStyle = `rgba(${col.rgb}, ${alpha.toFixed(3)})`
        ctx.beginPath()
        ctx.moveTo(tipX, tipY)
        ctx.lineTo(backX + wx, backY + wy)
        ctx.lineTo(x - nx * (r * 0.45), y - ny * (r * 0.45))
        ctx.lineTo(backX - wx, backY - wy)
        ctx.closePath()
        ctx.fill()
      }
    }

    const drawStatic = () => {
      if (!width || !height) return
      const pal = PALETTES[theme] || PALETTES.light
      const focus = activeRef.current
      /* arrange agents in a calm deterministic constellation around the 4 hubs */
      const orbitBase = width < 580 ? 28 : 38
      for (let i = 0; i < count; i += 1) {
        const c = cluster[i]
        const target = focus >= 0 && i % 3 === 0 ? hubs[focus] : hubs[c]
        const ang = phase[i] + i * 0.42
        const dist = orbitBase * (0.45 + ((i * 17) % 10) / 10)
        px[i] = clamp(target.x + Math.cos(ang) * dist * 1.25, 14, width - 14)
        py[i] = clamp(target.y + Math.sin(ang) * dist * 0.95, 14, height - 14)
        vx[i] = -Math.sin(ang) * 0.8
        vy[i] = Math.cos(ang) * 0.8
      }
      ctx.clearRect(0, 0, width, height)
      drawGrid(pal)
      drawBackbone(pal, 0.9, focus, null)
      drawAgentsAndEdges(pal, 0.85, 0, focus)
      if (phaseRef.current) phaseRef.current.textContent = focus >= 0 ? 'routing' : 'mesh'
      if (meterRef.current) meterRef.current.style.transform = 'scaleX(1)'
    }

    const step = (dt) => {
      clock += dt
      smoothP += (targetP - smoothP) * Math.min(1, dt * 6.5)
      scrollVel *= Math.pow(0.06, dt)

      const focus = activeRef.current
      const p = smoothP
      const absVel = Math.abs(scrollVel)
      const velBoost = clamp(absVel / 7, 0, 1.5)

      /* regime weights blended continuously across scroll progress */
      const scatterW = 1 - smoothstep(0.08, 0.34, p)
      const flockW = smoothstep(0.1, 0.36, p) * (1 - smoothstep(0.78, 0.96, p) * 0.45)
      const rawMesh = smoothstep(0.36, 0.62, p) * (1 - smoothstep(0.8, 0.97, p))
      const meshW = focus >= 0 ? Math.max(rawMesh, 0.88) : rawMesh
      const streamW = focus >= 0 ? 0 : smoothstep(0.8, 0.98, p)

      const sepRadiusSq = 24 * 24
      const neighRadiusSq = (width < 560 ? 58 : 72) ** 2
      const orbitDist = width < 580 ? 28 : 38

      /* murmuration ribbon attractor moves across the canvas during mid-scroll */
      const ribbonX = width * (0.5 + 0.3 * Math.sin(clock * 0.75 + p * 4.2))
      const ribbonY = height * (0.5 + 0.24 * Math.cos(clock * 1.05 - p * 3.4))

      for (let i = 0; i < count; i += 1) {
        const xi = px[i]
        const yi = py[i]
        let u = vx[i]
        let v = vy[i]

        /* 1 · Reynolds separation, alignment and local cohesion */
        let sepX = 0
        let sepY = 0
        let aliX = 0
        let aliY = 0
        let cohX = 0
        let cohY = 0
        let nCount = 0

        for (let j = 0; j < count; j += 1) {
          if (i === j) continue
          const dx = px[j] - xi
          const dy = py[j] - yi
          const d2 = dx * dx + dy * dy
          if (d2 >= neighRadiusSq || d2 < 0.01) continue
          if (d2 < sepRadiusSq) {
            const inv = 1 / Math.sqrt(d2)
            sepX -= dx * inv
            sepY -= dy * inv
          }
          if (cluster[j] === cluster[i] || meshW < 0.45) {
            aliX += vx[j]
            aliY += vy[j]
            cohX += px[j]
            cohY += py[j]
            nCount += 1
          }
        }

        let ax = sepX * (0.095 + 0.04 * flockW)
        let ay = sepY * (0.095 + 0.04 * flockW)

        if (nCount > 0) {
          const inv = 1 / nCount
          const aliGain = (0.042 + velBoost * 0.045) * (0.4 + 0.6 * flockW)
          const cohGain = 0.0024 * flockW * (1 - meshW * 0.45)
          ax += (aliX * inv - u) * aliGain + (cohX * inv - xi) * cohGain
          ay += (aliY * inv - v) * aliGain + (cohY * inv - yi) * cohGain
        }

        /* 2 · scatter regime: gentle drift around dispersed home coordinates */
        if (scatterW > 0.01) {
          const driftX = homeX[i] + Math.cos(clock * 0.7 + phase[i]) * 22
          const driftY = homeY[i] + Math.sin(clock * 0.6 + phase[i]) * 18
          ax += (driftX - xi) * 0.0038 * scatterW
          ay += (driftY - yi) * 0.0038 * scatterW
        }

        /* 3 · flocking regime: scroll-scrubbed curl flow + murmuration ribbon */
        if (flockW > 0.05 && meshW < 0.82) {
          const blend = flockW * (1 - meshW * 0.85)
          const fieldAng =
            Math.sin(xi * 0.011 + p * 6.4 + clock * 0.55) * 1.6 +
            Math.cos(yi * 0.015 - p * 5.2 + clock * 0.45) * 1.4
          ax += Math.cos(fieldAng) * 0.055 * blend + (ribbonX - xi) * 0.0013 * blend
          ay += Math.sin(fieldAng) * 0.055 * blend + (ribbonY - yi) * 0.0013 * blend
        }

        /* 4 · mesh / routing regime: self-organise around the 4 capability hubs */
        if (meshW > 0.01) {
          const c = cluster[i]
          /* when a domain is focused, half of every neighbouring flock routes in to reinforce it */
          const rally = focus >= 0 && (c === focus || i % 2 === 0)
          const hub = rally ? hubs[focus] : hubs[c]
          const dx = hub.x - xi
          const dy = hub.y - yi
          const dist = Math.hypot(dx, dy) || 1
          const targetR = rally && c !== focus ? orbitDist * 1.38 : orbitDist
          const radial = (dist - targetR) * 0.0068 * meshW
          ax += (dx / dist) * radial
          ay += (dy / dist) * radial
          /* tangential swirl keeps every cluster alive and breathing */
          const spin = (c % 2 === 0 ? 1 : -1) * (rally ? 0.095 : 0.065) * meshW
          ax += (-dy / dist) * spin
          ay += (dx / dist) * spin
        }

        /* 5 · exit stream: calm rightward/upward laminar wake past the section */
        if (streamW > 0.01) {
          const waveY = Math.sin(xi * 0.014 + clock * 1.4 + phase[i] * 0.4) * 0.65
          ax += (2.1 - u) * 0.045 * streamW
          ay += (waveY - 0.35 - v) * 0.045 * streamW
        }

        /* 6 · scroll-velocity murmuration wave: scrolling drives real flock momentum */
        if (absVel > 0.08) {
          const wave = Math.sin(xi * 0.016 + phase[i] * 0.5 + clock * 2.4)
          ax += scrollVel * 0.032 + wave * absVel * 0.024
          ay += -scrollVel * 0.022 * Math.cos(yi * 0.02 + phase[i])
        }

        /* 7 · pointer vortex: soft tangential orbit + gentle magnetic draw */
        if (pointer.active) {
          const dx = pointer.x - xi
          const dy = pointer.y - yi
          const d2 = dx * dx + dy * dy
          if (d2 < 145 * 145 && d2 > 9) {
            const dist = Math.sqrt(d2)
            const falloff = 1 - dist / 145
            const pull = dist > 42 ? 0.09 : -0.14
            ax += (dx / dist) * pull * falloff + (-dy / dist) * 0.16 * falloff
            ay += (dy / dist) * pull * falloff + (dx / dist) * 0.16 * falloff
          }
        }

        /* soft wall containment so the flock curves smoothly back inside the plot */
        const pad = 22
        if (xi < pad && streamW < 0.5) ax += (pad - xi) * 0.022
        else if (xi > width - pad && streamW < 0.5) ax -= (xi - (width - pad)) * 0.022
        if (yi < pad) ay += (pad - yi) * 0.022
        else if (yi > height - pad) ay -= (yi - (height - pad)) * 0.022

        const scale = dt * 60
        u += ax * scale
        v += ay * scale

        /* speed floor + ceiling keep motion fluid without jitter or stalling */
        const spd = Math.hypot(u, v) || 0.001
        const maxSpd = 2.25 + velBoost * 1.75 + (pointer.active ? 0.45 : 0)
        const minSpd = 0.42
        if (spd > maxSpd) {
          u = (u / spd) * maxSpd
          v = (v / spd) * maxSpd
        } else if (spd < minSpd) {
          u = (u / spd) * minSpd
          v = (v / spd) * minSpd
        }

        let nx = xi + u * scale
        let ny = yi + v * scale
        /* wrap horizontally in the exit stream so laminar flow stays seamless */
        if (streamW > 0.5) {
          px[i] = nx > width + 8 ? -6 : nx < -10 ? width + 4 : nx
        } else {
          px[i] = clamp(nx, 4, width - 4)
        }
        py[i] = clamp(ny, 6, height - 6)
        vx[i] = u
        vy[i] = v
      }

      const pal = PALETTES[theme] || PALETTES.light
      ctx.clearRect(0, 0, width, height)
      drawGrid(pal)
      drawBackbone(pal, meshW, focus, clock)
      drawAgentsAndEdges(pal, Math.max(flockW, meshW), velBoost, focus)

      /* update HUD directly — zero React re-renders on scroll */
      const label = phaseName(p, focus)
      if (label !== lastPhaseLabel && phaseRef.current) {
        lastPhaseLabel = label
        phaseRef.current.textContent = label
      }
      if (meterRef.current) {
        meterRef.current.style.transform = `scaleX(${p.toFixed(3)})`
      }
    }

    let prevTs = 0
    const loop = (ts) => {
      rafId = 0
      if (!inView || hidden || isReduced()) return
      const dt = prevTs ? clamp((ts - prevTs) / 1000, 0.004, 0.05) : 1 / 60
      prevTs = ts
      step(dt)
      rafId = window.requestAnimationFrame(loop)
    }

    const start = () => {
      if (isReduced()) {
        stop()
        drawStatic()
        return
      }
      if (!rafId && inView && !hidden) {
        prevTs = 0
        rafId = window.requestAnimationFrame(loop)
      }
    }

    const stop = () => {
      if (rafId) {
        window.cancelAnimationFrame(rafId)
        rafId = 0
      }
    }

    const onScroll = () => {
      measureScroll()
      if (!isReduced()) start()
    }

    const onTheme = (event) => {
      theme = event.detail ?? getTheme()
      if (isReduced()) drawStatic()
    }

    const onVisibility = () => {
      hidden = document.hidden
      if (hidden) stop()
      else start()
    }

    const onPointerMove = (event) => {
      const rect = canvas.getBoundingClientRect()
      pointer.x = event.clientX - rect.left
      pointer.y = event.clientY - rect.top
      pointer.active = true
    }

    const onPointerLeave = () => {
      pointer.active = false
    }

    resize()
    measureScroll()
    smoothP = targetP

    const ro = typeof ResizeObserver === 'function' ? new ResizeObserver(resize) : null
    if (ro) ro.observe(canvas)
    else window.addEventListener('resize', resize, { passive: true })

    const io = typeof IntersectionObserver === 'function'
      ? new IntersectionObserver(
          (entries) => {
            inView = entries.some((e) => e.isIntersecting)
            if (inView) {
              measureScroll()
              start()
            } else {
              stop()
            }
          },
          { rootMargin: '140px 0px 140px 0px', threshold: 0 }
        )
      : null
    if (io) io.observe(sectionRef?.current || canvas)

    const motionMq = window.matchMedia?.('(prefers-reduced-motion: reduce)')
    const onMotion = () => {
      if (isReduced()) {
        stop()
        drawStatic()
      } else {
        start()
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('f31:theme', onTheme)
    document.addEventListener('visibilitychange', onVisibility)
    canvas.addEventListener('pointermove', onPointerMove, { passive: true })
    canvas.addEventListener('pointerleave', onPointerLeave, { passive: true })
    motionMq?.addEventListener?.('change', onMotion)

    start()

    return () => {
      stop()
      ro?.disconnect()
      io?.disconnect()
      window.removeEventListener('resize', resize)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('f31:theme', onTheme)
      document.removeEventListener('visibilitychange', onVisibility)
      canvas.removeEventListener('pointermove', onPointerMove)
      canvas.removeEventListener('pointerleave', onPointerLeave)
      motionMq?.removeEventListener?.('change', onMotion)
    }
  }, [sectionRef, groups])

  /* redraw immediately if reduced motion is on and user clicks a domain chip */
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (document.documentElement.classList.contains('reduce')) {
      window.dispatchEvent(new CustomEvent('f31:theme', { detail: getTheme() }))
    }
  }, [activeIndex])

  return (
    <div className="swarm" data-reveal>
      <div className="swarm__viewport">
        <canvas className="swarm__canvas" ref={canvasRef} aria-hidden="true" />
        <div className="swarm__meter" aria-hidden="true">
          <span ref={meterRef} />
        </div>
      </div>
      <div className="swarm__hud">
        <span className="swarm__state" aria-hidden="true">
          <span className="swarm__pulse" />
          <b>[swarm]</b>
          <span ref={phaseRef}>flocking</span>
          <span className="swarm__hint">· scroll to converge, select a domain to route</span>
        </span>
        <div
          className="swarm__chips"
          role="group"
          aria-label="Highlight an infrastructure domain"
          onPointerLeave={() => onHover?.(-1)}
        >
          {groups.map((group, idx) => {
            const isPinned = pinnedIndex === idx
            const isHighlighted = activeIndex === idx
            return (
              <button
                key={group.code}
                type="button"
                className={`swarm__chip swarm__chip--${idx}${isHighlighted ? ' is-active' : ''}`}
                aria-pressed={isPinned}
                onPointerMove={(event) => {
                  /* Hover focus follows real pointer movement only: pointerenter
                     also fires when scrolling slides a chip under a stationary
                     cursor, which made the field flicker while scrolling. */
                  if (event.pointerType !== 'touch') onHover?.(idx)
                }}
                onClick={() => onSelect(isPinned ? -1 : idx)}
              >
                <span className="swarm__chip-dot" aria-hidden="true" />
                {group.code}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
