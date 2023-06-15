// import { render } from './render.js';
import { render } from './framework/render.js';
import UserTitleView from './view/user-title-view.js';

import MovieBoardPresenter from './presenter/movie-board-presenter.js';

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

const filmCardInfoModel = new FilmCardInfoModel();

const movieCardPresenter = new MovieBoardPresenter(siteMainElement, filmCardInfoModel);

render(new UserTitleView(), siteHeaderElement);

// render(new ShowMoreBtnView(), siteMainElement);
// render(new FilmDetailsView(), body);

// console.log(filmCardInfoModel)
movieCardPresenter.init();
