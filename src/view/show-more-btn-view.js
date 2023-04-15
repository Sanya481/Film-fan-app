import { createElement } from '../render.js';

/**
 * @description Шаблон кнопки - "Показать ещё"
 * @returns {string}
 */
const createShowMoreBtn = () =>
  `
  <button class="films-list__show-more">Show more</button>
`;

export default class ShowMoreBtnView {

  getTemplate() {
    return createShowMoreBtn;
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
