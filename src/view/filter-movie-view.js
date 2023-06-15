// import { createElement } from '../render.js';

import { FilterType } from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';

/**
 * @description Название класса, который добавляется при нажатии на фильтр
 */
const filterActiveClassName = 'main-navigation__item--active';

/**
 * @description Общее количество фильмов добавленное в приложение (отоброжается в подвале)
 * @returns {string}
 */
const createMainNavTemplate = (movies, filterMovieType) => {
  console.log(filterMovieType)
  // console.log(movies)

  const watchlist = movies.filter((movie) => movie.userDetails.watchlist === true);
  const alreadyWatched = movies.filter((movie) => movie.userDetails.alreadyWatched === true);
  const favorite = movies.filter((movie) => movie.userDetails.favorite === true);

  return (
    `
<nav class="main-navigation">
  <a href="#all" class="main-navigation__item main-navigation__item--active ${FilterType.DEFAULT === filterMovieType ? filterActiveClassName : ''}" data-filter-type="${FilterType.DEFAULT}">All movies</a>
  <a href="#watchlist" class="main-navigation__item ${FilterType.WATCHLIST === filterMovieType ? filterActiveClassName : ''}" data-filter-type="${FilterType.WATCHLIST}">
    Watchlist
    <span class="main-navigation__item-count">${watchlist.length}</span>
  </a>
  <a href="#history" class="main-navigation__item ${FilterType.ALREADYWATCHED === filterMovieType ? filterActiveClassName : ''}" data-filter-type="${FilterType.ALREADYWATCHED}">
    History
    <span class="main-navigation__item-count">${alreadyWatched.length}</span>
  </a>
  <a href="#favorites" class="main-navigation__item ${FilterType.FAVOURITES === filterMovieType ? filterActiveClassName : ''}" data-filter-type="${FilterType.FAVOURITES}">
    Favorites
   <span class="main-navigation__item-count">${favorite.length}</span>
  </a>
</nav>
  `);
};

export default class FilterMovieView extends AbstractView {
  // #element = null;
  filterMovieType;

  #value;

  constructor(movies) {
    super();
    this.movies = movies;
    // console.log(movies)
    // this.#filterType = filterType;
  }

  get value() {
    return this.#value;
  }

  set value(newValue) {
    this.#value = newValue;
  }

  /**
   * @description Публичный метод для установки обработчика на элемент и передачи колбек функции
   * @param {Function} callback
   */
  setFilterListClickHandler = (callback) => {
    this._callback.click = callback;

    // Используем один обработчик и делегирование
    this.element.addEventListener('click', this.#onFilterBtnClick);
  };

  /**
   * @description !!! Функция должна быть стрелочная, иначе this._callback.click будет undefined
   * @param {object} evt
   * @returns Если клик был НЕ по ссылке (типу фильтра) - выходим из функции
   */
  #onFilterBtnClick = (evt) => {
    // Добавим проверку на тег "а", чтобы клики по блоку фильтрации не вызывали колбэк
    if (evt.target.tagName !== 'A') {
      return;
    }

    evt.preventDefault();

    // Находим элемент с активным классом и убираем его
    this.element.querySelector('.main-navigation__item--active')
      .classList.remove('main-navigation__item--active');
    // Добавляем класс active активному элементу
    evt.target.classList.toggle('main-navigation__item--active');

    this.value = evt.target.dataset.filterType;
    // console.log(this)
    this._callback.click(evt.target.dataset.filterType);
  };

  get template() {
    return createMainNavTemplate(this.movies);
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
