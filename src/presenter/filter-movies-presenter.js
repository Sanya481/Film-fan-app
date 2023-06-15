import { render, remove } from '../framework/render.js';
import { FilterType } from '../const.js';
import FilterMovieView from '../view/filter-movie-view.js';

export default class FilterMoviePresenter {

  // Выбранный тип фильтра по умолчанию
  #currentFilterType = FilterType.DEFAULT;
  #filterMovieView;
  #originalMovieCards;
  // #copyMovieCardsInfo;

  #container = null;

  constructor(container, originalMovieCards, copyMovieCards, clearMovieList, renderMovie) {
    this.#container = container;

    this.#originalMovieCards = originalMovieCards;
    this.copyMovieCards = copyMovieCards;
    this.clearMovieList = clearMovieList;
    this.renderMovie = renderMovie;
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
        this.#originalMovieCards = this.copyMovieCards.filter((movieCard) => movieCard.userDetails.watchlist === true);
        this.#filterMovieView.value = filterMovieType;
        console.log(this.#filterMovieView);

        // console.log(this.#originalMovieCardsInfo);
        break;
      case FilterType.ALREADYWATCHED:
        // console.log('ALREADYWATCHED');
        // console.log(this);
        this.#originalMovieCards = this.copyMovieCards.filter((movieCard) => movieCard.userDetails.alreadyWatched === true);
        // console.log(this.#originalMovieCardsInfo);
        break;
      case FilterType.FAVOURITES:
        // console.log('FAVOURITES');
        // console.log(this);
        this.#originalMovieCards = this.copyMovieCards.filter((movieCard) => movieCard.userDetails.favorite === true);
        console.log('console.log(this.#originalMovieCards)', this.#originalMovieCards)
        break;
      default:
        this.#originalMovieCards = [...this.copyMovieCards];
        // console.log(this.#originalMovieCards)
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
    this.clearMovieList();
    // - Рендерим список заново

    // !!!! В рендер нужно, как то передавать отфильтрованный массив
    this.renderMovie();
    this.#filterMovieView.filterMovieType = this.#currentFilterType;
    console.log(this)
  };

  // filterMovieView = new FilterMovieView();

  /**
   * @description Отрисовка типа фильтрации фильмов
   */
  renderFilterMovies = () => {
    this.#filterMovieView = new FilterMovieView();
    this.#filterMovieView.setFilterListClickHandler(this.#handleFilterTypeChange);

    render(this.#filterMovieView, this.#container);
  };

  destroy = () => {
    remove(this.#filterMovieView);
  };

  init() {
    this.renderFilterMovies();
  }
}
