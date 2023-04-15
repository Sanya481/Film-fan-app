
import CommonFilmsSectionView from '../view/common-films-section-view.js';
import MainFilmsListSectionView from '../view/main-films-list-section-view.js';
import MovieCardContainerView from '../view/movie-card-container-view.js';
import ShowMoreBtnView from '../view/show-more-btn-view.js';

import { render } from '../render.js';
import MovieCardView from '../view/movie-card-view.js';

export default class MovieCardPresenter {
  // commonFilmsSectionView = new CommonFilmsSectionView();

  init = (filmsContainer) => {
    this.filmsContainer = filmsContainer;

    render(new CommonFilmsSectionView(), this.filmsContainer);

    render(new MainFilmsListSectionView(), document.querySelector('.films'));
    render(new MovieCardContainerView(), document.querySelector('.films-list'));

    for (let i = 0; i < 5; i++) {
      render(new MovieCardView(), document.querySelector('.films-list__container'));
    }

    render(new ShowMoreBtnView(), document.querySelector('.films-list'));
  };
}

// const el = new CommonFilmsSectionView().getElement();

// console.log(el)
