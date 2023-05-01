import { createElement } from '../render.js';

/**
 * @description Общее количество фильмов добавленное в приложение (отоброжается в подвале)
 * @returns {string}
 */
const createMainNavTemplate = () =>
  `
<nav class="main-navigation">
  <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
  <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">13</span></a>
  <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">4</span></a>
  <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">8</span></a>
</nav>
  `;

export default class MainNavigationView {
  #element = null;

  get template() {
    return createMainNavTemplate();
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