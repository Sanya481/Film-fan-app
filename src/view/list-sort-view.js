// import { createElement } from '../render.js';
import AbstractView from '../framework/view/abstract-view';

import { SortType } from '../const.js';

/**
 * @description Шаблон разметки (фильтры)
 * @returns {HTMLElement} - шаблонная строка с html
 */
const createListSortTemplate = () =>
  `
  <ul class="sort">
    <li><a href="#" class="sort__button sort__button--active" data-sort-type=${SortType.DEFAULT}>Sort by default</a></li>
    <li><a href="#" class="sort__button" data-sort-type=${SortType.DATE}>Sort by date</a></li>
    <li><a href="#" class="sort__button" data-sort-type=${SortType.RATING}>Sort by rating</a></li>
  </ul>
`;

export default class ListSortView extends AbstractView {
  // #element = null;

  setSortTypeChangeHandler = (callback) => {
    this._callback.click = callback;

    // Используем один обработчик и делегирование
    this.element.addEventListener('click', this.#onSortTypeChange);
  };

  #onSortTypeChange = (evt) => {
    // Добавим проверку на тег "а", чтобы клики по блоку сортировки не вызывали колбэк
    if (evt.target.tagName !== 'A') {
      return;
    }

    evt.preventDefault();

    // Находим элемент с активным классом и убираем его
    this.element.querySelector('.sort__button--active')
      .classList.remove('sort__button--active');
    // Добавляем класс active активному элементу
    evt.target.classList.toggle('sort__button--active');

    this._callback.click(evt.target.dataset.sortType);
  };

  get template() {
    return createListSortTemplate();
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
