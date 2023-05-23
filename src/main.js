// import { render } from './render.js';
import { render } from './framework/render.js';
import UserTitleView from './view/user-title-view.js';
import MainNavigationView from './view/main-navigation-view.js';

import MovieBoardPresenter from './presenter/movie-board-presenter.js';

import TotalQuantityFilmsView from './view/total-quantity-films-view.js';

import FilmCardInfoModel from './model/film-card-model.js';

// const body = document.body;

/**
 * Header сайта
 */
const siteHeaderElement = document.querySelector('.header');

/**
 * Main сайта
 */
const siteMainElement = document.querySelector('.main');

const footerFilmStatistics = document.querySelector('.footer__statistics');

const filmCardInfoModel = new FilmCardInfoModel();

const movieCardPresenter = new MovieBoardPresenter(siteMainElement, filmCardInfoModel);

render(new UserTitleView(), siteHeaderElement);

render(new MainNavigationView(), siteMainElement);

// render(new ShowMoreBtnView(), siteMainElement);
// render(new FilmDetailsView(), body);

// console.log(filmCardInfoModel)
movieCardPresenter.init();

render(new TotalQuantityFilmsView(), footerFilmStatistics);



