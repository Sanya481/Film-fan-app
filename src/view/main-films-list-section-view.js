// import { createElement } from '../render.js';
import AbstractView from '../framework/view/abstract-view';

const createMainFilmsListSectionTemplate = () =>
  `
<section class="films-list">
  <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
</section>
`;

export default class MainFilmsListSectionView extends AbstractView {
  // #element = null;

  get template() {
    return createMainFilmsListSectionTemplate();
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
