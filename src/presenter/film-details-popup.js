import FilmDetailsView from '../view/film-details-view';
import { render } from '../render.js';

const body = document.body;

export default class FilmDetailsPresenter {
  #filmCardInfo = null;
  #filmComments = [];
  #container = null;

  // constructor(movieCardInfo, movieComments) {
  //   this.#movieCardInfo = movieCardInfo;
  //   this.#movieComments = movieComments;
  // }

  #renderPopup = (filmCardInfo, filmComments) => {
    const filmDetailsView = new FilmDetailsView(filmCardInfo, filmComments);

    // console.log(document.querySelector('.film-details'))

    render(filmDetailsView, body);

    /**
     * Закрытие попапа с подробной иформацией о фильме
     */
    const onCloseFilmDetailsPopup = () => {
      filmDetailsView.element.remove();
      body.classList.remove('hide-overflow');

      filmDetailsView.element.querySelector('.film-details__close-btn')
        .removeEventListener('click', onCloseFilmDetailsPopup);

      document.removeEventListener('keydown', onEscKeyPress);

    };

    function onEscKeyPress(evt) {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        onCloseFilmDetailsPopup();
      }
    }

    // Удаление попапа при нажатии на Escape
    document.addEventListener('keydown', onEscKeyPress);

    // Удаление попапа при нажатии на крестик
    filmDetailsView.element.querySelector('.film-details__close-btn')
      .addEventListener('click', onCloseFilmDetailsPopup);
  };

  init = (filmCardInfo, filmComments, container) => {
    this.#filmCardInfo = filmCardInfo;
    this.#filmComments = filmComments;
    this.#container = container;

    this.#renderPopup(filmCardInfo, filmComments);
  };
}


// !Удалить обработчики
