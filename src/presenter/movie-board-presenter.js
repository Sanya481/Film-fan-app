import CommonFilmsSectionView from '../view/common-films-section-view.js';
import MainFilmsListSectionView from '../view/main-films-list-section-view.js';
import MovieCardContainerView from '../view/movie-card-container-view.js';
import ShowMoreBtnView from '../view/show-more-btn-view.js';
import EmptyFilmListView from '../view/empty-film-list.js';
// import FilmDetailsView from '../view/film-details-view.js';
import ListSortView from '../view/list-sort-view.js';
// import MovieCardView from '../view/movie-card-view.js';

// import { render } from '../render.js';
import { render, remove } from '../framework/render.js';

import FilmDetailsPopupPresenter from './film-details-popup-presenter.js';

import MovieCardPresenter from './movie-card-presenter.js';

const body = document.body;

/**
 * Количество фильмов при загрузке страницы и количество добавляемых фильмов при нажатии  на кнопку 'Показать ещё'
 * @param {number}
 */
const MOVIE_CARD_PER_STEP = 5;

// !!! Методы класса советую читать снизу вверх
// Главный презентер
export default class MovieBoardPresenter {

  // !!! Прототипы классов идут в порядке расположения в DOM
  // Сортировка
  listSortView = new ListSortView();
  // Главный (общий) section для фильмов
  commonFilmsSectionView = new CommonFilmsSectionView();
  // section с основными фильмами
  #mainFilmsListSectionView = new MainFilmsListSectionView();
  // Куда отрисовываем карточки с фильмами (контейнер для фильмов)
  movieCardContainerView = new MovieCardContainerView();
  // Заглушка при отсутствии фильмов
  emptyFilmListView = new EmptyFilmListView();
  // Кнопка 'показать ещё'
  #showMoreBtnView = new ShowMoreBtnView();
  // Попап фильма
  // filmDetailsComponent = new FilmDetailsPresenter();

  /**
  * Счётчик отрисовки фильмов (по умолчанию при загрузке страницы показывается 5 карточек) *
  * @param {number}
  */
  #renderFilmCardCount = MOVIE_CARD_PER_STEP;

  filmDetailsPopupPresenter = null;
  #filmCardComponent = null;
  #filmDetailsView = null;
  #movieCardPresenter = null;

  // Контейнер для отрисовки
  #filmsContainer = null;
  // Обьект с информацией о фильме
  #filmCardInfo = null;

  #movieCardsInfo = [];
  #userComments = [];

  /* Map - коллекция для хранения данных любого типа в виде пар [ключ, значение], то есть каждое значение сохраняется по уникальному ключу, который потом используется для доступа к этому значению. Причём в качестве ключей тоже принимаются значения любого типа. */
  /*
  Заведем свойство #moviePresenters, где Board-презентер будет хранить ссылки на все MovieCardPresenter-ы
  */
  #moviePresenters = new Map();
  // console.log()

  /**
   * @param {HTMLElement} filmsContainer - в каком месте в DOM отрисовываем элемент
   * @param {object} filmCardInfo - обьект с данными о фильме и комментариями (прототип класса FilmCardInfoModel)
   */
  constructor(filmsContainer, filmCardInfo) {
    this.#filmsContainer = filmsContainer;

    // filmCardInfo записываем в свойство класса
    this.#filmCardInfo = filmCardInfo;
  }

  /**
   * @description Показ карточек по клику на кнопку 'Показать ещё'
   */
  #onLoadMoreFilmCard = () => {
    this.#movieCardsInfo
      .slice(this.#renderFilmCardCount, this.#renderFilmCardCount + MOVIE_CARD_PER_STEP)
      .forEach((movieCard) => this.#renderFilmCard(movieCard, this.#userComments));

    this.#renderFilmCardCount += MOVIE_CARD_PER_STEP;

    /* Если значение счётчика больше, чем общее количество карточек - удали кнопку 'Показать ещё' */
    if (this.#renderFilmCardCount >= this.#movieCardsInfo.length) {
      remove(this.#showMoreBtnView);
    }
  };

  /**
   * @description Отрисовка кнопки 'Показать ещё'
   */
  #renderShowMoreButton() {
    // Если количество фильмов > 5, показываем кнопку 'показать ещё'
    if (this.#movieCardsInfo.length > MOVIE_CARD_PER_STEP) {

      /*  Запишем функцию обработчика события по показу дополнительных фильмов в обьект и присвоим функции ключ onClick, (передача функции обработчика с помощью обьекта происходит на месте, а не в классе) - передадим функцию в класс ShowMoreBtnView */

      // !!! Передаем функцию обработчик через конструктор
      // this.#showMoreBtnView = new ShowMoreBtnView({
      //   onClick: this.#onLoadMoreFilmCard
      // });
      // !!! Передаем функцию обработчик через публичный метод
      this.#showMoreBtnView.setShowMoreBtnClickHandler(this.#onLoadMoreFilmCard);

      render(this.#showMoreBtnView, this.#mainFilmsListSectionView.element);

      this.#clearFilmsList();
    }
  }

  /**
   * @description Метод проверяет, открыт ли попап фильма.
   */
  #isFilmDetailsPopupOpen = () => {
    if (this.filmDetailsPopupPresenter !== null) {
      this.filmDetailsPopupPresenter.destroy();
      this.filmDetailsPopupPresenter = null;
    }
  };

  /**
   * @description Открытие попапа фильма при клике на карточку
   * @param {object} filmCard - карточка фильма
   */
  #openFilmDetailsPopup = (filmCard) => {
    this.#isFilmDetailsPopupOpen();

    this.filmDetailsPopupPresenter = new FilmDetailsPopupPresenter();

    this.filmDetailsPopupPresenter.init(filmCard, this.#userComments, body);
  };

  /**
   * @description Отрисовка одной карточки фильма
   * @param {Object} filmCard - карточка фильма
   */
  #renderFilmCard = (filmCard) => {
    this.#movieCardPresenter = new MovieCardPresenter(
      this.movieCardContainerView.element,
      this.#openFilmDetailsPopup
    );

    this.#movieCardPresenter.init(filmCard);

    // Ключами для презентеров сделаем id фильма
    this.#moviePresenters.set(filmCard.id, this.#movieCardPresenter);
  };

  /**
   * @description Метод рендерит карточки фильмов на страницу внутри себя вызывая метод renderFilmCard
   */
  #renderFilms() {
    /* Math.min(this.#movieCardsInfo.length, MOVIE_CARD_PER_STEP) - подстраховываемся в отрисовке фильмов (если фильмов с сервера придёт меньше 5, то отрисуется то количество, которое пришло, а не 5) */
    for (let i = 0; i < Math.min(this.#movieCardsInfo.length, MOVIE_CARD_PER_STEP); i++) {
      this.#renderFilmCard(this.#movieCardsInfo[i], this.#userComments);
    }
  }

  /**
   * @description Для дальнейшей работы - сортировки и фильтрации - нам нужно научить наш презентер очищать список фильмов
   */
  #clearFilmsList() {
    // Для очистки списка фильмов будем последовательно вызывать destroy у всех MovieCardPresenter-ов...
    this.#moviePresenters.forEach((presenter) => presenter.destroy());
    // ...а после очистим всю Map, чтобы "убить" ссылки на MovieCardPresenter-ы, чтобы сборщик мусора их собрал.
    this.#moviePresenters.clear();
    this.#renderFilmCardCount = MOVIE_CARD_PER_STEP;
    remove(this.#showMoreBtnView);
  }

  /**
   * @description Метод рендерит общий контейнер для списка фильмов
   */
  #renderFilmsContainer() {
    render(this.commonFilmsSectionView, this.#filmsContainer);
    render(this.#mainFilmsListSectionView, this.commonFilmsSectionView.element);
    render(this.movieCardContainerView, this.#mainFilmsListSectionView.element);
  }

  /**
   * @description Метод рендерит заглушку в случае отсутствия фильмов
   * !!! Хороший тон кода - один метод одно действие (разделение кода на методы)
   */
  #renderNoFilms() {
    render(this.emptyFilmListView, this.#filmsContainer);
  }

  /**
   * @description Выделим весь код, что отвечает за отрисовку приложения в отдельный метод
   * @param {HTMLElement} boardContainer - место в DOM куда отрисовываем элемент
   */
  #renderBoard = (boardContainer) => {
    // Отрисовываем карточки фильмов на страницу

    // Если фильмов с сервера не пришло...
    if (this.#movieCardsInfo.length === 0) {
      // ... отрисовываем заглушку в случае отсутствия фильмов
      this.#renderNoFilms();
      return;
    }

    // !!! Отрисовка идет по очереди (сверху - вниз)
    // Отрисовываем структуру DOM дерева
    render(this.listSortView, boardContainer);

    // Отрисовка контейнера для списка фильмов
    this.#renderFilmsContainer();

    // Отрисовка карточек фильмов
    this.#renderFilms();
    // Отрисовка кнопки 'Показать ещё'
    this.#renderShowMoreButton();
  };

  /**
   * @description Инициализация Presenter-а и отрисовка карточек фильмов используя приватный метод класса #renderBoard
   */
  init = () => {
    // Карточки фильмов получили из модели передав в конструктор класса MovieCardPresenter
    this.#movieCardsInfo = [...this.#filmCardInfo.filmCards];

    // Комментарии к фильмам получили из модели передав в конструктор класса MovieCardPresenter
    this.#userComments = [...this.#filmCardInfo.userComments];

    // console.log(this.#movieCardsInfo);
    // console.log(this.#userComments);

    // Отрисовка элементов интерфейса приложения
    this.#renderBoard(this.#filmsContainer);
  };
}
