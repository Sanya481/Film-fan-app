// import { createElement } from '../render.js';
import AbstractView from '../framework/view/abstract-view';

/**
 * @description Шаблон разметки общего контейнера для фильмов
 * @returns {string}
 */
const createCommonFilmsSectionTemplate = () =>
  `
  <section class="films">

  </section>
`;

export default class CommonFilmsSectionView extends AbstractView {
  // #element = null;

  get template() {
    return createCommonFilmsSectionTemplate();
  }

  /* !!! Все повторяющиеся методы у классов вынесли в отдельный класс AbstractView */

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
