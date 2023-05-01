import { createElement } from '../render.js';

/**
 * @description Шаблон разметки (фильтры)
 * @returns {HTMLElement} - шаблонная строка с html
 */
const createListSortTemplate = () =>
  `
  <ul class="sort">
    <li><a href="#" class="sort__button">Sort by default</a></li>
    <li><a href="#" class="sort__button">Sort by date</a></li>
    <li><a href="#" class="sort__button sort__button--active">Sort by rating</a></li>
  </ul>
`;

export default class ListSortView {
  #element = null;

  get template() {
    return createListSortTemplate();
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
