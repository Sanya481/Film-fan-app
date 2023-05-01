import { getRandomIntInclusive, generateRandomDate } from '../utils.js';
import {ACTORS, TEXT_COMMENTS, COMMENT_EMOTIONS} from './const.js';

/**
 * Массив с комментариями пользователей к фильму
 */
export const createUserComment = (_, index) => {
  const id = index++;
  return {
    id,
    author: ACTORS[getRandomIntInclusive(0, ACTORS.length - 1)],
    comment: TEXT_COMMENTS[getRandomIntInclusive(0, TEXT_COMMENTS.length - 1)],
    date: `${generateRandomDate()}T16:12:32.554Z`,
    emotion: COMMENT_EMOTIONS[getRandomIntInclusive(0, COMMENT_EMOTIONS.length - 1)]
  };
};
