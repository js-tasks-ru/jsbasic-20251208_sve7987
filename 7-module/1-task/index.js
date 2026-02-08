import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.render();
    this.addEventListeners();
    this.updateArrows(); 
  }

  render() {
    const categoriesHTML = this.categories.map((category, index) => {
      const activeClass = index === 0 ? 'ribbon__item_active' : '';
      return `<a href="#" class="ribbon__item ${activeClass}" data-id="${category.id}">${category.name}</a>`;
    }).join('');
    
    this.elem = createElement(`
      <div class="ribbon">
        <button class="ribbon__arrow ribbon__arrow_left">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
        <nav class="ribbon__inner">
          ${categoriesHTML}
        </nav>
        <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
      </div>
    `);
  }

  addEventListeners() {
    this.ribbonInner = this.elem.querySelector('.ribbon__inner');
    this.arrowLeft = this.elem.querySelector('.ribbon__arrow_left');
    this.arrowRight = this.elem.querySelector('.ribbon__arrow_right');

    const categoryItems = this.elem.querySelectorAll('.ribbon__item');
    
    categoryItems.forEach(item => {
      item.addEventListener('click', (event) => {
        event.preventDefault(); 
        
        const activeItems = this.elem.querySelectorAll('.ribbon__item_active');
        activeItems.forEach(activeItem => {
          activeItem.classList.remove('ribbon__item_active');
        });
        
        event.currentTarget.classList.add('ribbon__item_active');
        
        const categoryId = event.currentTarget.dataset.id;
        const ribbonSelectEvent = new CustomEvent('ribbon-select', {
          detail: categoryId,
          bubbles: true 
        });
        
        this.elem.dispatchEvent(ribbonSelectEvent);
      });
    });
    
    this.arrowRight.addEventListener('click', () => {
      this.ribbonInner.scrollBy(350, 0); 
    });
    
    this.arrowLeft.addEventListener('click', () => {
      this.ribbonInner.scrollBy(-350, 0); 
    });
    
    this.ribbonInner.addEventListener('scroll', () => {
      this.updateArrows();
    });
  }

  updateArrows() {
    const scrollLeft = this.ribbonInner.scrollLeft;
    const scrollWidth = this.ribbonInner.scrollWidth;
    const clientWidth = this.ribbonInner.clientWidth;
    
    const scrollRight = scrollWidth - scrollLeft - clientWidth;
    
    if (scrollLeft === 0) {
      this.arrowLeft.classList.remove('ribbon__arrow_visible');
    } else {
      this.arrowLeft.classList.add('ribbon__arrow_visible');
    }
    
    if (scrollRight < 1) {
      this.arrowRight.classList.remove('ribbon__arrow_visible');
    } else {
      this.arrowRight.classList.add('ribbon__arrow_visible');
    }
  }
}