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

  getTemplate() {
    return createMovieCardContainerTemplate();
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
