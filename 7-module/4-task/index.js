import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.segments = steps - 1;
    this.dragging = false;
    
    this.elem = this.#render();
    this.#addEventListeners();
    
    const thumb = this.elem.querySelector('.slider__thumb');
    thumb.ondragstart = () => false;
  }

  #render() {
    const slider = document.createElement('div');
    slider.className = 'slider';
    
    let stepsHTML = '';
    for (let i = 0; i < this.steps; i++) {
      stepsHTML += `<span${i === this.value ? ' class="slider__step-active"' : ''}></span>`;
    }
    
    slider.innerHTML = `
      <div class="slider__thumb">
        <span class="slider__value">${this.value}</span>
      </div>
      <div class="slider__progress" style="width: ${this.value / this.segments * 100}%"></div>
      <div class="slider__steps">
        ${stepsHTML}
      </div>
    `;
    
    return slider;
  }

  #addEventListeners() {
    this.elem.addEventListener('click', this.#onSliderClick.bind(this));
    
    const thumb = this.elem.querySelector('.slider__thumb');
    
    thumb.addEventListener('pointerdown', (event) => {
      event.preventDefault();
      this.dragging = true;
      this.elem.classList.add('slider_dragging');
      
      document.addEventListener('pointermove', this.#onPointerMove.bind(this));
      document.addEventListener('pointerup', this.#onPointerUp.bind(this), { once: true });
      
      this.#moveToEvent(event);
    });
  }

  #onSliderClick(event) {
    if (this.dragging) return;
    
    const left = event.clientX - this.elem.getBoundingClientRect().left;
    const leftRelative = left / this.elem.offsetWidth;
    
    const leftRelativeClipped = Math.max(0, Math.min(1, leftRelative));
    
    const approximateValue = leftRelativeClipped * this.segments;
    const newValue = Math.round(approximateValue);
    
    this.#setValue(newValue);
    
    this.elem.dispatchEvent(new CustomEvent('slider-change', {
      detail: this.value,
      bubbles: true
    }));
  }

  #onPointerMove(event) {
    if (!this.dragging) return;
    event.preventDefault();
    this.#moveToEvent(event);
  }

  #onPointerUp(event) {
    this.dragging = false;
    this.elem.classList.remove('slider_dragging');
    
    document.removeEventListener('pointermove', this.#onPointerMove.bind(this));
    
    const left = event.clientX - this.elem.getBoundingClientRect().left;
    const leftRelative = left / this.elem.offsetWidth;
    const leftRelativeClipped = Math.max(0, Math.min(1, leftRelative));
    const approximateValue = leftRelativeClipped * this.segments;
    const newValue = Math.round(approximateValue);
    
    this.#setValue(newValue);
    
    this.elem.dispatchEvent(new CustomEvent('slider-change', {
      detail: this.value,
      bubbles: true
    }));
  }

  #moveToEvent(event) {
    const left = event.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;
    
    if (leftRelative < 0) leftRelative = 0;
    if (leftRelative > 1) leftRelative = 1;
    
    const leftPercents = leftRelative * 100;

    const thumb = this.elem.querySelector('.slider__thumb');
    const progress = this.elem.querySelector('.slider__progress');
    
    thumb.style.left = `${leftPercents}%`;
    progress.style.width = `${leftPercents}%`;
    
    const approximateValue = leftRelative * this.segments;
    const currentValue = Math.round(approximateValue);
    
    this.#updateDisplay(currentValue);
  }

  #setValue(newValue) {
    if (newValue < 0 || newValue >= this.steps) return;
    
    this.value = newValue;
    
    const valuePercents = (newValue / this.segments) * 100;

    if (!this.dragging) {
      const thumb = this.elem.querySelector('.slider__thumb');
      const progress = this.elem.querySelector('.slider__progress');
      
      thumb.style.left = `${valuePercents}%`;
      progress.style.width = `${valuePercents}%`;
    }
    
    this.#updateDisplay(newValue);
  }

  #updateDisplay(value) {
    const valueElement = this.elem.querySelector('.slider__value');
    valueElement.textContent = value;
    const steps = this.elem.querySelectorAll('.slider__steps span');
    steps.forEach((step, index) => {
      if (index === value) {
        step.classList.add('slider__step-active');
      } else {
        step.classList.remove('slider__step-active');
      }
    });
  }
}