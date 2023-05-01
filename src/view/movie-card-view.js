import { createElement } from '../render.js';
import { humanizeTaskDueDate, DATE_FORMAT_Y } from '../utils.js';


/**
 * @description Шаблон карточки фильма
 * @returns {string}
 */
const createMovieCardTemplate = (movieInfo) => {
  const { filmInfo, comments, userDetails } = movieInfo;

  // Проверка на наличие даты
  const date = filmInfo.release.date !== null ? humanizeTaskDueDate(filmInfo.release.date, DATE_FORMAT_Y) : '';

  // Добавлен ли фильм в список для просмотра в будущем
  const watchlistClassName = userDetails.watchlist ? 'film-card__controls-item--active' : '';

  // Просмотрен ли фильм
  const alreadyWatchedClassName = userDetails.alreadyWatched ? 'film-card__controls-item--active' : '';

  // Находится ли фильм в избранном
  const favoriteClassName = userDetails.favorite ? 'film-card__controls-item--active' : '';

  // console.log(date)

  return (
    `
<article class="film-card">
  <a class="film-card__link">
    <h3 class="film-card__title">${filmInfo.title}</h3>
    <p class="film-card__rating">${filmInfo.totalRating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${date}</span>
      <span class="film-card__duration">${filmInfo.runtime}</span>
      <span class="film-card__genre">${filmInfo.genre}</span>
    </p>
    <img src=${filmInfo.poster} alt="${filmInfo.title}" class="film-card__poster">
    <p class="film-card__description">${filmInfo.description}</p>
    <span class="film-card__comments">${comments.length} comments</span>
  </a>
  <div class="film-card__controls">
    <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${watchlistClassName}" type="button">Add to watchlist</button>
    <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${alreadyWatchedClassName}" type="button">Mark as watched</button>
    <button class="film-card__controls-item film-card__controls-item--favorite ${favoriteClassName}" type="button">Mark as favorite</button>
  </div>
</article>
`
  );
};

export default class MovieCardView {
  #element = null;

  // Один обьект (фильм)
  #filmCard = null;

  // Передаем карточку фильма
  constructor(filmCard) {
    this.#filmCard = filmCard;
  }

  get template() {
    return createMovieCardTemplate(this.#filmCard);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
