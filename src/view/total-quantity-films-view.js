import { createElement } from '../render.js';

/**
 * @description Общее количество фильмов добавленное в приложение (отоброжается в подвале)
 * @returns {string}
 */
const createTotalQuantityFilmsTemplate = () =>' <p>30 movies inside</p> ';

export default class TotalQuantityFilmsView {

  getTemplate() {
    return createTotalQuantityFilmsTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
