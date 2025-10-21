// ------- Osmo [https://osmo.supply/] ------- //

document.addEventListener("DOMContentLoaded", () => {
	// Register GSAP Plugins
  gsap.registerPlugin(ScrollTrigger);
  // Parallax Layers
  document.querySelectorAll('[data-parallax-layers]').forEach((triggerElement) => {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerElement,
        start: "0% 0%",
        end: "100% 0%",
        scrub: 0
      }
    });
    const layers = [
      { layer: "1", yPercent: 90 },
      { layer: "2", yPercent: 80 },
      { layer: "3", yPercent: 70 },
      { layer: "4", yPercent: 60 },
      { layer: "5", yPercent: 50 },
      { layer: "6", yPercent: 40 },
      { layer: "7", yPercent: 30 },
      { layer: "8", yPercent: 20 },
      { layer: "9", yPercent: 10 },
      { layer: "888", yPercent: 20 },
      { layer: "555", yPercent: 10 },
      { layer: "999", yPercent: 40 },
      { layer: "1000", yPercent: 10 },
      { layer: "1001", yPercent: 10 },
      { layer: "777", yPercent: 10 }
    ];
    layers.forEach((layerObj, idx) => {
      tl.to(
        triggerElement.querySelectorAll(`[data-parallax-layer="${layerObj.layer}"]`),
        {
          yPercent: layerObj.yPercent,
          ease: "none"
        },
        idx === 0 ? undefined : "<"
      );
    });
  });
});
/* Lenis */
const lenis = new Lenis();
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => {lenis.raf(time * 1000);});
gsap.ticker.lagSmoothing(0);




document.addEventListener("DOMContentLoaded", () => {
  const images = [
    "assets/imgs/Section_1/background.f8e0a3e86fb4252623af.png",
    "assets/imgs/Section_1/background.png",
    "assets/imgs/Section_1/mountains.png",
    "assets/imgs/Section_1/logo_land.png",
    "assets/imgs/Section_1/jungle1.png",
    "assets/imgs/Section_1/jungle2.png",
    "assets/imgs/Section_1/jungle3.png",
    "assets/imgs/Section_1/jungle4.png",

    
    "assets/imgs/Section_8/background.f8e0a3e86fb4252623af.png",
    "assets/imgs/Section_8/background.png",
    "assets/imgs/Section_8/mountains.png",
    "assets/imgs/Section_8/logo_land.png",
    "assets/imgs/Section_8/jungle1.png",
    "assets/imgs/Section_8/jungle2.png",
    "assets/imgs/Section_8/jungle3.png",
    "assets/imgs/Section_8/jungle4.png",

    "assets/imgs/Section_11/background.f8e0a3e86fb4252623af.png",
    "assets/imgs/Section_11/background.png",
    "assets/imgs/Section_11/mountains.png",
    "assets/imgs/Section_11/logo_land.png",
    "assets/imgs/Section_11/jungle1.png",
    "assets/imgs/Section_11/jungle2.png",
    "assets/imgs/Section_11/jungle3.png",
    "assets/imgs/Section_11/jungle4.png",


  ];

  images.forEach(src => {
    const img = new Image();
    img.src = src;
  });
});

 
// Repo Cards 
window.addEventListener('DOMContentLoaded', async function() {
  async function get(url) {
    const resp = await fetch(url);
    return resp.json();
  }



  const emojis = await get('https://api.github.com/emojis');
  const colors = await get('https://raw.githubusercontent.com/ozh/github-colors/master/colors.json');

  document.querySelectorAll('.repo-card').forEach(async function(el) {
    const name = el.getAttribute('data-repo');

    const data = await get(`https://api.github.com/repos/${name}`);

    data.description = (data.description || '').replace(/:\w+:/g, function(match) {
      const name = match.substring(1, match.length - 1);
      const emoji = emojis[name];

      if (emoji) {
        return `<span><img src="${emoji}" style="width: 1rem; height: 1rem; vertical-align: -0.2rem;"></span>`;
      }

      return match;
    });

    el.innerHTML = `
    <div style="font-family: Segoe UI Emoji; font-weight: 600; padding: 16px; font-size: 18px; line-height: 1.5; color: #24292e;">
      <div style="display: flex; align-items: center;">
        <svg style="fill:rgb(77, 92, 106); margin-right: 8px;" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"></path></svg>
        <span style="font-weight: 600; color: #0366d6;">
          <a style="text-decoration: none; color: inherit;" href="${data.html_url}">${data.name}</a>
        </span>
      </div>
      <div style="display: ${data.fork ? 'block' : 'none'}; font-size: 16px; color: #586069;">Forked from <a style="color: inherit; text-decoration: none;" href="${data.fork ? data.source.html_url : ''}">${data.fork ? data.source.full_name : ''}</a></div>
      <div style="font-size: 16px; margin-bottom: 16px; margin-top: 8px; color:rgb(49, 121, 60);">${data.description}</div>
      <div style="font-size: 16px; color:rgb(105, 99, 88); display: flex;">
        <div style="${data.language ? '' : 'display: none'}; margin-right: 16px;">
          <span style="width: 12px; height: 12px; border-radius: 100%; background-color: ${data.language ? colors[data.language].color : ''}; display: inline-block; top: 1px; position: relative;"></span>
          <span>${data.language}</span>
        </div>
        <div style="display: ${data.stargazers_count == 0 ? 'none' : 'flex'}; align-items: center; margin-right: 16px;">
          <svg style="fill:rgb(170, 152, 59);" aria-label="stars" viewBox="0 0 16 16" version="1.1" width="16" height="16" role="img"><path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path></svg>
          &nbsp; <span>${data.stargazers_count}</span>
        </div>
        <div style="display: ${data.forks == 0 ? 'none' : 'flex'}; align-items: center;">
          <svg style="fill: #586069;" aria-label="fork" viewBox="0 0 16 16" version="1.1" width="16" height="16" role="img"><path fill-rule="evenodd" d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"></path></svg>
          &nbsp; <span>${data.forks}</span>
        </div>
      </div>
    </div>
    `;
  });
});
 

///////////////////////// text animation

// document.addEventListener("DOMContentLoaded", function () {
//   const textElement = document.getElementById("typing-textw");

//   const originalText = textElement.textContent
//       .replace(/\s*\n\s*/g, "\n") // Убираем лишние пробелы вокруг переносов строк
//       .trim(); // Убираем пробелы в начале и в конце

//   textElement.textContent = ""; // Очищаем текст
//   textElement.style.minHeight = textElement.offsetHeight + "px"; // Фиксируем начальную высоту

//   let charIndex = 0;

//   function typeCharacter() {
//       if (charIndex < originalText.length) {
//           const currentChar = originalText[charIndex];

//           if (currentChar === "\n") {
//               textElement.appendChild(document.createElement("br")); // Добавляем перенос строки
//               textElement.appendChild(document.createElement("br"));
//           } else {
//               const charSpan = document.createElement("span");
//               charSpan.textContent = currentChar;
//               charSpan.classList.add("fade-in-letter");
//               charSpan.style.display = "inline"; // Гарантируем, что символы не смещаются
//               textElement.appendChild(charSpan);
//           }

//           charIndex++;
//           setTimeout(typeCharacter, 110);
//       }
//   }

//   typeCharacter();
// });https://i.imgur.com/HTdjEJU.gifhttps://i.imgur.com/23lW9TP.gif

document.addEventListener("DOMContentLoaded", function () {
  const textElement = document.getElementById("typing-textw");
  const startButtons = [
      { id: 'startButton', audioSrc: 'assets/audio/pain.mp3', gifSrc: 'https://i.imgur.com/4RaR7zg.gif', parallaxLayer: '444', text: `\nFeel Pain. Accept Pain. And Know Pain. \n\n⏸Those Who Do Not Know Pain, Will Never Understand True Peace.\n\n⏸And Now...`, delays: { text: 0, audio: 0, gif: 12200, gifDuration: 5800 } },
      { id: 'startButton2', audioSrc: 'assets/audio/sasuke_audio.mp3', gifSrc: 'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExeHhzeGtxa25nMWQ3cmpwZjdkdHphOHp3cXM0NWpmMmNmdXR1OXQ0MCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/X4s4RRkT5F5pS/giphy.gif', parallaxLayer: '555', text: `\n\n\n \t    These eyes, see darkness clearly ...`, delays: { text: 0, audio: 0, gif: 1500, gifDuration: 1900 } },
      { id: 'startButton3', audioSrc: 'assets/audio/madara.mp3', gifSrc: 'https://i.imgur.com/RvjbMz2.gif', parallaxLayer: '888', text: `\n\n\n \t   I am ... ⏸ the ghost of the Uchiha ...`, delays: { text: 0, audio: 0, gif: 4900, gifDuration: 6800 } },
      { id: 'startButton4', audioSrc: 'assets/audio/konan_obito.mp3', gifSrc: 'https://i.imgur.com/4JbSMWM.gif', parallaxLayer: '999', text: `\n\n\n \t\t   光のない世界に花は枯れる `, delays: { text: 0, audio: 0, gif: 100, gifDuration: 4500 } },
      { id: 'startButton5', audioSrc: 'assets/audio/toji.mp3', gifSrc: 'https://i.imgur.com/e2PkD86.mp4', parallaxLayer: '1001', text: `\n\n\n \tПохоже к нунчакам прилипла какая-то фигня ... `, delays: { text: 12000, audio: 100, gif: 0, gifDuration: 12900 } },
      { id: 'startButton6', audioSrc: 'assets/audio/itachi.mp3', gifSrc: 'https://i.imgur.com/uAA90ks.mp4', parallaxLayer: '1000', text: `\n\n\n \t\t    Sono Sharingan ... `, delays: { text: 2000, audio: 100, gif: 100, gifDuration: 6100 } },
      { id: 'startButton7', audioSrc: 'assets/audio/SonJunWu.mp3', gifSrc: 'https://i.imgur.com/DX4M1ro.mp4', parallaxLayer: '777', text: `\n\n\n \t\t\t    Arise `, delays: { text: 0, audio: 600, gif: 1500, gifDuration: 8000 } }
  ];

  function setupButton({ id, audioSrc, gifSrc, parallaxLayer, text, delays }) {
      const button = document.getElementById(id);
      if (!button) return;
      
      const audio = new Audio(audioSrc);
      audio.volume = 0.7;

      button.addEventListener("click", function () {
          button.style.display = "none";
          // Get video scale from button if available
          const videoScale = button.getAttribute('data-video-scale') || 'auto';
          startAll(text, audio, gifSrc, parallaxLayer, delays, videoScale);
      });
  }

  function startAll(text, audio, gifSrc, parallaxLayer, delays, videoScale = 'auto') {
      let typingStarted = false;
      let audioStarted = false;
      
      function startTyping() {
          textElement.innerHTML = "";
          let charIndex = 0;

          function typeCharacter() {
              if (charIndex < text.length) {
                  const currentChar = text[charIndex];
                  if (currentChar === "⏸") {
                      charIndex++;
                      setTimeout(typeCharacter, 800);
                      return;
                  }
                  
                  if (currentChar === "\n") {
                      textElement.appendChild(document.createElement("br"));
                  } else {
                      const span = document.createElement("span");
                      span.textContent = currentChar;
                      span.classList.add("fade-in-letter");
                      textElement.appendChild(span);
                  }
                  charIndex++;
                  setTimeout(typeCharacter, 90);
              }
          }
          typeCharacter();
      }

      setTimeout(() => { startTyping(); }, delays.text);
      setTimeout(() => { playAudio(audio); }, delays.audio);
      setTimeout(() => { showGif(gifSrc, parallaxLayer, delays.gifDuration, videoScale); }, delays.gif);
  }

  function playAudio(audio) {
      audio.play().catch(err => console.warn("Ошибка воспроизведения аудио:", err));
  }

  function showGif(gifSrc, parallaxLayer, gifDuration, videoScale = 'auto') {
    const gifContainer = document.createElement("div");
    gifContainer.style.position = "fixed";
    gifContainer.style.top = "0";
    gifContainer.style.left = "0";
    gifContainer.style.width = "100vw";
    gifContainer.style.height = "100vh";
    gifContainer.style.zIndex = "1001";
    gifContainer.style.opacity = "0";
    gifContainer.style.transition = "opacity 1s ease-in-out";
    gifContainer.style.display = "flex";
    gifContainer.style.justifyContent = "center";
    gifContainer.style.alignItems = "center";
    gifContainer.style.backgroundColor = "black";

    // Check if the source is a video
    const isVideo = gifSrc.endsWith('.mp4') || gifSrc.endsWith('.webm') || gifSrc.endsWith('.mov');
    
    if (isVideo) {
      const videoElement = document.createElement("video");
      videoElement.src = gifSrc;
      videoElement.autoplay = true;
      videoElement.loop = true;
      videoElement.muted = true;
      
      // Handle video scaling with more granular control
      if (videoScale === 'auto') {
        // Default auto-sizing behavior
        videoElement.style.maxWidth = "100%";
        videoElement.style.maxHeight = "100%";
        videoElement.style.width = "auto";
        videoElement.style.height = "auto";
        videoElement.style.objectFit = "contain";
      } else if (videoScale === 'fill') {
        // Fill screen while maintaining aspect ratio
        videoElement.style.width = "100%";
        videoElement.style.height = "100%";
        videoElement.style.objectFit = "cover";
      } else if (videoScale === 'stretch') {
        // Stretch to fill screen (may distort)
        videoElement.style.width = "100%";
        videoElement.style.height = "100%";
        videoElement.style.objectFit = "fill";
      } else {
        // Custom scaling using transform instead of width/height
        // This provides smoother scaling without stretching
        videoElement.style.maxWidth = "100%";
        videoElement.style.maxHeight = "100%";
        videoElement.style.width = "auto";
        videoElement.style.height = "auto";
        videoElement.style.objectFit = "contain";
        
        // Apply scale transform for precise sizing control
        const scale = parseFloat(videoScale) || 1.0;
        videoElement.style.transform = `scale(${scale})`;
      }
      
      videoElement.style.pointerEvents = "none";
      
      gifContainer.appendChild(videoElement);
    } else {
      const gifImage = document.createElement("img");
      gifImage.src = gifSrc;
      gifImage.alt = "GIF";
      gifImage.style.width = "100vw";
      gifImage.style.height = "100vh";
      gifImage.style.objectFit = "cover";
      gifImage.style.pointerEvents = "none";
      
      gifContainer.appendChild(gifImage);
    }

    document.body.appendChild(gifContainer);

    setTimeout(() => { gifContainer.style.opacity = "1"; }, 100);
    setTimeout(() => { fadeOutGif(gifContainer, parallaxLayer); }, gifDuration);
  }

  function fadeOutGif(gifContainer, parallaxLayer) {
      gifContainer.style.opacity = "0";
      setTimeout(() => {
          gifContainer.remove();
          restorePage(parallaxLayer);
      }, 1500);
  }

  function restorePage(parallaxLayer) {
      document.body.style.opacity = "1";
      const img = document.querySelector(`img[data-parallax-layer="${parallaxLayer}"]`);
      if (img) img.style.opacity = "1";
  }

  // Process startButtons
  startButtons.forEach(setupButton);
  
  // Enhanced Hover animation code with video support
  document.querySelectorAll('.start-button').forEach(button => {
    const img = button.getAttribute('data-img');
    const gifImg = button.getAttribute('data-gifka');
    // Get custom size if specified
    const gifSize = button.getAttribute('data-gif-size') || 'cover';
    
    // Ensure button has rounded style if not already defined
    button.style.borderRadius = "50%";
    button.style.overflow = "hidden";
    
    if (img) {
      // Set initial image
      setButtonBackground(button, img, 'cover');
    }
    
    // Position setup
    const top = button.getAttribute('data-top') || '50%';
    const left = button.getAttribute('data-left') || '50%';
    button.style.top = top;
    button.style.left = left;
    
    if (gifImg) {
      button.addEventListener('mouseenter', function() {
        setButtonBackground(button, gifImg, gifSize);
      });
      
      button.addEventListener('mouseleave', function() {
        setButtonBackground(button, img, 'cover');
      });
    }
    
    // Click handler
    button.addEventListener('click', () => {
      button.style.opacity = '0';
      setTimeout(() => button.style.display = 'none', 500);
    });
  });
  
  // Helper function to set button background (handles both images and videos)
  function setButtonBackground(button, source, size) {
    // Check if it's a video
    const isVideo = source.endsWith('.mp4') || source.endsWith('.webm') || source.endsWith('.mov');
    
    if (isVideo) {
      // Remove existing background image
      button.style.backgroundImage = 'none';
      
      // Remove any existing video element
      const existingVideo = button.querySelector('video');
      if (existingVideo) {
        existingVideo.remove();
      }
      
      // Create video element
      const video = document.createElement('video');
      video.src = source;
      video.autoplay = true;
      video.loop = true;
      video.muted = true;
      video.style.position = 'absolute';
      video.style.top = '0';
      video.style.left = '0';
      video.style.width = '100%';
      video.style.height = '100%';
      video.style.objectFit = size;
      video.style.borderRadius = '50%';
      video.style.zIndex = '-1';
      
      button.appendChild(video);
      
      // Set button position to relative if not already
      if (button.style.position !== 'absolute' && button.style.position !== 'fixed') {
        button.style.position = 'relative';
      }
    } else {
      // If there's a video, remove it
      const existingVideo = button.querySelector('video');
      if (existingVideo) {
        existingVideo.remove();
      }
      
      // Set background image
      button.style.backgroundImage = `url(${source})`;
      button.style.backgroundSize = size;
      button.style.backgroundPosition = 'center';
      button.style.backgroundRepeat = 'no-repeat';
    }
  }
});



// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 


// JavaScript для Matrix Rain Effect
const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789@#$%^&*()(* ^ ω ‾́ )(ﾉ´ヮ)ﾉ*: ･ﾟ(๑˘︶˘๑)( ˙꒳​˙ )(´･ᴗ･ )(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧';
const fontSize = 16;
const columns = canvas.width / fontSize;

const drops = [];
for (let i = 0; i < columns; i++) {
  drops[i] = Math.random() * canvas.height;
}

function draw() {
  ctx.fillStyle = 'hsla(0, 0.00%, 0.00%, 0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#0F0'; // Зеленый цвет для символов
  ctx.font = `${fontSize}px monospace`;

  for (let i = 0; i < drops.length; i++) {
    const text = characters[Math.floor(Math.random() * characters.length)];
    ctx.fillText(text, i * fontSize, drops[i]);

    if (drops[i] > canvas.height || Math.random() > 1.5) {
      drops[i] = 0;
    }
    drops[i] += fontSize * 0.15; // Скорость падения
  }

  requestAnimationFrame(draw);
}

draw();


 
// document.querySelectorAll('.start-button').forEach(button => {
//   // Устанавливаем изображение фоном кнопки
//   const img = button.getAttribute('data-img');
//   if (img) {
//       button.style.backgroundImage = `url(${img})`;
//   }

//   // Устанавливаем стартовую позицию
//   const top = button.getAttribute('data-top') || '50%';
//   const left = button.getAttribute('data-left') || '50%';
//   button.style.top = top;
//   button.style.left = left;

//   // Добавляем плавное исчезновение при клике
//   button.addEventListener('click', () => {
//       button.style.opacity = '0'; /* Исчезает */
//       setTimeout(() => button.style.display = 'none', 500); /* Полностью убираем */
//   });
// });



///////////////////////////////////////////////////////////////

document.addEventListener('DOMContentLoaded', function() {
  const sectionBlurOverlay = document.getElementById('sectionBlurOverlay');
  const successMessage = document.getElementById('successMessage');
  const imageOptions = document.querySelectorAll('.image-option');
  
  // Отслеживаем выбранные изображения
  let selectedCorrect = 0;
  const totalCorrect = document.querySelectorAll('.image-option[data-correct="true"]').length;
  
  // Добавляем обработчики событий для изображений
  imageOptions.forEach(option => {
      option.addEventListener('click', function() {
          // Переключаем выбор
          this.classList.toggle('selected');
          
          // Подсчитываем правильные выборы
          const isCorrect = this.getAttribute('data-correct') === 'true';
          const isSelected = this.classList.contains('selected');
          
          if (isCorrect && isSelected) {
              selectedCorrect++;
          } else if (isCorrect && !isSelected) {
              selectedCorrect--;
          }
          
          // Проверяем, выбраны ли все правильные изображения и ни одного неправильного
          const selectedIncorrect = document.querySelectorAll('.image-option[data-correct="false"].selected').length;
          
          if (selectedCorrect === totalCorrect && selectedIncorrect === 0) {
              // Показываем сообщение об успехе
              successMessage.style.display = 'block';
              
              // Убираем блюр после небольшой задержки
              setTimeout(() => {
                  sectionBlurOverlay.style.opacity = '0';
                  setTimeout(() => {
                      sectionBlurOverlay.style.display = 'none';
                  }, 500);
              }, 1500);
          } else {
              // Скрываем сообщение об успехе, если оно было показано
              successMessage.style.display = 'none';
          }
      });
  });
});


// Функция для определения мобильного устройства
function isMobileDevice() {
  return (window.innerWidth <= 768) || 
         /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Функция для блокировки сайта на мобильных устройствах
function checkDevice() {
  if (isMobileDevice()) {
      document.getElementById('mobile-warning').style.display = 'block';
      document.getElementById('content').classList.add('blurred');
  } else {
      document.getElementById('mobile-warning').style.display = 'none';
      document.getElementById('content').classList.remove('blurred');
  }
}

// Проверить устройство при загрузке страницы
window.addEventListener('load', checkDevice);

// Также проверять при изменении размера окна
window.addEventListener('resize', checkDevice);


// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //  Hover animation

document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.start-button').forEach(button => {
    const img = button.getAttribute('data-img');
    const gifImg = button.getAttribute('data-gifka');
    // Get custom size if specified
    const gifSize = button.getAttribute('data-gif-size') || 'cover';
    
    if (img) {
      button.style.backgroundImage = `url(${img})`;
      button.style.backgroundSize = 'cover';
    }
    
    // Position setup
    const top = button.getAttribute('data-top') || '50%';
    const left = button.getAttribute('data-left') || '50%';
    button.style.top = top;
    button.style.left = left;
    
    if (gifImg) {
      button.addEventListener('mouseenter', function() {
        button.style.backgroundImage = `url(${gifImg})`;
        button.style.backgroundSize = gifSize;
      });
      
      button.addEventListener('mouseleave', function() {
        button.style.backgroundImage = `url(${img})`;
        button.style.backgroundSize = 'cover';
      });
    }
    
    // Click handler
    button.addEventListener('click', () => {
      button.style.opacity = '0';
      setTimeout(() => button.style.display = 'none', 500);
    });
  });
});