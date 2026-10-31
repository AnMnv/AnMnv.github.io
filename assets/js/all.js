// ==========================================
// 1. ПЛАВНЫЙ СКРОЛЛ LENIS
// ==========================================
gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis({
  duration: 1.1,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  smoothTouch: false,
});

lenis.on('scroll', ScrollTrigger.update);

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// ==========================================
// 2. ПАРАЛЛАКС ЭФФЕКТ
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  const isMobile = window.innerWidth <= 768;
  const sections = document.querySelectorAll('.parallax__header');

  sections.forEach((section, sIndex) => {
    const triggerElement = section.querySelector('[data-parallax-layers]');
    if (!triggerElement) return;

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: sIndex === 0 ? "top top" : "top bottom",
        end: "bottom top",
        scrub: isMobile ? 0.2 : true,
        invalidateOnRefresh: true,
      }
    });

const layers = isMobile
      ? [
          { layer: "1", yPercent: 10 },
          { layer: "title", yPercent: 35 }, // Текст плавно погружается за горы
          { layer: "2", yPercent: 12 },     // Горы
          { layer: "4", yPercent: 6 }
        ]
      : [
          { layer: "1", yPercent: 30 },     // Небо
          { layer: "title", yPercent: 75 }, // Текст быстро уходит за гору
          { layer: "2", yPercent: 25 },     // Горы движутся медленнее и накрывают надпись
          { layer: "3", yPercent: 22 },
          { layer: "4", yPercent: 18 },
          { layer: "5", yPercent: 15 },
          { layer: "6", yPercent: 12 },
          { layer: "7", yPercent: 10 },
          { layer: "8", yPercent: 6 },
          { layer: "9", yPercent: 4 }
        ];

    layers.forEach((layerObj, idx) => {
      const targets = triggerElement.querySelectorAll(`[data-parallax-layer="${layerObj.layer}"]`);
      if (targets.length > 0) {
        tl.to(targets, {
          yPercent: layerObj.yPercent,
          ease: "none",
          force3D: true,
        }, idx === 0 ? undefined : "<");
      }
    });
  });

  window.addEventListener('load', () => {
    ScrollTrigger.refresh();
  });
});

// ==========================================
// 3. CANVAS MATRIX (Авто-пауза при скролле)
// ==========================================
const canvas = document.getElementById('matrixCanvas');
if (canvas) {
  const ctx = canvas.getContext('2d', { alpha: false });
  let isCanvasVisible = false;

  function resizeCanvas() {
    canvas.width = canvas.parentElement ? canvas.parentElement.offsetWidth : window.innerWidth;
    canvas.height = canvas.parentElement ? canvas.parentElement.offsetHeight : window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas, { passive: true });

  const observer = new IntersectionObserver(([entry]) => {
    isCanvasVisible = entry.isIntersecting;
  }, { threshold: 0.05 });
  observer.observe(canvas);

  const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZアイウエオカキクケコサシスセソ';
  const fontSize = 14;
  let columns = Math.floor(canvas.width / fontSize);
  let drops = Array.from({ length: columns }, () => Math.random() * -30);

  let lastTime = 0;
  const fps = 25;
  const fpsInterval = 1000 / fps;

  function drawMatrix(currentTime) {
    requestAnimationFrame(drawMatrix);
    if (!isCanvasVisible) return;

    const elapsed = currentTime - lastTime;
    if (elapsed < fpsInterval) return;
    lastTime = currentTime - (elapsed % fpsInterval);

    ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#00FF66';
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
      const text = characters.charAt(Math.floor(Math.random() * characters.length));
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }
  requestAnimationFrame(drawMatrix);
}

// ==========================================
// 4. GITHUB REPOSITORIES LOADER
// ==========================================
window.addEventListener('DOMContentLoaded', async function() {
  const cards = document.querySelectorAll('.repo-card');
  if (cards.length === 0) return;

  try {
    const emojis = await fetch('https://api.github.com/emojis').then(r => r.json()).catch(() => ({}));
    const colors = await fetch('https://raw.githubusercontent.com/ozh/github-colors/master/colors.json').then(r => r.json()).catch(() => ({}));

    cards.forEach(async (el) => {
      const name = el.getAttribute('data-repo');
      if (!name) return;

      try {
        const resp = await fetch(`https://api.github.com/repos/${name}`);
        if (!resp.ok) return;
        const data = await resp.json();

        let desc = data.description || '';
        desc = desc.replace(/:\w+:/g, (match) => {
          const k = match.slice(1, -1);
          return emojis[k] ? `<img src="${emojis[k]}" style="width:1rem;height:1rem;vertical-align:-0.2rem;">` : match;
        });

        const langColor = data.language && colors[data.language] ? colors[data.language].color : '#58a6ff';

        el.innerHTML = `
          <div style="padding: 18px; font-size: 14px; color: #fff;">
            <div style="display:flex; align-items:center; margin-bottom:8px;">
              <span style="font-weight:700; color:#58a6ff; font-size:16px;">
                <a style="text-decoration:none; color:inherit;" target="_blank" rel="noopener" href="${data.html_url}">${data.name}</a>
              </span>
            </div>
            <div style="font-size:13px; color:#cbd5e1; margin-bottom:12px; min-height:40px;">${desc}</div>
            <div style="font-size:12px; color:#94a3b8; display:flex; gap:16px;">
              ${data.language ? `<div><span style="width:10px; height:10px; border-radius:50%; background-color:${langColor}; display:inline-block; margin-right:4px;"></span>${data.language}</div>` : ''}
              <div>★ ${data.stargazers_count}</div>
              <div>🔀 ${data.forks}</div>
            </div>
          </div>
        `;
      } catch (err) {
        console.warn(`Error loading repo ${name}:`, err);
      }
    });
  } catch (e) {
    console.warn("GitHub load error:", e);
  }
});