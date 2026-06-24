

document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initStatsCounter();
  initMouseOrbParallax();
  initVideoScrollAnimation();
});


function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  if (revealElements.length === 0) return;

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        

        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -10% 0px', 

    threshold: 0.1
  });

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });
}


function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-number');
  if (statNumbers.length === 0) return;

  const countObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const targetValue = parseInt(target.getAttribute('data-target'), 10);
        const suffix = target.getAttribute('data-suffix') || '';
        
        animateCounter(target, targetValue, suffix);
        observer.unobserve(target); 

      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(num => {
    countObserver.observe(num);
  });
}

function animateCounter(element, targetValue, suffix) {
  let startValue = 0;
  const duration = 2000; 

  const startTime = performance.now();

  function updateCount(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Easing function (easeOutQuad)
    const easeProgress = progress * (2 - progress);
    
    const currentValue = Math.floor(easeProgress * targetValue);
    element.textContent = currentValue + suffix;

    if (progress < 1) {
      requestAnimationFrame(updateCount);
    } else {
      element.textContent = targetValue + suffix;
    }
  }

  requestAnimationFrame(updateCount);
}

/* --- Mouse Parallax modifier for Ambient Orbs --- */
function initMouseOrbParallax() {
  const orbs = document.querySelectorAll('.orb');
  if (orbs.length === 0) return;

  window.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth - 0.5;
    const mouseY = e.clientY / window.innerHeight - 0.5;

    orbs.forEach((orb, index) => {
      // Different speed multipliers for distinct layered depth effect
      const speed = (index + 1) * 20; 
      const xOffset = mouseX * speed;
      const yOffset = mouseY * speed;
      
      // Preserve existing CSS keyframe translate animation by adjusting dynamic css variable instead
      orb.style.setProperty('--mouseX', `${xOffset}px`);
      orb.style.setProperty('--mouseY', `${yOffset}px`);
      
      // Hook mouse parallax onto transforms
      orb.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
    });
  });
}

/* --- Expanding Video Scroll Showcase --- */
function initVideoScrollAnimation() {
  const section = document.querySelector('.video-scroll-section');
  if (!section) return;

  const frame = section.querySelector('.video-scroll-frame');
  const video = section.querySelector('.video-scroll-element');
  const contentWrap = section.querySelector('.video-scroll-content-wrap');

  function updateVideoScroll() {
    const scrollTop = window.scrollY;
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const viewHeight = window.innerHeight;

    // Start progress calculation when the top of the section enters the bottom of the viewport
    const startScroll = sectionTop - viewHeight;
    // Finish the expansion when the section is fully sticky and has scrolled 30% of the sticky track length
    const stickyHeight = sectionHeight - viewHeight;
    const endScroll = sectionTop + stickyHeight * 0.3;

    if (scrollTop >= startScroll && scrollTop <= sectionTop + stickyHeight) {
      const scrollRange = endScroll - startScroll;
      const progress = Math.max(0, Math.min(1, (scrollTop - startScroll) / scrollRange));

      // 1. Clip path inset updates (starts at 40% inset and goes to 0% at progress = 1)
      const insetY = 40 * (1 - progress);
      const insetX = 40 * (1 - progress);
      const roundedness = 300 * (1 - progress);
      frame.style.clipPath = `inset(${insetY}% ${insetX}% ${insetY}% ${insetX}% round ${roundedness}px)`;

      // 2. Video scaling (starts at 0.7 and goes to 1.0)
      const scale = 0.7 + (progress * 0.3);
      video.style.transform = `scale(${scale})`;

      // 3. Centered Content reveal (starts fading and sliding up once the video has expanded partially, e.g. progress > 0.4)
      let contentProgress = 0;
      if (progress > 0.4) {
        contentProgress = Math.max(0, Math.min(1, (progress - 0.4) / 0.5));
      }
      
      const yOffset = 50 * (1 - contentProgress);
      contentWrap.style.opacity = contentProgress;
      contentWrap.style.transform = `translateY(${yOffset}px)`;

      if (contentProgress > 0.8) {
        contentWrap.style.pointerEvents = 'auto';
      } else {
        contentWrap.style.pointerEvents = 'none';
      }

    } else if (scrollTop < startScroll) {
      // Before viewport entry
      frame.style.clipPath = `inset(40% 40% 40% 40% round 300px)`;
      video.style.transform = `scale(0.7)`;
      contentWrap.style.opacity = 0;
      contentWrap.style.transform = `translateY(50px)`;
      contentWrap.style.pointerEvents = 'none';
    } else {
      // Passed scroll area
      frame.style.clipPath = `inset(0% 0% 0% 0% round 0px)`;
      video.style.transform = `scale(1)`;
      contentWrap.style.opacity = 1;
      contentWrap.style.transform = `translateY(0)`;
      contentWrap.style.pointerEvents = 'auto';
    }
  }

  // Bind to window scroll
  window.addEventListener('scroll', updateVideoScroll);
  // Run once to initialize states
  updateVideoScroll();
}
