import { createElement } from '../render.js';
import './abstract-view.css';

/** @const {string} Класс, реализующий эффект "покачивания головой" */
const SHAKE_CLASS_NAME = 'shake';

/** @const {number} Время анимации в миллисекундах */
const SHAKE_ANIMATION_TIMEOUT = 600;

/**
 * ! Используем и описываем один раз интерфейс и решаем с помощью него похожие задачи.
 * Абстрактный класс представления. Все аохожие методы классов вынесли в отдельный класс и используем его только как интерфейс
 */
export default class AbstractView {
  /** @type {HTMLElement|null} Элемент представления */
  #element = null;

  /** @type {Object} Пустой приватный обьект. Может использоваться для хранения обработчиков событий. (Нижним подчеркиванием сделали его приватным) */
  _callback = {};

  /* Защитка, чтобы не пытались делать экземпляр класса AbstractView.
  !!! AbstractView нужен лишь для того, чтобы хранить в нем методы и свойства, которые переиспользуются во всех View (все общее во всех View)
  new.target - это new AbstractView
  */
  constructor() {
    if (new.target === AbstractView) {
      throw new Error('Can\'t instantiate AbstractView, only concrete one.');
    }
  }

  /**
   * Геттер для получения элемента
   * @returns {HTMLElement} Элемент представления
   */
  get element() {
    // Если уже этот элемент создан, то просто возвращаем его
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  /**
   * Геттер для получения разметки элемента
   * !!! Показываем ошибку, если разработчики захотят использовать get template у класса AbstractView, т.к. у каждого View свой get template
   * @abstract
   * @returns {string} Разметка элемента в виде строки
   */
  get template() {
    // Бросаем ошибку, если кто то забудет реализовать свой get template
    throw new Error('Abstract method not implemented: get template');
  }

  /** Метод для удаления элемента */
  removeElement() {
    this.#element = null;
  }

  /**
   * Метод, реализующий эффект "покачивания головой"
   * @param {shakeCallback} [callback] Функция, которая будет вызвана после завершения анимации
   */
  shake(callback) {
    this.element.classList.add(SHAKE_CLASS_NAME);
    setTimeout(() => {
      this.element.classList.remove(SHAKE_CLASS_NAME);
      callback?.();
    }, SHAKE_ANIMATION_TIMEOUT);
  }
}

/**
 * Функция, которая будет вызвана методом shake после завершения анимации
 * @callback shakeCallback
 */
