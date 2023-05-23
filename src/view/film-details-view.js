// import { createElement } from '../render.js';
import AbstractView from '../framework/view/abstract-view.js';
import { humanizeTaskDueDate, DATE_FORMAT_D_M_Y, changeClassName } from '../utils.js';

/**
 * @description Создание пользовательских комментариев
 * @param {Array} comments - массив
 * @returns {string}
 */
const createUserCommentTemplate = (comments) => comments.map((comment) =>
  `
  <li class="film-details__comment">
    <span class="film-details__comment-emoji">
      <img src="./images/emoji/${comment.emotion}.png" width="55" height="55" alt="emoji-${comment.emotion}">
    </span>
    <div>
      <p class="film-details__comment-text">${comment.comment}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${comment.author}</span>
        <span class="film-details__comment-day">2019/12/31 23:59</span>
        <button class="film-details__comment-delete">Delete</button>
      </p>
    </div>
  </li>
`).join('');

// Вызов arr.join('') делает в точности противоположное split. Он создаёт строку из элементов массива arr, вставляя '' между ними.
/**
 * @description Функция создает шаблон для жанров фильма
 * @param {Array} genres - массив
 * @returns {string} - строка (html элемент)
 */
const createFilmGenresTemplate = (genres) => genres.map((genre) => `<span class="film-details__genre"> ${genre}</> `).join('');


/**
 * @description Шаблон описания фильма (попап)
 * @returns {string}
 */
const createFilmDetailsPopupTemplate = (movieDetails, movieComments) => {
  const { comments, filmInfo, userDetails } = movieDetails;

  // console.log(movieDetails);
  // console.log(movieDetails.userComments);
  // console.log(movieComments);

  // Сопоставление комментариев и фильма по id
  const filmComments = [];

  comments.forEach((id) => {
    movieComments.find((comment) => {
      if (comment.id === id) {
        filmComments.push(comment);
      }
    });
  });

  // Жанры фильмов
  const filmGenres = createFilmGenresTemplate(filmInfo.genre);

  // Комментарии к фильму
  const userComments = createUserCommentTemplate(filmComments);

  // Класс для выделения действий с фильмом
  const activeClass = 'film-details__control-button--active';

  return (
    `
      <section class="film-details">
        <form class="film-details__inner" action="" method="get">
          <div class="film-details__top-container">
            <div class="film-details__close">
              <button class="film-details__close-btn" type="button">close</button>
            </div>
            <div class="film-details__info-wrap">
              <div class="film-details__poster">
                <img class="film-details__poster-img" src="${filmInfo.poster}" alt="${filmInfo.title}">

                  <p class="film-details__age">${filmInfo.ageRating}+</p>
              </div>

              <div class="film-details__info">
                <div class="film-details__info-head">
                  <div class="film-details__title-wrap">
                    <h3 class="film-details__title">${filmInfo.alternativeTitle}</h3>
                    <p class="film-details__title-original">Original: ${filmInfo.title}</p>
                  </div>

                  <div class="film-details__rating">
                    <p class="film-details__total-rating">${filmInfo.totalRating}</p>
                  </div>
                </div>

                <table class="film-details__table">
                  <tr class="film-details__row">
                    <td class="film-details__term">Director</td>
                    <td class="film-details__cell">${filmInfo.director}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">Writers</td>
                    <td class="film-details__cell">${filmInfo.writers}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">Actors</td>
                    <td class="film-details__cell">${filmInfo.actors}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">Release Date</td>
                    <td class="film-details__cell">${humanizeTaskDueDate(filmInfo.release.date, DATE_FORMAT_D_M_Y)}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">Runtime</td>
                    <td class="film-details__cell">${filmInfo.runtime}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">Country</td>
                    <td class="film-details__cell">${filmInfo.release.releaseCountry}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">Genres</td>
                    <td class="film-details__cell">
                      ${filmGenres}
                  </tr>
                </table>

                <p class="film-details__film-description">
                  ${filmInfo.description}
                </p>
              </div>
            </div>

            <section class="film-details__controls">
              <button type="button" class="film-details__control-button film-details__control-button--watchlist ${changeClassName(userDetails.watchlist, activeClass)}" id="watchlist" name="watchlist">Add to watchlist</button>
              <button type="button" class="film-details__control-button film-details__control-button--watched ${changeClassName(userDetails.alreadyWatched, activeClass)}" id="watched" name="watched">Already watched</button>
              <button type="button" class="film-details__control-button film-details__control-button--favorite ${changeClassName(userDetails.favorite, activeClass)}" id="favorite" name="favorite">Add to favorites</button>
            </section>
          </div>

          <div class="film-details__bottom-container">
            <section class="film-details__comments-wrap">
              <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

              <ul class="film-details__comments-list">
                ${userComments}
              </ul>

              <div class="film-details__new-comment">
                <div class="film-details__add-emoji-label"></div>

                <label class="film-details__comment-label">
                  <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
                </label>

                <div class="film-details__emoji-list">
                  <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
                    <label class="film-details__emoji-label" for="emoji-smile">
                      <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
                    </label>

                    <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
                      <label class="film-details__emoji-label" for="emoji-sleeping">
                        <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
                      </label>

                      <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
                        <label class="film-details__emoji-label" for="emoji-puke">
                          <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
                        </label>

                        <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
                          <label class="film-details__emoji-label" for="emoji-angry">
                            <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
                          </label>
                        </div>
                      </div>
                    </section>
                </div>
              </form>
            </section>
            `
  );
};

export default class FilmDetailsView extends AbstractView {
  // element - делаем приватным т.к. он нам нужен только внутри класса
  // #element = null;

  #movieDetails = null;
  #movieComments = null;

  constructor(movieDetails, movieComments) {
    /* Конструкторы в наследуемых классах должны обязательно вызывать super(...), и делать это перед использованием this.. */
    super();
    this.#movieDetails = movieDetails;
    this.#movieComments = movieComments;
  }

  /**
   * @description Публичный метод для установки обработчика на крестик для закрытия попапа фильма
   * @param {function} callback
   */
  setMoviePopupCloseHandler = (callback) => {
    this._callback.click = callback;

    this.element.querySelector('.film-details__close-btn')
      .addEventListener('click', this.#onMoviePopupCloseBtnClick);
  };

  /**
   * @description Функция для передачи в обработчик события на закрытие попапа фильма при нажатии на крестик
   */
  #onMoviePopupCloseBtnClick = () => {
    this._callback.click();
  };

  get template() {
    return createFilmDetailsPopupTemplate(this.#movieDetails, this.#movieComments);
  }

  // get element() {
  //   if (!this.#element) {
  //     this.#element = createElement(this.template);
  //   }

  //   return this.#element;
  // }

  // /**
  //  * @description Удаление ссылки на элемент
  //  */
  // removeElement() {
  //   this.#element = null;
  // }
}
