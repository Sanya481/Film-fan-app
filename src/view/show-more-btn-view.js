/* !!! Во View происходит навешивание обработчика событий на элемент, который присутствует в шаблоне данного View и передача callback функции из Presenter-а, которая будет обрабатывать это событие.*/

/* Передача функции может происходить через конструктор класса, если мы завели конструктор и передаем callback таким способом или через публичный метод класса (в качестве параметра этого метода выступает callback функция переданная из Presenter-а ) */

// import { createElement } from '../render.js';
import AbstractView from '../framework/view/abstract-view';

/**
 * @description Шаблон кнопки - "Показать ещё"
 * @returns {string}
 */
const createShowMoreBtn = () =>
  `
  <button class="films-list__show-more">Show more</button>
`;

export default class ShowMoreBtnView extends AbstractView {
  // #element = null;
  // #onClickBtn = null;

  // !!! Передача callback функции обработчика события происходит через конструктор класса
  // constructor({ onClick }) {
  //   super();
  //   // Функцию записываем во внутренне свойство
  //   this.#onClickBtn = onClick;
  //   // В addEventListener передадим абстрактный обработчик
  //   this.element.addEventListener('click', this.#onClickShowMoreBtn);
  // }


  // !!! Передача callback функции обработчика события через публичный метод
  /**
   * @description Публичный метод для навешивания обработчика события на кнопку "Показать ещё"
   * @param {function} callback
   */
  setShowMoreBtnClickHandler(callback) {
    this._callback.click = callback;

    this.element.addEventListener('click', this.#onClickShowMoreBtn);
  }

  /**
   * @description Абстрактный обработчик класса по нажатию на кнопку
   */
  #onClickShowMoreBtn = () => {
    // А внутри абстрактного обработчика вызовем функцию
    // this.#onClickBtn();

    this._callback.click();
  };

  get template() {
    return createShowMoreBtn;
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
