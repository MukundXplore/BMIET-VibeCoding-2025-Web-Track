document.addEventListener('DOMContentLoaded', () => {
  const sliderTrack = document.querySelector('.slider-track');
  
  // Exit if the slider doesn't exist on the page
  if (!sliderTrack) return;

  const slides = Array.from(sliderTrack.children);
  const navButtons = document.querySelectorAll('.nav-button');
  let slideWidth = 0;
  let currentIndex = 0;
  let slideInterval;
  let debounceTimer;

  const goToSlide = (index, animated = true) => {
    if (slides.length === 0) return;
    
    if (animated) {
      sliderTrack.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)';
    } else {
      sliderTrack.style.transition = 'none';
    }
    
    sliderTrack.style.transform = 'translateX(-' + slideWidth * index + 'px)';
    
    navButtons.forEach(btn => btn.classList.remove('active'));
    if (navButtons[index]) {
      navButtons[index].classList.add('active');
    }
    currentIndex = index;
  };

  const startAutoplay = () => {
    stopAutoplay(); // Prevent multiple intervals
    slideInterval = setInterval(() => {
      let nextIndex = (currentIndex + 1) % slides.length;
      goToSlide(nextIndex);
    }, 4000);
  };

  const stopAutoplay = () => {
    clearInterval(slideInterval);
  };
  
  // Recalculate width and position on resize
  const setupSlider = () => {
    if (slides.length > 0) {
      slideWidth = slides[0].getBoundingClientRect().width;
      goToSlide(currentIndex, false); // Snap to position without animation
    }
  };

  navButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      goToSlide(index);
      stopAutoplay();
      startAutoplay();
    });
  });

  const sliderWrapper = document.querySelector('.slider-wrapper');
  if (sliderWrapper) {
    sliderWrapper.addEventListener('mouseenter', stopAutoplay);
    sliderWrapper.addEventListener('mouseleave', startAutoplay);
  }
  
  // Debounced resize handler for performance
  window.addEventListener('resize', () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(setupSlider, 250);
  });

  // Initial setup
  setupSlider();
  startAutoplay();
});