import { render } from './render.js';
import UserTitleView from './view/user-title-view.js';
import MainNavigationView from './view/main-navigation-view.js';
import ListSortView from './view/list-sort-view.js';


// import FilmDetailsView from './view/film-details-view.js';

import MovieCardPresenter from './presenter/movie-card-presenter.js';

import TotalQuantityFilmsView from './view/total-quantity-films-view.js';

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


render(new UserTitleView(), siteHeaderElement);

render(new MainNavigationView(), siteMainElement);
render(new ListSortView(), siteMainElement);
// render(new ShowMoreBtnView(), siteMainElement);
// render(new FilmDetailsView(), body);

movieCardPresenter.init(siteMainElement);

render(new TotalQuantityFilmsView(), footerFilmStatistics);
