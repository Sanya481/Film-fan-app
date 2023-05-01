import CommonFilmsSectionView from '../view/common-films-section-view.js';
import MainFilmsListSectionView from '../view/main-films-list-section-view.js';
import MovieCardContainerView from '../view/movie-card-container-view.js';
import ShowMoreBtnView from '../view/show-more-btn-view.js';
import EmptyFilmListView from '../view/empty-film-list.js';
// import FilmDetailsView from '../view/film-details-view.js';
import ListSortView from '../view/list-sort-view.js';
import MovieCardView from '../view/movie-card-view.js';

import { render } from '../render.js';

import FilmDetailsPresenter from '../presenter/film-details-popup.js';

const body = document.body;

/**
 * Количество фильмов при загрузке страницы
 */
const MOVIE_CARD_PER_STEP = 5;

/**
 * Счётчик отрисовки фильмов
 */
let renderFilmCardCount = MOVIE_CARD_PER_STEP;

export default class MovieCardPresenter {

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
  // Попап фильма
  filmDetailsComponent = new FilmDetailsPresenter();

  // Контейнер для отрисовки
  #filmsContainer = null;
  // Обьект с информацией о фильме
  #filmCardInfo = null;
  // Кнопка 'показать ещё'
  #showMoreBtnView = null;

  #movieCardsInfo = [];
  #userComments = [];

  /**
   * @description Выделим весь код, что отвечает за отрисовку
   * @param {HTMLElement} boardContainer - место в DOM куда отрисовываем элемент
   */
  #renderBoard = (boardContainer) => {
    // Отрисовываем карточки фильмов на страницу

    if (this.#movieCardsInfo.length === 0) {
      // Заглушка в случае отсутствия фильмов
      render(this.emptyFilmListView, boardContainer);
      return;
    }

    // !!! Отрисовка идет по очереди (сверху - вниз)
    // Отрисовываем структуру DOM дерева
    render(this.listSortView, boardContainer);
    render(this.commonFilmsSectionView, this.#filmsContainer);
    render(this.#mainFilmsListSectionView, this.commonFilmsSectionView.element);
    render(this.movieCardContainerView, this.#mainFilmsListSectionView.element);

    /* Math.min(this.#movieCardsInfo.length, MOVIE_CARD_PER_STEP) - подстраховываемся в отрисовке фильмов (если фильмов с сервера придёт меньше 5, то отрисуется то количество, которое пришло, а не 5) */
    for (let i = 0; i < Math.min(this.#movieCardsInfo.length, MOVIE_CARD_PER_STEP); i++) {
      this.#renderFilmCard(this.#movieCardsInfo[i], this.#userComments);
    }

    // Если количество фильмов > 5, показываем кнопку 'показать ещё'
    if (this.#movieCardsInfo.length > MOVIE_CARD_PER_STEP) {
      this.#showMoreBtnView = new ShowMoreBtnView();
      render(this.#showMoreBtnView, this.#mainFilmsListSectionView.element);

      this.#showMoreBtnView.element.addEventListener('click', this.#onLoadMoreFilmCard);
    }
  };

  // Выделим отрисовку карточек фильмов в отдельную функцию
  /**
   * @description Отрисовка карточки фильма
   * @param {Object} filmCard - карточка фильма
   */
  #renderFilmCard = (filmCard, filmComments) => {
    // console.log(filmCard)
    // console.log(filmComments)

    // const filmCardComments = filmCard.comments;

    const filmCardComponent = new MovieCardView(filmCard);

    /**
     * @description Открытие модалки с подробной информации о фильме
     * @param {*} evt
     */
    const onOpenFilmDetailsPopup = (evt) => {
      evt.preventDefault();

      const filmCards = Array.from(this.movieCardContainerView.element
        .querySelectorAll('.film-card'));

      const indexSelectedFilm = filmCards.indexOf(evt.currentTarget.closest('.film-card'));

      this.filmDetailsComponent.init(this.#movieCardsInfo[indexSelectedFilm], filmComments, body);
    };

    filmCardComponent.element.querySelector('.film-card__link')
      .addEventListener('click', onOpenFilmDetailsPopup);

    // Карточка фильма
    render(filmCardComponent, this.movieCardContainerView.element);
  };

  /**
   * Показ карточек по клику на кнопку 'Показать ещё'
   */
  #onLoadMoreFilmCard = () => {
    this.#movieCardsInfo
      .slice(renderFilmCardCount, renderFilmCardCount + MOVIE_CARD_PER_STEP)
      .forEach((movieCard) => this.#renderFilmCard(movieCard, this.#userComments));

    renderFilmCardCount += MOVIE_CARD_PER_STEP;

    if (renderFilmCardCount >= this.#movieCardsInfo.length) {
      this.#showMoreBtnView.element.remove();
      this.#showMoreBtnView.removeElement();
    }
  };

  /**
   * @description Отрисовка карточек фильмов
   * @param {HTMLElement} filmsContainer - в каком месте в DOM отрисовываем элемент
   * @param {object} filmCardInfo - обьект с данными о фильме и комментариями (прототип класса FilmCardInfoModel)
   */
  init = (filmsContainer, filmCardInfo) => {

    this.#filmsContainer = filmsContainer;

    // filmCardInfo записываем в свойство класса
    this.#filmCardInfo = filmCardInfo;

    // Карточки фильмов (получили из модели)
    this.#movieCardsInfo = [...this.#filmCardInfo.filmCards];

    // Комментарии к фильмам (получили из модели)
    this.#userComments = [...this.#filmCardInfo.userComments];

    // console.log(this.#movieCardsInfo);
    // console.log(this.#userComments);

    this.#renderBoard(this.#filmsContainer);
  };
}
