import { createElement } from '../render.js';

/**
 * @description Шаблон для карточек фильма
 * @returns {string}
 */
const createMovieCardContainerTemplate = () =>
  `
  <div class="films-list__container">

  </div>
`;

export default class MovieCardContainerView {
  #element = null;

  get template() {
    return createMovieCardContainerTemplate();
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
