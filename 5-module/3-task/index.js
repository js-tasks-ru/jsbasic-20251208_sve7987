function initCarousel() {
  let carouselArrowRight = document.querySelector('.carousel__arrow_right');
  let carouselArrowLeft = document.querySelector('.carousel__arrow_left');
  let carouselInner = document.querySelector('.carousel__inner');
  
  let slides = document.querySelectorAll('.carousel__slide');
  let slidesCount = slides.length; 
  let slideWidth = slides[0].offsetWidth; 
  let currentSlide = 0; 

  carouselArrowLeft.style.display = 'none';
  
  function updateCarousel() {
    carouselInner.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
    if (currentSlide === 0) {
      carouselArrowLeft.style.display = 'none';
    } else {
      carouselArrowLeft.style.display = '';
    }
    if (currentSlide === slidesCount - 1) {
      carouselArrowRight.style.display = 'none';
    } else {
      carouselArrowRight.style.display = '';
    }
  }
  
  carouselArrowRight.onclick = function() {
    currentSlide++;
    updateCarousel();
  };
  
  carouselArrowLeft.onclick = function() {
    currentSlide--;
    updateCarousel();
  };
}




