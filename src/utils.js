import dayjs from 'dayjs';

/***
 * Формат даты - только четырехзначное значение года
 */
export const DATE_FORMAT_Y = 'YYYY';

/**
 * Формат даты - день, полное название месяца, четырехзначное значение года
 */
export const DATE_FORMAT_D_M_Y = 'D MMMM YYYY';

/**
 * @description Генерация случайного числа в диапазоне
 * {@link https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random}
 * @param {Number} min
 * @param {Number} max
 * @returns {Number} возвращает случайное целое число в заданном интервале. Возвращаемое значение не менее min (или следующее целое число, которое больше min, если min не целое) и не более (но не равно) max.
 */
export const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * @description Булевские случайные величины
 * {@link https://habr.com/ru/articles/312880/}
 * @returns {boolean}
 */
export const getBooleanValue = () => (Math.floor(Math.random() * 2) === 0);

/**
 * @description Получение случайного элемента в массиве
 * @param {Array} items - массив
 * @returns элемент массива
 */
export const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];

/**
 * @description 'Очеловечивание формата даты'
 * @param {string} dueDate - дата в формате iso-date
 * @param {string} dateFormat - в какой формат перевести
 * @returns {string} человеческая дата
 */
export const humanizeTaskDueDate = (dueDate, dateFormat) => dueDate ? dayjs(dueDate).format(dateFormat) : '';

/**
 * @description Функция добавляет 0 в начало значения, если значение меньше 10
 * @param {Number} min
 * @param {Number} max
 * @returns {string}
 */
export const createDateMonth = (min, max) => {
  const month = getRandomIntInclusive(min, max);
  return month < 10 ? `0${month}` : `${month}`;
};

/**
 * @description Генерация рандомной даты
 * @returns {string}
 */
export const generateRandomDate = () => {
  const randomYear = getRandomIntInclusive(1900, 2023);
  const randomMonth = createDateMonth(1, 12);
  const randomDay = createDateMonth(1, 31);

  return `${randomYear}-${randomMonth}-${randomDay}`;
};

/**
 * @description Получние части переданного массива
 * @param {Array} arr - массив
 * @returns {Array}
 */
export const getRandomArray = (arr) => {
  const rand = getRandomIntInclusive(1, arr.length);
  const newArr = [];

  while (newArr.length !== rand) {
    const elem = arr[getRandomIntInclusive(0, arr.length - 1)];
    if (newArr.indexOf(elem) === -1) {
      newArr.push(elem);
    }
  }

  return newArr;
};

/**
 * @description Функция конвертирует запись минут в часы и минуты
 * {@link https://www.cyberforum.ru/javascript/thread938011.html}
 * @param {Number} time
 * @returns {string}
 */
export const getTimeInMinute = (time) => {
  // Если меньше 60, то выводим только минуты
  if (time < 60) {
    return `${time}m`;
  }

  // Если остаток от деления 0, то выводим только часы
  if (time % 60 === 0) {
    const hours = time / 60;
    return `${hours}h`;
  }

  // Если поделилось с остатком, то выводим часы и минуты
  if (time % 60 !== 0) {
    const minutes = time % 60;
    const hours = (time - minutes) / 60;

    return `${hours}h ${minutes}m`;
  }
};

/**
 * @description Функция возвращает часть копии исходного массива
 * @param {array} array - массив с данными
 * @returns {array} - часть копии исходного массива
 */
export const getRandomArrayPart = (array) => {
  const max = getRandomIntInclusive(0, array.length - 1);
  const min = getRandomIntInclusive(0, max);
  return array.slice(min, max + 1);
};

/**
 * @description Добавление класса к элементу (Если true - добавляем класс, false - ничего ни делаем)
 * @param {boolean} element - булево значение
 * @param {string} className - класс, который нужно добавить
 * @returns
 */
export const changeClassName = (element, className) => element ? className : '';
