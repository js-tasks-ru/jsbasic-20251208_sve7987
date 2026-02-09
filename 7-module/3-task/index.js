import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor(config) {
    this.steps = config.steps;
    this.value = config.value;
    this.render();
    this.addEventListeners();
    this.updateSlider();
  }

  render() {
    let stepsHTML = '';
    for (let i = 0; i < this.steps; i++) {
      stepsHTML += '<span></span>';
    }
    
    this.elem = createElement(`
      <div class="slider">
        <div class="slider__thumb">
          <span class="slider__value">${this.value}</span>
        </div>
        <div class="slider__progress"></div>
        <div class="slider__steps">
          ${stepsHTML}
        </div>
      </div>
    `);
  }

  addEventListeners() {
    this.elem.addEventListener('click', (event) => {
      const left = event.clientX - this.elem.getBoundingClientRect().left;
      const leftRelative = left / this.elem.offsetWidth;
      const segments = this.steps - 1;
      const approximateValue = leftRelative * segments;
      const newValue = Math.round(approximateValue);
      
      if (newValue === this.value) {
        return;
      }
      
      this.value = newValue;
      
      this.updateSlider();
      
      const sliderChangeEvent = new CustomEvent('slider-change', {
        detail: this.value,
        bubbles: true
      });
      this.elem.dispatchEvent(sliderChangeEvent);
    });
  }

  updateSlider() {
    const thumbValue = this.elem.querySelector('.slider__value');
    thumbValue.textContent = this.value;
    
    const segments = this.steps - 1;
    const valuePercents = this.value / segments * 100;
    
    const thumb = this.elem.querySelector('.slider__thumb');
    thumb.style.left = `${valuePercents}%`;
    
    const progress = this.elem.querySelector('.slider__progress');
    progress.style.width = `${valuePercents}%`;
    
    const steps = this.elem.querySelectorAll('.slider__steps span');

    steps.forEach(step => {
      step.classList.remove('slider__step-active');
    });
    
    if (steps[this.value]) {
      steps[this.value].classList.add('slider__step-active');
    }
  }
}
