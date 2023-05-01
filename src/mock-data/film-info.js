import {
  getRandomIntInclusive,
  getBooleanValue,
  getRandomArrayElement,
  generateRandomDate,
  getRandomArray,
  getTimeInMinute,
  getRandomArrayPart
} from '../utils.js';

import {
  TITLES,
  ALTERNATIVE_TITLES,
  TOTAL_RATING,
  POSTERS,
  AGE_RATING,
  DIRECTORS,
  RUNTIME,
  DESCRIPTIONS,
  COUNTRIES,
  WRITERS,
  ACTORS,
  GENRES,
  COMMENT_ID
} from './const.js';

/**
 * Описание фильмов
 */
const createFilmCardInfo = (_, index) => {
  const id = index++;
  return {
    id,
    comments: getRandomArray(COMMENT_ID),
    filmInfo: {
      title: TITLES[getRandomIntInclusive(0, TITLES.length - 1)],
      alternativeTitle: ALTERNATIVE_TITLES[getRandomIntInclusive(0, ALTERNATIVE_TITLES.length - 1)],
      totalRating: getRandomIntInclusive(TOTAL_RATING.MIN, TOTAL_RATING.MAX),
      poster: getRandomArrayElement(POSTERS),
      ageRating: getRandomIntInclusive(AGE_RATING.MIN, AGE_RATING.MAX),
      director: DIRECTORS[getRandomIntInclusive(0, DIRECTORS.length - 1)],
      writers: getRandomArrayPart(WRITERS),
      actors: getRandomArray(ACTORS),
      release: {
        date: `${generateRandomDate()}T00:00:00.000Z`,
        releaseCountry: COUNTRIES[getRandomIntInclusive(0, COUNTRIES.length - 1)],
      },
      runtime: getTimeInMinute(getRandomIntInclusive(RUNTIME.MIN, RUNTIME.MAX)),
      genre: getRandomArray(GENRES),
      description: DESCRIPTIONS[getRandomIntInclusive(0, DESCRIPTIONS.length - 1)],
    },
    userDetails: {
      watchlist: getBooleanValue(),
      alreadyWatched: getBooleanValue(),
      watchingDate: `${generateRandomDate()}T16:12:32.554Z`,
      favorite: getBooleanValue()
    }
  };
};

// !!! Правило хорошего кода, чтобы модуль возвращал функцию - поэтому записываем массив не в константу, а в функцию
// const filmCardsInfo = () => Array.from({length: 4}, createFilmCardInfo);

export { createFilmCardInfo };


