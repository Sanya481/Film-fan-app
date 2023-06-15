import CommonFilmsSectionView from '../view/common-films-section-view.js';
import MainFilmsListSectionView from '../view/main-films-list-section-view.js';
import MovieCardContainerView from '../view/movie-card-container-view.js';
import ShowMoreBtnView from '../view/show-more-btn-view.js';
import EmptyFilmListView from '../view/empty-film-list.js';
// import FilmDetailsView from '../view/film-details-view.js';
import ListSortView from '../view/list-sort-view.js';
// import MovieCardView from '../view/movie-card-view.js';
import TotalQuantityFilmsView from '../view/total-quantity-films-view.js';

import { sortFilmDateDown, updateItem } from '../utils.js';

// import { render } from '../render.js';
import { render, remove, replace } from '../framework/render.js';

import FilmDetailsPopupPresenter from './film-details-popup-presenter.js';

import MovieCardPresenter from './movie-card-presenter.js';

import FilterMovieView from '../view/filter-movie-view.js';
import FilterMoviePresenter from './filter-movies-presenter.js';

import { FilterType } from '../const.js';

import { SortType } from '../const.js';


const body = document.body;

/**
 * Main сайта
 */
const siteMainElement = document.querySelector('.main');

/**
 * @description Секция со статистикой по фильмам - общее количество фильмов в подвале сайта
 */
const footerFilmStatistics = document.querySelector('.footer__statistics');

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
  // #totalQuantityFilmsView;

  filterMovieView = null;

  // Выбранный тип фильтра по умолчанию
  #currentFilterType = FilterType.DEFAULT;

  // Выбранный тип сортировки по умолчанию
  #currentSortType = SortType.DEFAULT;

  #FilterMoviePresenter;

  // Контейнер для отрисовки
  #filmsContainer = null;
  // Обьект с информацией о фильме
  #filmCardInfo = null;

  // Карточки фильмов
  #originalMovieCardsInfo = [];
  // Копия карточек фильмов для фильтрации и сортировки
  #copyMovieCardsInfo = [];
  // Все комменты к фильмам
  #userComments = [];


  /* Map - коллекция для хранения данных любого типа в виде пар [ключ, значение], то есть каждое значение сохраняется по уникальному ключу, который потом используется для доступа к этому значению. Причём в качестве ключей тоже принимаются значения любого типа. */
  /*
  Заведем свойство #moviePresenters, где Board-презентер будет хранить ссылки на все MovieCardPresenter-ы
  */
  moviePresenters = new Map();
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
   * @description Заведем функцию сортировки
   * @param {string} movieSortType - тип сортировки
   */
  #sortFilms = (movieSortType) => {
    // метод sort() не создает новый объект Array, а производит сортировку переданного массива

    // Опишем switch-блок с функциями сортировки
    switch (movieSortType) {
      case SortType.DATE:
        this.#originalMovieCardsInfo.sort(sortFilmDateDown);
        break;
      case SortType.RATING:
        this.#originalMovieCardsInfo.sort((movieCardA, movieCardB) => movieCardB.filmInfo.totalRating - movieCardA.filmInfo.totalRating);

        // this.listSortView.element.querySelector(`[data-sort-type='${movieSortType}']`).classList.toggle('sort__button--active');
        break;
      default:
        // когда пользователь захочет "вернуть всё, как было",
        // мы просто запишем в originalMovieCardsInfo копию исходного массива
        this.#originalMovieCardsInfo = [...this.#copyMovieCardsInfo];
    }

    this.#currentSortType = movieSortType;
  };

  /**
   * @description Обработчик события по нажатию выбранной сортировки
   * @param {string} sortType
   */
  #handleSortTypeChange = (sortType) => {
    // Опишем в обработчике условие-оптимизацию, которое защитит от лишних перерисовок
    if (this.#currentSortType === sortType) {
      return;
    }

    // Сотрируем список
    this.#sortFilms(sortType);
    // - Очищаем список
    this.#clearFilmsList();
    // - Рендерим список заново
    this.#renderFilms();
  };

  /**
   * @description Отрисовка типов сортировки фильмов
   */
  #renderSortList = () => {
    this.listSortView.setSortTypeChangeHandler(this.#handleSortTypeChange);

    render(this.listSortView, this.#filmsContainer);
  };

  /**
   * @description Показ карточек по клику на кнопку 'Показать ещё'
   */
  #onLoadMoreFilmCard = () => {
    this.#originalMovieCardsInfo
      .slice(this.#renderFilmCardCount, this.#renderFilmCardCount + MOVIE_CARD_PER_STEP)
      .forEach((movieCard) => this.#renderFilmCard(movieCard, this.#userComments));

    this.#renderFilmCardCount += MOVIE_CARD_PER_STEP;

    /* Если значение счётчика больше, чем общее количество карточек - удали кнопку 'Показать ещё' */
    if (this.#renderFilmCardCount >= this.#originalMovieCardsInfo.length) {
      remove(this.#showMoreBtnView);
    }
  };

  /**
   * @description Отрисовка кнопки 'Показать ещё'
   */
  #renderShowMoreButton() {
    // Если количество фильмов > 5, показываем кнопку 'показать ещё'
    if (this.#originalMovieCardsInfo.length > MOVIE_CARD_PER_STEP) {

      /*  Запишем функцию обработчика события по показу дополнительных фильмов в обьект и присвоим функции ключ onClick, (передача функции обработчика с помощью обьекта происходит на месте, а не в классе) - передадим функцию в класс ShowMoreBtnView */

      // !!! Передаем функцию обработчик через конструктор
      // this.#showMoreBtnView = new ShowMoreBtnView({
      //   onClick: this.#onLoadMoreFilmCard
      // });
      // !!! Передаем функцию обработчик через публичный метод
      this.#showMoreBtnView.setShowMoreBtnClickHandler(this.#onLoadMoreFilmCard);

      render(this.#showMoreBtnView, this.#mainFilmsListSectionView.element);

      // this.#clearFilmsList();
    }
  }

  /**
   * @description Перерисовка элемента.
   * @param {object} updatedMovie
   */
  rerenderMovieCard = (updatedMovie) => {
    // console.log(updatedMovie);
    // console.log(this.#originalMovieCardsInfo);
    console.log('ДО this.#originalMovieCardsInfo', this.#originalMovieCardsInfo);

    this.#originalMovieCardsInfo = updateItem(this.#originalMovieCardsInfo, updatedMovie);
    console.log('updatedMovie', updatedMovie);

    console.log('this.#originalMovieCardsInfo', this.#originalMovieCardsInfo);

    this.moviePresenters.get(updatedMovie.id).updateMovieCard(updatedMovie);
    // console.log(this.moviePresenters.get(updatedMovie.id));

    this.updateFilterView();
  };

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

    this.filmDetailsPopupPresenter = new FilmDetailsPopupPresenter({ onMovieChange: this.rerenderMovieCard });

    // console.log(this.moviePresenters)

    this.filmDetailsPopupPresenter.init(filmCard, this.#userComments, body);
  };

  /**
   * @description Отрисовка одной карточки фильма
   * @param {Object} filmCard - карточка фильма
   */
  #renderFilmCard = (filmCard) => {
    this.#movieCardPresenter = new MovieCardPresenter(
      this.movieCardContainerView.element,
      this.#openFilmDetailsPopup,
      { onMovieChange: this.rerenderMovieCard }
    );

    this.#movieCardPresenter.init(filmCard);

    // Ключами для презентеров сделаем id фильма
    this.moviePresenters.set(filmCard.id, this.#movieCardPresenter);
  };

  /**
   * @description Метод рендерит карточки фильмов на страницу внутри себя вызывая метод renderFilmCard
   */
  #renderFilms = () => {
    /* Math.min(this.#movieCardsInfo.length, MOVIE_CARD_PER_STEP) - подстраховываемся в отрисовке фильмов (если фильмов с сервера придёт меньше 5, то отрисуется то количество, которое пришло, а не 5) */
    for (let i = 0; i < Math.min(this.#originalMovieCardsInfo.length, MOVIE_CARD_PER_STEP); i++) {
      this.#renderFilmCard(this.#originalMovieCardsInfo[i], this.#userComments);
    }

    // console.log('рендер', this.#originalMovieCardsInfo)
  };

  /**
   * @description Для дальнейшей работы - сортировки и фильтрации - нам нужно научить наш презентер очищать список фильмов
   */
  #clearFilmsList = () => {
    // console.log(this.moviePresenters)
    // Для очистки списка фильмов будем последовательно вызывать destroy у всех MovieCardPresenter-ов...
    this.moviePresenters.forEach((presenter) => presenter.destroy());
    // ...а после очистим всю Map, чтобы "убить" ссылки на MovieCardPresenter-ы, чтобы сборщик мусора их собрал.
    this.moviePresenters.clear();
    this.#renderFilmCardCount = MOVIE_CARD_PER_STEP;
    // remove(this.#showMoreBtnView);
    // console.log('очистка')
  };

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
   * @description Функция сортировки. Реализует метод фильтрации
   * // - Сортируем фильмы
   * // - Очищаем список
   * // - Рендерим список фильмов заново
   * !!! .filter() возвращает новый массив, при этом исходный массив никак не изменится.
   * @param {string} filterMovieType - тип фильтрации
   */
  #filterMovies = (filterMovieType) => {

    // this.#originalMovieCardsInfo - оригинал карточек с фильмами
    // this.#copyMovieCardsInfo - копия оригинала карточек с фильмами
    // При фильтрации копии массива фильмов (this.#copyMovieCardsInfo), метод .filter() возвращает новый массив. И т.к. вся работа в методах происходит с оригиналом массива фильмов (this.#originalMovieCardsInfo) - мы перезаписываем его и передаем в методы уже отфильтрованный массив.

    // Опишем switch-блок с функциями сортировки
    switch (filterMovieType) {
      case FilterType.WATCHLIST:
        // console.log('WATCHLIST');
        // console.log(this);
        this.#originalMovieCardsInfo = this.#copyMovieCardsInfo.filter((movieCard) => movieCard.userDetails.watchlist === true);
        this.filterMovieView.value = filterMovieType;
        // console.log(this);

        // console.log(this.#originalMovieCardsInfo);
        break;
      case FilterType.ALREADYWATCHED:
        // console.log('ALREADYWATCHED');
        // console.log(this);
        this.#originalMovieCardsInfo = this.#copyMovieCardsInfo.filter((movieCard) => movieCard.userDetails.alreadyWatched === true);
        // console.log(this.#originalMovieCardsInfo);
        break;
      case FilterType.FAVOURITES:
        // console.log('FAVOURITES');
        // console.log(this);
        this.#originalMovieCardsInfo = this.#copyMovieCardsInfo.filter((movieCard) => movieCard.userDetails.favorite === true);
        // console.log(this.#originalMovieCardsInfo);
        break;
      default:
        this.#originalMovieCardsInfo = [...this.#copyMovieCardsInfo];
      // console.log(this.#originalMovieCardsInfo)
      // console.log(this);
    }

    this.#currentFilterType = filterMovieType;
    // console.log(this.#currentFilterType);
  };

  /**
   * @description Реализует подписку на изменение фильтрации
   * @param {string} filterType - тип фильтрации
   */
  #handleFilterTypeChange = (filterType) => {
    /*  Опишем в обработчике условие-оптимизацию, которое защитит от лишних перерисовок. (Если клик был по уже выбранному типу фильтра - то ничего ни делаем) */
    if (this.#currentFilterType === filterType) {
      return;
    }

    this.#filterMovies(filterType);
    /* Если функция (метод) filterMovies будет ни стрелочной, то доступа к методу clearFilmsList у класса MovieBoardPresenter у нас не будет, т.к. потеряется this. Т.е. в this подставляется класс MovieBoardPresenter и у этого класса вызывается метод clearFilmsList. А стрелка сохраняет контекст там, где она обьявлена */
    // - Очищаем список
    this.#clearFilmsList();
    // - Рендерим список заново
    this.#renderFilms();
    this.filterMovieView.filterMovieType = this.#currentFilterType;
    // console.log(this.filterMovieView.filterMovieType)
  };

  /**
   * @description Отрисовка типа фильтрации фильмов
   */
  renderFilterMovies = () => {
    this.filterMovieView = new FilterMovieView(this.#originalMovieCardsInfo);
    this.filterMovieView.setFilterListClickHandler(this.#handleFilterTypeChange);

    if (this.prevFilterMovieView === undefined) {
      render(this.filterMovieView, siteMainElement);
    }

    // replace(this.filterMovieView, this.prevFilterMovieView);

    console.log('this.filterMovieView', this.filterMovieView)
    console.log('this.prevFilterMovieView', this.prevFilterMovieView)

    // replace(this.filterMovieView, this.prevFilterMovieView);

    // console.log(this.prevFilterMovieView)

    // this.#FilterMoviePresenter = new FilterMoviePresenter(siteMainElement, this.#originalMovieCardsInfo, this.#copyMovieCardsInfo, this.#clearFilmsList, this.#renderFilms);

    // this.#FilterMoviePresenter.init();

  };

  /**
   * @description Перерисовка компонента
   */
  updateFilterView = () => {
    this.prevFilterMovieView = this.filterMovieView;

    this.renderFilterMovies();

    replace(this.filterMovieView, this.prevFilterMovieView);
  };

  /**
   * @description Общее количество фильмов в подвале сайта
   */
  #renderTotalCountFilms() {
    this.totalQuantityFilmsView = new TotalQuantityFilmsView(this.#originalMovieCardsInfo.length);

    render(this.totalQuantityFilmsView, footerFilmStatistics);
  }

  /**
   * @description Выделим весь код, что отвечает за отрисовку приложения в отдельный метод
   * @param {HTMLElement} boardContainer - место в DOM куда отрисовываем элемент
   */
  #renderBoard = (boardContainer) => {
    // Отрисовываем карточки фильмов на страницу

    // Если фильмов с сервера не пришло...
    if (this.#originalMovieCardsInfo.length === 0) {
      // ... отрисовываем заглушку в случае отсутствия фильмов
      this.#renderNoFilms();
      // Делаем выход из функции, чтобы дальше отрисовка элементов не происходила
      return;
    }

    // !!! Отрисовка идет по очереди (сверху - вниз)
    // Отрисовываем структуру DOM дерева
    // Фильтрация фильмов
    this.renderFilterMovies();
    // Сортировка фильмов
    this.#renderSortList();
    // Отрисовка контейнера для списка фильмов
    this.#renderFilmsContainer();
    // Отрисовка карточек фильмов
    this.#renderFilms();
    // Отрисовка кнопки 'Показать ещё'
    this.#renderShowMoreButton();
    // Отрисовка общего количества фильмов
    this.#renderTotalCountFilms();
  };

  /**
   * @description Инициализация Presenter-а и отрисовка карточек фильмов используя приватный метод класса #renderBoard
   */
  init = () => {
    // Карточки фильмов получили из модели передав в конструктор класса MovieCardPresenter
    this.#originalMovieCardsInfo = [...this.#filmCardInfo.filmCards];

    /* В отличии от сортировки(фильтрации) по любому параметру,
    исходный порядок можно сохранить только одним способом -
    сохранив исходный массив: */
    this.#copyMovieCardsInfo = [...this.#filmCardInfo.filmCards];

    // Комментарии к фильмам получили из модели передав в конструктор класса MovieCardPresenter
    this.#userComments = [...this.#filmCardInfo.userComments];

    console.log(this.#originalMovieCardsInfo);
    // console.log(this.#userComments);

    // Отрисовка элементов интерфейса приложения
    this.#renderBoard(this.#filmsContainer);
  };
}
