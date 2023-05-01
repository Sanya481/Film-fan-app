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
  #element = null;

  get template() {
    return createCommonFilmsSectionTemplate();
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
