import { render } from './render.js';
import UserTitleView from './view/user-title-view.js';
import MainNavigationView from './view/main-navigation-view.js';

import MovieCardPresenter from './presenter/movie-card-presenter.js';

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

const movieCardPresenter = new MovieCardPresenter();

const filmCardInfoModel = new FilmCardInfoModel();


render(new UserTitleView(), siteHeaderElement);

render(new MainNavigationView(), siteMainElement);

// render(new ShowMoreBtnView(), siteMainElement);
// render(new FilmDetailsView(), body);

movieCardPresenter.init(siteMainElement, filmCardInfoModel);

render(new TotalQuantityFilmsView(), footerFilmStatistics);


