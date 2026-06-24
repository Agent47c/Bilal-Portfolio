

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileNav();
  initTypingAnimation();
  initActiveNavHighlighter();
  initProcessTimeline();
  initPortfolioFilters();
  initTestimonialSlider();
  initFaqAccordion();
  initFormFloatLabels();
  initCircularRevealWidget();
  initServicePortfolioLinks();
  initContactFormSubmission();
});


function initStickyHeader() {
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}


function initMobileNav() {
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('nav');
  const navLinks = document.querySelectorAll('nav ul li a');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    nav.classList.toggle('active');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      nav.classList.remove('active');
    });
  });
}


function initTypingAnimation() {
  const typingSpan = document.getElementById('typing-text');
  if (!typingSpan) return;

  const phrases = [
    'Talking Head Videos',
    'SaaS Explainer Videos',
    'Podcast Videos',
    'Motion Design Content'
  ];

  let phraseIndex = 0;
  let characterIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
      typingSpan.textContent = currentPhrase.substring(0, characterIndex - 1);
      characterIndex--;
      typingSpeed = 50; 

    } else {
      typingSpan.textContent = currentPhrase.substring(0, characterIndex + 1);
      characterIndex++;
      typingSpeed = 100; 

    }

    if (!isDeleting && characterIndex === currentPhrase.length) {
      

      typingSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && characterIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      

      typingSpeed = 500;
    }

    setTimeout(type, typingSpeed);
  }

  type();
}


function initActiveNavHighlighter() {
  const sections = document.querySelectorAll('section, hero');
  const navLinks = document.querySelectorAll('nav ul li a');

  const options = {
    root: null,
    rootMargin: '-50% 0px -50% 0px', 

    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, options);

  sections.forEach(section => {
    observer.observe(section);
  });
}


function initProcessTimeline() {
  const timeline = document.querySelector('.process-timeline');
  const progressLine = document.querySelector('.process-line-progress');
  const steps = document.querySelectorAll('.process-step');
  if (!timeline || !progressLine) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        

        if (window.innerWidth > 768) {
          progressLine.style.width = '100%';
        } else {
          progressLine.style.height = '100%';
        }

        

        steps.forEach((step, idx) => {
          setTimeout(() => {
            step.classList.add('active');
          }, idx * 1000);
        });
      }
    });
  }, { threshold: 0.3 });

  observer.observe(timeline);
}


function resetAllOtherVideos(currentCard) {
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    if (card !== currentCard) {
      card.removeAttribute('data-clicked');
      card.classList.remove('highlighted');
      const thumb = card.querySelector('.project-thumbnail');
      if (thumb && thumb.querySelector('iframe')) {
        const videoId = thumb.getAttribute('data-video-id');
        const title = thumb.querySelector('img') ? thumb.querySelector('img').getAttribute('alt') : 'Video Thumbnail';
        thumb.innerHTML = `
          <img src="https://img.youtube.com/vi/${videoId}/hqdefault.jpg" alt="${title}" class="portfolio-thumb-img">
          <div class="video-play-btn-overlay">
            <svg viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        `;
      }
    }
  });
}

function initPortfolioFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const showMoreBtn = document.getElementById('show-more-projects-btn');
  if (filterButtons.length === 0) return;

  let showAllAllProjects = false;

  function updatePortfolioDisplay() {
    const activeBtn = document.querySelector('.filter-btn.active');
    const filterValue = activeBtn ? activeBtn.getAttribute('data-filter') : 'all';
    const isMobile = window.innerWidth <= 768;

    let totalMatching = 0;
    projectCards.forEach(card => {
      const cardCategory = card.getAttribute('data-category');
      if (filterValue === 'all' || cardCategory === filterValue) {
        totalMatching++;
      }
    });

    let limit = 4;
    if (isMobile) {
      limit = 2;
    } else if (filterValue !== 'all') {
      limit = totalMatching;
    }

    let visibleCount = 0;

    projectCards.forEach(card => {
      const cardCategory = card.getAttribute('data-category');
      const matchesFilter = (filterValue === 'all' || cardCategory === filterValue);

      if (matchesFilter) {
        if (showAllAllProjects || visibleCount < limit) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 10);
          visibleCount++;
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      } else {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.95)';
        setTimeout(() => {
          card.style.display = 'none';
        }, 200);
      }
    });

    if (showMoreBtn) {
      if (totalMatching > limit) {
        showMoreBtn.style.display = 'inline-block';
        showMoreBtn.textContent = showAllAllProjects ? 'Show Less Videos' : 'Show More Videos';
      } else {
        showMoreBtn.style.display = 'none';
      }
    }
  }

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      showAllAllProjects = false;
      resetAllOtherVideos(null);
      updatePortfolioDisplay();
    });
  });

  if (showMoreBtn) {
    showMoreBtn.addEventListener('click', () => {
      showAllAllProjects = !showAllAllProjects;
      updatePortfolioDisplay();
    });
  }

  updatePortfolioDisplay();

  const portfolioSection = document.querySelector('.portfolio');
  const projectsGrid = document.getElementById('projects-grid');

  projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      const thumb = card.querySelector('.project-thumbnail');
      if (!thumb) return;
      const videoId = thumb.getAttribute('data-video-id');
      if (!videoId) return;

      

      resetAllOtherVideos(card);

      

      card.classList.add('highlighted');
      if (projectsGrid) projectsGrid.classList.add('focus-active');
      if (portfolioSection) portfolioSection.classList.add('focus-active');

      

      if (card.hasAttribute('data-clicked')) return;

      thumb.innerHTML = `
        <div class="video-loader">
          <div class="video-loader-spinner"></div>
        </div>
        <iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0" 
                title="YouTube video player" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowfullscreen>
        </iframe>
      `;

      const iframe = thumb.querySelector('iframe');
      const loader = thumb.querySelector('.video-loader');
      if (iframe && loader) {
        iframe.addEventListener('load', () => {
          loader.style.opacity = '0';
          setTimeout(() => {
            if (loader.parentNode) loader.remove();
          }, 300);
        });
      }
    });

    card.addEventListener('mouseleave', () => {
      

      card.classList.remove('highlighted');
      if (projectsGrid) projectsGrid.classList.remove('focus-active');
      if (portfolioSection) portfolioSection.classList.remove('focus-active');

      if (card.hasAttribute('data-clicked')) return;

      

      const thumb = card.querySelector('.project-thumbnail');
      if (!thumb) return;
      const videoId = thumb.getAttribute('data-video-id');
      if (!videoId) return;

      const title = thumb.querySelector('img') ? thumb.querySelector('img').getAttribute('alt') : 'Video Thumbnail';

      thumb.innerHTML = `
        <img src="https://img.youtube.com/vi/${videoId}/hqdefault.jpg" alt="${title}" class="portfolio-thumb-img">
        <div class="video-play-btn-overlay">
          <svg viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      `;
    });

    card.addEventListener('click', (e) => {
      if (e.target.closest('a') || e.target.closest('button')) return;

      const thumb = card.querySelector('.project-thumbnail');
      if (!thumb) return;
      const videoId = thumb.getAttribute('data-video-id');
      if (!videoId) return;

      resetAllOtherVideos(card);
      card.setAttribute('data-clicked', 'true');
      card.classList.add('highlighted');

      

      if (projectsGrid) projectsGrid.classList.remove('focus-active');
      if (portfolioSection) portfolioSection.classList.remove('focus-active');

      thumb.innerHTML = `
        <div class="video-loader">
          <div class="video-loader-spinner"></div>
        </div>
        <iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&controls=0" 
                title="YouTube video player" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowfullscreen>
        </iframe>
      `;

      const iframe = thumb.querySelector('iframe');
      const loader = thumb.querySelector('.video-loader');
      if (iframe && loader) {
        iframe.addEventListener('load', () => {
          loader.style.opacity = '0';
          setTimeout(() => {
            if (loader.parentNode) loader.remove();
          }, 300);
        });
      }
    });
  });
}


function initTestimonialSlider() {
  const cards = document.querySelectorAll('.testimonial-card');
  const dotsContainer = document.querySelector('.slider-dots');
  const prevBtn = document.getElementById('prev-testimonial');
  const nextBtn = document.getElementById('next-testimonial');
  if (cards.length === 0) return;

  let currentIndex = 0;
  let autoPlayInterval;

  

  cards.forEach((_, index) => {
    const dot = document.createElement('span');
    dot.classList.add('slider-dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
      goToSlide(index);
      resetAutoPlay();
    });
    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll('.slider-dot');

  function updateSlider() {
    cards.forEach((card, index) => {
      card.classList.remove('active', 'prev', 'next');
      
      

      if (index === currentIndex) {
        card.classList.add('active');
      } else if (index === (currentIndex - 1 + cards.length) % cards.length) {
        card.classList.add('prev');
      } else if (index === (currentIndex + 1) % cards.length) {
        card.classList.add('next');
      }
    });

    

    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
  }

  function goToSlide(index) {
    currentIndex = index;
    updateSlider();
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % cards.length;
    updateSlider();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    updateSlider();
  }

  

  if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetAutoPlay(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetAutoPlay(); });

  

  function startAutoPlay() {
    autoPlayInterval = setInterval(nextSlide, 5000);
  }

  function resetAutoPlay() {
    clearInterval(autoPlayInterval);
    startAutoPlay();
  }

  

  updateSlider();
  startAutoPlay();
}

function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (faqItems.length === 0) return;

  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question-btn');
    const answerWrap = item.querySelector('.faq-answer-wrap');
    const answer = item.querySelector('.faq-answer');

    btn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all other items
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
          otherItem.querySelector('.faq-answer-wrap').style.maxHeight = '0px';
        }
      });

      // Toggle current item
      if (isActive) {
        item.classList.remove('active');
        answerWrap.style.maxHeight = '0px';
      } else {
        item.classList.add('active');
        // Set dynamic height from child element scroll height
        answerWrap.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
}

/* --- Floating Labels for Form Inputs --- */
function initFormFloatLabels() {
  const inputs = document.querySelectorAll('.form-input, .form-textarea');
  if (inputs.length === 0) return;

  inputs.forEach(input => {
    // Check initial state
    if (input.value.trim() !== '') {
      input.placeholder = ''; // clear placeholder to prevent overlap
    }

    input.addEventListener('focus', () => {
      input.setAttribute('data-placeholder', input.placeholder);
      input.placeholder = '';
    });

    input.addEventListener('blur', () => {
      if (input.value.trim() === '') {
        input.placeholder = input.getAttribute('data-placeholder') || '';
      }
    });
  });
}

/* --- Circular Reveal Widget Hover Handler --- */
function initCircularRevealWidget() {
  const widget = document.getElementById('about-reveal-widget');
  if (!widget) return;

  const overlay = document.getElementById('circular-overlay');
  const overlayImg = document.getElementById('circular-overlay-img');
  const centerBox = widget.querySelector('.circular-center-box');
  const textSegments = widget.querySelectorAll('.widget-text-segment');

  // Preload widget images for instant response
  textSegments.forEach(segment => {
    const imgUrl = segment.getAttribute('data-image');
    if (imgUrl) {
      const img = new Image();
      img.src = imgUrl;
    }
  });

  textSegments.forEach(segment => {
    segment.addEventListener('mouseenter', () => {
      const imgUrl = segment.getAttribute('data-image');
      if (imgUrl) {
        overlayImg.src = imgUrl;
        overlay.classList.add('active');
        centerBox.classList.add('fade-out');
      }
    });

    segment.addEventListener('mouseleave', () => {
      overlay.classList.remove('active');
      centerBox.classList.remove('fade-out');
    });
  });
}

/**
 * Handles playing the portfolio videos dynamically.
 * If opened via local file protocol (file:

 * Otherwise, embeds the youtube-nocookie iframe directly inside the card for seamless autoplay.
 * @param {HTMLElement} element - The project-thumbnail click target.
 */
function playPortfolioVideo(element) {
  const videoId = element.getAttribute('data-video-id');
  if (!videoId) return;

  if (window.location.protocol === 'file:') {
    // Open in a new tab on local file protocol to completely avoid the browser origin embed restriction
    window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
  } else {
    // Inject the autoplay iframe on web servers (localhost or online hosted)
    element.innerHTML = `
      <iframe src="https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0" 
              title="YouTube video player" 
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen; web-share" 
              referrerpolicy="strict-origin-when-cross-origin" 
              allowfullscreen>
      </iframe>
    `;
  }
}

/* --- Service Card "Previous Work" Navigation --- */
function initServicePortfolioLinks() {
  const links = document.querySelectorAll('.service-portfolio-btn');
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const filterValue = link.getAttribute('data-filter');
      if (!filterValue) return;

      const filterBtn = document.querySelector(`.filter-btn[data-filter="${filterValue}"]`);
      if (filterBtn) {
        filterBtn.click();
      }

      const portfolioSection = document.getElementById('portfolio');
      if (portfolioSection) {
        portfolioSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

/* --- AJAX Contact Form with Animation --- */
function initContactFormSubmission() {
  const form = document.getElementById('main-contact-form');
  const successContainer = document.getElementById('contact-success');
  const checkmarkContainer = successContainer ? successContainer.querySelector('.success-checkmark') : null;

  if (!form || !successContainer) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const submitBtn = document.getElementById('form-submit-btn');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Sending...';
    }

    const formData = new FormData(form);

    fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        // Successful submission animation transition
        form.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        form.style.opacity = '0';
        form.style.transform = 'translateY(-10px)';

        setTimeout(() => {
          form.style.display = 'none';
          successContainer.style.display = 'flex';

          // Trigger checkmark pop after the plane fly animation finishes
          setTimeout(() => {
            if (checkmarkContainer) {
              checkmarkContainer.style.display = 'flex';
            }
          }, 1000);
        }, 400);
      } else {
        alert('Oops! There was a problem submitting your form. Please try again.');
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = 'Send Message &rarr;';
        }
      }
    })
    .catch(error => {
      // Fallback in case of networking issues
      alert('Oops! There was a problem submitting your form. Please try again.');
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Send Message &rarr;';
      }
    });
  });
}
