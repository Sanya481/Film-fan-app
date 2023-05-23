import { render, remove } from '../framework/render.js';
import MovieCardView from '../view/movie-card-view.js';

export default class MovieCardPresenter {
  container = null;
  movieCard = null;

  movieCardView = null;

  /**
   *
   * @param {HTMLElement} container - место куда отрисовываем карточки
   * @param {function} openFilmPopup - Обработчик клика по карточке - открытие попапа
   */
  constructor(container, openFilmPopup) {
    this.container = container;
    this.openFilmPopup = openFilmPopup;
  }

  // #renderCard = () => {

  // }

  /**
   * @description
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

    // console.log(this.movieCardView)

    this.movieCardView = new MovieCardView(this.movieCard);

    // console.log(this.movieCardView)

    // Передача функции обработчика клика по карточке
    this.movieCardView.setMovieCardClickHandler(this.openFilmPopup);

    render(this.movieCardView, this.container);
  }
}

/*

Инициализация (рендер) карточки фильма с помощью метода init

Карточка фильма - логика событий, действия по наступлении событий, реакция на действия пользователя (только то, что относится к карточке фильма)

*/
