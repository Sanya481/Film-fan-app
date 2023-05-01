import { createFilmCardInfo } from '../mock-data/film-info.js';
import { createUserComment } from '../mock-data/user-comments.js';

/**
 * Количество карточек фильмов
 */
const FILM_CARD_QUANTITY = 48;

const USER_COMMENT_QUANTITY = 30;

export default class FilmCardInfoModel {
  // Сделаем часть полей в классах приватными (добавлением решетки в начало свойств классов)
  #filmCards = Array.from({ length: FILM_CARD_QUANTITY }, createFilmCardInfo);
  #userComments = Array.from({length: USER_COMMENT_QUANTITY}, createUserComment);

  get filmCards() {
    return this.#filmCards;
  }

  get userComments() {
    return this.#userComments;
  }
}
