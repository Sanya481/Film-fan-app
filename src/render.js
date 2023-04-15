/**
 * Список параметров, куда по отношению к elem производить вставку
 */
const RenderPosition = {
  BEFOREBEGIN: 'beforebegin',
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend',
};

/**
 * @description Функция создающая html элемент
 * @param {string} template - шаблонная строка с html кодом
 * @returns {HTMLElement} - html код
 */
const createElement = (template) => {
  // Создали div
  const newElement = document.createElement('div');
  // В div добавли шаблон
  newElement.innerHTML = template;

  // Вернули первый элемент в созданном div - наш шаблон
  return newElement.firstElementChild;
};

/* elem.insertAdjacentElement(where, html) */
// Первый параметр – это специальное слово, указывающее, куда по отношению к elem производить вставку
// Второй параметр – это HTML-строка, которая будет вставлена именно «как HTML».

/**
 * @description Отрисовка элемента на странице
 * @param {object} component экземпляр класса
 * @param {HTMLElement} container - куда отрисовываем элемент на странице
 * @param {string} place - в какое место (в конец, начало... блока)
 */
const render = (component, container, place = RenderPosition.BEFOREEND) => {
  container.insertAdjacentElement(place, component.getElement());
};

export {RenderPosition, createElement, render};
