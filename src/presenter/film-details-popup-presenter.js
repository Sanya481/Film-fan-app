import FilmDetailsView from '../view/film-details-view';
import { render, remove } from '../framework/render.js';

const body = document.body;

export default class FilmDetailsPopupPresenter {
  // #filmCardInfo = null;
  #filmComments = [];
  #container = null;
  #filmCard = null;

  #filmDetailsView = null;

  // constructor(movieCardInfo, movieComments) {
  //   this.#movieCardInfo = movieCardInfo;
  //   this.#movieComments = movieComments;
  // }

  /**
   * @description Отрисовка попапа фильма
   * @param {object} filmCardInfo - обьект инфо о фильме
   * @param {Array} filmComments - массив всех комментов
   */
  #renderPopup = () => {
    this.#filmDetailsView = new FilmDetailsView(this.#filmCard, this.#filmComments);

    // if (prevPopupView === null) {
    //   return;
    // }

    render(this.#filmDetailsView, this.#container);
    body.classList.add('hide-overflow');

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

    this.#renderPopup();
  };
}


/*

При инициалилации попапа (this.#filmDetailsPopupPresenter.init) идёт:
- отрисовка попапа
- добавление обработчика на крестик
- --//--                 на кнопку Escape
*/
