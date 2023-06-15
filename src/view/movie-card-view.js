// import { createElement } from '../render.js';
import AbstractView from '../framework/view/abstract-view.js';
import { humanizeTaskDueDate, DATE_FORMAT_Y } from '../utils.js';


/**
 * @description Шаблон карточки фильма
 * @returns {string}
 */
const createMovieCardTemplate = (movieInfo) => {
  const { filmInfo, comments, userDetails } = movieInfo;

  // Проверка на наличие даты
  const date = filmInfo.release.date !== null ? humanizeTaskDueDate(filmInfo.release.date, DATE_FORMAT_Y) : '';

  // Добавлен ли фильм в список для просмотра в будущем
  const watchlistClassName = userDetails.watchlist ? 'film-card__controls-item--active' : '';

  // Просмотрен ли фильм
  const alreadyWatchedClassName = userDetails.alreadyWatched ? 'film-card__controls-item--active' : '';

  // Находится ли фильм в избранном
  const favoriteClassName = userDetails.favorite ? 'film-card__controls-item--active' : '';

  // console.log(date)

  return (
    `
<article class="film-card">
  <a class="film-card__link">
    <h3 class="film-card__title">${filmInfo.title}</h3>
    <p class="film-card__rating">${filmInfo.totalRating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${date}</span>
      <span class="film-card__duration">${filmInfo.runtime}</span>
      <span class="film-card__genre">${filmInfo.genre}</span>
    </p>
    <img src=${filmInfo.poster} alt="${filmInfo.title}" class="film-card__poster">
    <p class="film-card__description">${filmInfo.description}</p>
    <span class="film-card__comments">${comments.length} comments</span>
  </a>
  <div class="film-card__controls">
    <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${watchlistClassName}" type="button" data-add-to-watchlist>Add to watchlist</button>
    <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${alreadyWatchedClassName}" type="button" data-mark-as-watched>Mark as watched</button>
    <button class="film-card__controls-item film-card__controls-item--favorite ${favoriteClassName}" type="button" data-mark-as-favorite>Mark as favorite</button>
  </div>
</article>
`
  );
};

export default class MovieCardView extends AbstractView {
  // #element = null;

  // Один обьект (фильм)
  #filmCard = null;

  // Передаем карточку фильма
  constructor(filmCard) {
    super();
    // Карточка фильма
    this.#filmCard = filmCard;
  }

  /**
   * @description Публичный метод добавляет обработчик события на элемент (открытие попапа при клике на карточку)
   */
  setMovieCardClickHandler = (callback) => {
    // Записали callback функцию в обьект, чтобы в дальнейшем можно было удалить обработчик события
    this._callback.clickOnMovieCard = callback;

    // На каждую карточку добавили обработчик события
    this.element.querySelector('.film-card__link')
      .addEventListener('click', this.#onMovieCardClick);
  };

  /**
   * @description Открытие попапа по клику на фильм
   * @param {object} evt
   */
  #onMovieCardClick = (evt) => {
    evt.preventDefault();

    // В функцию обработчик, параметром передаём карточку фильма
    // this._callback.click = #openFilmDetailsPopup(filmCard)
    // !!! this.#filmCard - содержит карточку фильма по которой кликнул пользователь
    this._callback.clickOnMovieCard(this.#filmCard);
  };

  /**
   * @description Метод для добавления обработчика на элемент (кнопка 'Добавить фильм в список будущих просмотров')
   * @param {Function} callback
   */
  setWatchlistClickHandler = (callback) => {
    this._callback.clickOnWatchlistBtn = callback;

    this.element.querySelector('[data-add-to-watchlist]')
      .addEventListener('click', this.#onWatchlistBtnClick);
  };

  /**
   * @description Функция обработчик события 'Добавить фильм в просмотренные'
   */
  #onWatchlistBtnClick = () => {
    this._callback.clickOnWatchlistBtn();
  };

  /**
   * @description Метод для добавления обработчика на элемент (кнопка 'Добавить фильм в список будущих просмотров')
   * @param {Function} callback
   */
  setAlreadyWatchedClickHandler = (callback) => {
    this._callback.clickOnAlreadyWatchedBtn = callback;

    this.element.querySelector('[data-mark-as-watched]')
      .addEventListener('click', this.#onAlreadyWatchedBtnClick);
  };

  /**
   * @description Функция обработчик события 'Добавить фильм в просмотренные'
   */
  #onAlreadyWatchedBtnClick = () => {
    this._callback.clickOnAlreadyWatchedBtn();
  };

  /**
   * @description Метод для добавления обработчика на элемент (кнопка 'Добавить фильм в избранное')
   * @param {Function} callback
   */
  setFavoriteClickHandler = (callback) => {
    this._callback.clickOnFavoriteBtn = callback;

    this.element.querySelector('[data-mark-as-favorite]')
      .addEventListener('click', this.#onFavoriteBtnClick);
  };

  /**
   * @description Функция обработчик события 'Добавить фильм в избранное'
   */
  #onFavoriteBtnClick = () => {
    this._callback.clickOnFavoriteBtn();
  };

  get template() {
    return createMovieCardTemplate(this.#filmCard);
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

/*
!!! ============= !!! Небольшое пояснение к view-шке
Шаблон карточки фильма - разметка

Отвечает за добавление обработчиков событий на элементы - только на те элементы, которые относятся к шаблону данного View


Добавление обработчика события - нажатие по кнопке 'Добавить в избранное'

- Создаём публичный метод для добавления обработчика на нужный нам элемент с параметром в который принимаем колбек функцию.
- Колбек функцию записываем в созданный заранее обьект (_callback) с ключом click, чтобы была возможность в дальнейшем удалить эту колбек функцию.... все дело в передачи функции и сохранении ссылки на неё.
- Создаём функцию обработчик по клику и вызываем уже в этой функции обработчик события

- В презентере карточки фильма описываем логику по нажатию кнопки и эту функцию(метод) передаём колбеком через публичный метод view-шки карточки фильма

Логика.
- При нажатии на кнопку - считываем карточку по которой кликнули и id этой карточки


*/
