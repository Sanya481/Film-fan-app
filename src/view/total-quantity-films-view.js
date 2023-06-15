// import { createElement } from '../render.js';
import AbstractView from '../framework/view/abstract-view';

/**
 * @description Общее количество фильмов добавленное в приложение (отоброжается в подвале)
 * @param {number} moviesCount - Общее количество фильмов
 * @returns {string}
 */
const createTotalQuantityFilmsTemplate = (movies) => `<p>${movies} movies inside</p>`;

export default class TotalQuantityFilmsView extends AbstractView {
  // #element = null;
  #moviesCount;

  /**
   * @param {number} moviesCount - Общее количество фильмов
   */
  constructor(moviesCount) {
    super();
    this.#moviesCount = moviesCount;
  }

  get template() {
    return createTotalQuantityFilmsTemplate(this.#moviesCount);
  }

  // get element() {
  //   if (!this.#element) {
  //     this.#element = createElement(this.template);
  //   }

  //   return this.#element;
  // }

  // removeElement() {
  //   this.#element = null;
  // }
}

/* !!! Должен принимать массив со всеми фильмами для отрисовки общего количества */
