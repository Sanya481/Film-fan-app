import { createElement } from '../render.js';

/**
 * @description Шаблон разметки общего контейнера для фильмов
 * @returns {string}
 */
const createCommonFilmsSectionTemplate = () =>
  `
  <section class="films">

  </section>
`;

export default class CommonFilmsSectionView {

  getTemplate() {
    return createCommonFilmsSectionTemplate();
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
