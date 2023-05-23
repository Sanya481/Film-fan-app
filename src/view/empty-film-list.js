// import { createElement } from '../render';
import AbstractView from '../framework/view/abstract-view';

/**
 * @description Заглушка при отсутствии фильмов
 * <!--
        Значение отображаемого текста зависит от выбранного фильтра:
          * All movies – 'There are no movies in our database'
          * Watchlist — 'There are no movies to watch now';
          * History — 'There are no watched movies now';
          * Favorites — 'There are no favorite movies now'.
      -->
 * @returns {string}
 */
const createEmptyFilmListTemplate = () => (
  `
<section class="films">
    <section class="films-list">
      <h2 class="films-list__title">There are no movies in our database</h2>
    </section>
  </section>
  `
);

export default class EmptyFilmListView extends AbstractView {
  // #element = null;

  get template() {
    return createEmptyFilmListTemplate();
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
