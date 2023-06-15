import { render, remove, replace } from '../framework/render.js';
import MovieCardView from '../view/movie-card-view.js';

export default class MovieCardPresenter {
  container = null;
  movieCard = null;

  movieCardView = null;
  prevMovieCardView = null;

  /**
   *
   * @param {HTMLElement} container - место куда отрисовываем карточки
   * @param {function} openFilmPopup - Обработчик клика по карточке - открытие попапа
   * @param {function} onMovieChange - Действия (функция) при изменении группы фильма (избранное, просмотренное...)
   */
  constructor(container, openFilmPopup, {onMovieChange}) {
    this.container = container;
    this.openFilmPopup = openFilmPopup;
    this.onMovieChange = onMovieChange;
  }

  /**
   * @description  Опишем (метод) обработчик клика по кнопке "Добавить фильм в список будущих просмотров"
   */
  #addFilmToWatchlist = () => {
    // Меняем булево значение на противоположное
    this.movieCard.userDetails.watchlist = !this.movieCard.userDetails.watchlist;

    this.onMovieChange(this.movieCard);
  };

  /**
   * @description  Опишем (метод) обработчик клика по кнопке "Добавить фильм в просмотренные"
   */
  #addFilmToAlreadyWatched = () => {
    // Меняем булево значение на противоположное
    this.movieCard.userDetails.alreadyWatched = !this.movieCard.userDetails.alreadyWatched;

    this.onMovieChange(this.movieCard);
  };

  /**
   *@description  Опишем (метод) обработчик клика по кнопке "Добавить фильм в избранное"
   */
  #addFilmToFavorite = () => {
    // Меняем булево значение на противоположное
    this.movieCard.userDetails.favorite = !this.movieCard.userDetails.favorite;

    this.onMovieChange(this.movieCard);
  };

  /**
   * @description Создаем элемент (карточку фильма) и вешаем обработчики
   * @param {object} filmCard
   */
  #createMovieCard = (filmCard) => {
    this.movieCardView = new MovieCardView(filmCard);

    // Передача функции обработчика клика по карточке
    this.movieCardView.setMovieCardClickHandler(this.openFilmPopup);

    // (Передадим из презентера задачи в представление обработчик)

    // Передача функции обработчика клика по кнопке - 'Добавить фильм в список будущих просмотров'
    this.movieCardView.setWatchlistClickHandler(this.#addFilmToWatchlist);
    // ... 'Добавить фильм в просмотренные'
    this.movieCardView.setAlreadyWatchedClickHandler(this.#addFilmToAlreadyWatched);
    // ... 'Добавить фильм в избранное'
    this.movieCardView.setFavoriteClickHandler(this.#addFilmToFavorite);
  };

  /**
   * @description Меняем карточку на новую при изменении пользователем данных
   * @param {object} updateMovie
   */
  updateMovieCard = (updateMovie) => {
    this.prevMovieCardView = this.movieCardView;

    this.#createMovieCard(updateMovie);

    replace(this.movieCardView, this.prevMovieCardView);
  };

  /**
  * @description Метод для удаление компонента (карточки фильма)
  */
  destroy() {
    remove(this.movieCardView);
  }

  /**
   * @description Инициализация (рендер) карточки фильма
   * @param {object} movieCard - карточка фильма
   */
  init(movieCard) {
    this.movieCard = movieCard;

    this.#createMovieCard(movieCard);

    // console.log('this.prevMovieCardView', this.prevMovieCardView)
    // console.log(this.movieCardView)

    render(this.movieCardView, this.container);
  }
}

/*

Инициализация (рендер) карточки фильма с помощью метода init

Карточка фильма - логика событий, действия по наступлении событий, реакция на действия пользователя (только то, что относится к карточке фильма)


!!! ООП - это про организацию кода. Она не влияет на архитектуру.
Мы можем строить архитектуру, как с помощью ООП, так и с помощью функционального подхода
!!! За архитектуру отвечает отдельный патерн. К примеру MVP, как у в этом проекте. (Паттерны MV* работают примерно одинаково и отличаются лишь тем, как у нас идёт поток данных)
*/
