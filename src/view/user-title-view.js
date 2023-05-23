// import { createElement } from '../render.js';
import AbstractView from '../framework/view/abstract-view';

/**
 * @description Шаблон разметки (звание пользователя)
 * @returns {HTMLElement} - шаблонная строка с html
 */
const createUserTitleTemplate = () =>
  `
<section class="header__profile profile">
  <p class="profile__rating">Movie Buff</p>
  <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
</section>
`;

export default class UserTitleView extends AbstractView {
  // #element = null;

  /**
   * @description Метод, чтобы получить шаблон разметки
   * @returns {HTMLElement} - шаблон разметки
   */
  get template() {
    return createUserTitleTemplate();
  }

  // /**
  //  * @description Метод позволяет на основе шаблона создать DOM элемент
  //  * @returns {HTMLElement} - обьект DOM дерева (html разметка)
  //  */
  // get element() {
  //   // Если уже этот элемент создан, то просто возвращаем его
  //   if (!this.#element) {
  //     this.#element = createElement(this.template);
  //   }

  //   return this.#element;
  // }

  // /**
  //  * Метод для удаления элемента
  //  */
  // removeElement() {
  //   this.#element = null;
  // }
}
