import { createElement } from '../render.js';

/**
 * @description Общее количество фильмов добавленное в приложение (отоброжается в подвале)
 * @returns {string}
 */
const createTotalQuantityFilmsTemplate = () =>' <p>30 movies inside</p> ';

export default class TotalQuantityFilmsView {
  #element = null;

  get template() {
    return createTotalQuantityFilmsTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
