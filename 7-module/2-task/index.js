import createElement from '../../assets/lib/create-element.js';

class Modal {
  constructor() {
    this.render();
    this._keydownHandler = null; 
  }
  
  render() {
    this.elem = createElement(`
      <div class="modal">
        <div class="modal__overlay"></div>
        <div class="modal__inner">
          <div class="modal__header">
            <button type="button" class="modal__close">
              <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
            </button>
            <h3 class="modal__title"></h3>
          </div>
          <div class="modal__body"></div>
        </div>
      </div>
    `);
  }
  
  open() {
    document.body.append(this.elem);
    document.body.classList.add('is-modal-open');
    
    this._keydownHandler = (event) => {
      if (event.code === 'Escape') {
        this.close();
      }
    };
    document.addEventListener('keydown', this._keydownHandler);
    
    this.elem.querySelector('.modal__close').addEventListener('click', () => {
      this.close();
    });
  }
  
  close() {
    if (this.elem) {
      this.elem.remove();
    }
    
    document.body.classList.remove('is-modal-open');
    
    if (this._keydownHandler) {
      document.removeEventListener('keydown', this._keydownHandler);
    }
  }
  
  setTitle(title) {
    const titleElem = this.elem.querySelector('.modal__title');
    if (titleElem) {
      titleElem.textContent = title;
    }
  }
  
  setBody(node) {
    const bodyElem = this.elem.querySelector('.modal__body');
    if (bodyElem) {
      bodyElem.innerHTML = '';
      bodyElem.append(node);
    }
  }
}

export default Modal;
