import FilmDetailsView from '../view/film-details-view';
import { render, remove, replace } from '../framework/render.js';
import { MovieGroup } from '../const.js';
// import MovieCardView from '../view/movie-card-view';
import { updateItem } from '../utils';
// import MovieCardPresenter from './movie-card-presenter';

const body = document.body;

export default class FilmDetailsPopupPresenter {
  // #filmCardInfo = null;
  #filmComments = [];
  #container = null;
  #filmCard = null;

  #filmDetailsView = null;
  #movieCardView = null;
  // #movieCardPresenter = new MovieCardPresenter();

  onMovieCardChange = null;

  /**
   *
   * @param {Function} onMovieChange - перерисовка карточки фильма
   */
  constructor({ onMovieChange }) {
    this.onMovieCardChange = onMovieChange;
    // console.log(this.onMovieCardChange)
  }

  /**
   * @description Удаление/добавление фильма в группу. Колбек функция по изменению флага (булева значения у карточки фильма - просмотрен ли фильм?, в избранном?... )
   * @param {string} movieGroup - выбранная группа (watchlist, watched, favorites)
   */
  #handleMovieGroupChange = (movieGroup, evt) => {
    // Используем switch конструкцию для удаление/добавление фильма в группу
    switch (movieGroup) {
      case MovieGroup.WATCHLIST:
        // обновить моки
        this.#filmCard.userDetails.watchlist = !this.#filmCard.userDetails.watchlist;

        // вызвать обновление конкретного фильма.
        this.onMovieCardChange(this.#filmCard);
        this.updatePopup(this.#filmCard);

        // replace(this.#filmDetailsView, this.#filmDetailsView)

        // console.log(this.#movieCardView)
        console.log(this.#filmDetailsView.element)
        // console.log(this.#filmCard)
        // console.log(this)
        // console.log(evt)
        // console.log(this.#movieCardPresenter)
        // this.#movieCardPresenter.destroy();

        break;
      case MovieGroup.ALREADYWATCHED:
        this.#filmCard.userDetails.alreadyWatched = !this.#filmCard.userDetails.alreadyWatched;

        this.onMovieCardChange(this.#filmCard);
        this.updatePopup(this.#filmCard);

        break;
      case MovieGroup.FAVOURITE:
        this.#filmCard.userDetails.favorite = !this.#filmCard.userDetails.favorite;

        this.onMovieCardChange(this.#filmCard);
        this.updatePopup(this.#filmCard);
        break;
    }
  };

  /**
   * @description Выбор смайлика и подстановка в DOM
   * @param {string} type - тип смайлика
   */
  #selectEmojiComment = (type) => {
    const urlEmojie = `<img src="./images/emoji/${type}.png" width="55" height="55" alt="${type}"></img>`;
    const emojieContainer = this.#filmDetailsView.element.querySelector('.film-details__add-emoji-label');

    if (emojieContainer.firstChild !== null) {
      emojieContainer.removeChild(emojieContainer.firstChild);
    }

    emojieContainer.insertAdjacentHTML('afterbegin', urlEmojie);
  };

  /**
   * @description Обновление попапа при изменени данных
   * @param {object} movieCard
   */
  updatePopup = (movieCard) => {
    this.prevPopup = this.#filmDetailsView;

    // console.log(this.prevPopup)

    this.#createPopup(movieCard);

    // console.log(this.#filmDetailsView)

    replace(this.#filmDetailsView, this.prevPopup);
  };

  /**
   * @description Отрисовка попапа фильма
   * @param {object} filmCardInfo - обьект инфо о фильме
   * @param {Array} filmComments - массив всех комментов
   */
  #createPopup = (movie) => {

    this.#filmDetailsView = new FilmDetailsView(
      movie,
      this.#filmComments,
      this.#handleMovieGroupChange
    );

    // if (prevPopupView === null) {
    //   return;
    // }

    /**
    * @description Действия, которые нужно сделать при нажатии на крестик в попапе (закрыть попап)
    */
    const closeFilmDetailsPopup = () => {
      remove(this.#filmDetailsView);
      body.classList.remove('hide-overflow');

      document.removeEventListener('keydown', onEscKeyPress);
    };

    /**
     * @description Закрытие попапа при нажатии на Escape
     * @param {object} evt
     */
    function onEscKeyPress(evt) {
      if (evt.key === 'Escape') {
        // Отменяем действие по умолчанию у клавиши Escape (на MacOs - Escape выводит окна из полноэкранного режима)
        evt.preventDefault();
        closeFilmDetailsPopup();
      }
    }

    // Добавлние обработчкика на удаление попапа при нажатии на Escape
    document.addEventListener('keydown', onEscKeyPress);

    // Добавление обработчика на удаление попапа при нажатии на крестик
    this.#filmDetailsView.setMoviePopupCloseHandler(closeFilmDetailsPopup);

    this.#filmDetailsView.setEmojiCommentChoice(this.#selectEmojiComment);
  };

  destroy() {
    remove(this.#filmDetailsView);
    // body.classList.remove('hide-overflow');
  }

  /**
   *
   * @param {Object} filmCard - карточка фильма
   * @param {Object} filmComments - все комментарии, которые пришли с сервера
   * @param {HTMLElement} container
   */
  init = (filmCard, filmComments, container) => {
    this.#filmCard = filmCard;
    this.#filmComments = filmComments;
    this.#container = container;

    // const prevFilmDetailsPopup = this.#filmDetailsView;
    // console.log(this.#filmDetailsView)

    this.#createPopup(this.#filmCard);

    render(this.#filmDetailsView, this.#container);
    body.classList.add('hide-overflow');
  };
}


/*

При инициалилации попапа (this.#filmDetailsPopupPresenter.init) идёт:
- отрисовка попапа
- добавление обработчика на крестик
- --//--                 на кнопку Escape
*/
