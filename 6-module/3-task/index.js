import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.render(); 
    this.addEventListener();
  }

    formatPrice(price) {
    return `€${price.toFixed(2)}`;
  }

    render() {
  const slidesHtml = this.slides.map(slide => `
    <div class="carousel__slide" data-id="${slide.id}">
      <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
      <div class="carousel__caption">
        <span class="carousel__price">${this.formatPrice(slide.price)}</span>
        <div class="carousel__title">${slide.name}</div>
        <button type="button" class="carousel__button">
          <img src="/assets/images/icons/plus-icon.svg" alt="icon">
        </button>
      </div>
    </div>
  `).join('');

this.elem = createElement(`
  <div class="carousel">
    <div class="carousel__arrow carousel__arrow_right">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </div>
    <div class="carousel__arrow carousel__arrow_left">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon"> 
    </div>
    <div class="carousel__inner">
      ${slidesHtml}
    </div>
  </div>
`);
}

addEventListener() {
  const arrowRight = this.elem.querySelector('.carousel__arrow_right');
  const arrowLeft = this.elem.querySelector('.carousel__arrow_left');
  const plusButtons = this.elem.querySelectorAll('.carousel__button');
  const carouselInner = this.elem.querySelector('.carousel__inner');
  
  const slidesCount = this.slides.length;
  let currentSlide = 0;
  
  const firstSlide = carouselInner.querySelector('.carousel__slide');
  const slideWidth = firstSlide.getBoundingClientRect().width;
  
  const effectiveWidth = slideWidth || 500;
  
  arrowLeft.style.display = 'none';
  
  arrowRight.addEventListener('click', () => {
    currentSlide++;
    carouselInner.style.transform = `translateX(-${currentSlide * effectiveWidth}px)`;
    arrowLeft.style.display = '';
    if (currentSlide === slidesCount - 1) {
      arrowRight.style.display = 'none';
    }
  });
  
  arrowLeft.addEventListener('click', () => {
  currentSlide--;
  carouselInner.style.transform = `translateX(-${currentSlide * effectiveWidth}px)`; 
    
    arrowRight.style.display = '';
    if (currentSlide === 0) {
      arrowLeft.style.display = 'none';
    }
  });
  
  plusButtons.forEach(button => {
    button.addEventListener('click', () => {
      const slideId = button.closest('.carousel__slide').dataset.id;
      
      const customEvent = new CustomEvent("product-add", {
        detail: slideId,
        bubbles: true
      });

      this.elem.dispatchEvent(customEvent);
    });
  });
}
}