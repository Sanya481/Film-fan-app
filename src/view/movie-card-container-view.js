// import { createElement } from '../render.js';
import AbstractView from '../framework/view/abstract-view';

/**
 * @description Шаблон для карточек фильма
 * @returns {string}
 */
const createMovieCardContainerTemplate = () =>
  `
  <div class="films-list__container">

  </div>
`;

export default class MovieCardContainerView extends AbstractView {
  // #element = null;

  get template() {
    return createMovieCardContainerTemplate();
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
