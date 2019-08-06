import React from 'react';
import { Link } from 'react-router-dom';

const Details = () => {
  return (
    <div>
      <h2 className="heading-secundary u-margin-left-small ">Comentarios</h2>
      <div className="details__wrapper">
        <div className="score-container">
          <div>
            <span className="score">7.6</span>
            <span className="score__txt">Muy bueno</span>
          </div>

          <div>
            <p className="details__txt">
              Puntuación basada en <span>63 comentarios</span>
            </p>
          </div>
        </div>
        <div className="details">
          <div className="comments-container">
            <div className="u-margin-bottom-small">
              <div className="reviews__avatar">
                <img
                  src="/images/Users/user-3.jpg"
                  alt="User-image"
                  className="reviews__avatar--img"
                />
                <span>Anonimo</span>
              </div>

              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel
                dolorum, debitis eveniet aut voluptas maiores enim fugiat
                incidunt delectus repellat commodi ipsa voluptatibus atque
                neque, dicta expedita. Repellendus, eius nam.
              </p>

              <div className="comments__rating">
                <div>
                  <svg className="comments__rating-icon icon--active">
                    <use xlinkHref="images/sprite.svg#icon-star-outlined"></use>
                  </svg>
                  <svg className="comments__rating-icon icon--active">
                    <use xlinkHref="images/sprite.svg#icon-star-outlined"></use>
                  </svg>
                  <svg className="comments__rating-icon icon--active">
                    <use xlinkHref="images/sprite.svg#icon-star-outlined"></use>
                  </svg>
                  <svg className="comments__rating-icon icon--active">
                    <use xlinkHref="images/sprite.svg#icon-star-outlined"></use>
                  </svg>
                  <svg className="comments__rating-icon icon--inactive">
                    <use xlinkHref="images/sprite.svg#icon-star-outlined"></use>
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <div className="reviews__avatar">
                <img
                  src="/images/Users/user-3.jpg"
                  alt="User-image"
                  className="reviews__avatar--img"
                />
                <span>Anonimo</span>
              </div>

              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel
                dolorum, debitis eveniet aut voluptas maiores enim fugiat
                incidunt delectus repellat commodi ipsa voluptatibus atque
                neque, dicta expedita. Repellendus, eius nam.
              </p>

              <div className="comments__rating">
                <div>
                  <svg className="comments__rating-icon icon--active">
                    <use xlinkHref="images/sprite.svg#icon-star-outlined"></use>
                  </svg>
                  <svg className="comments__rating-icon icon--active">
                    <use xlinkHref="images/sprite.svg#icon-star-outlined"></use>
                  </svg>
                  <svg className="comments__rating-icon icon--active">
                    <use xlinkHref="images/sprite.svg#icon-star-outlined"></use>
                  </svg>
                  <svg className="comments__rating-icon icon--active">
                    <use xlinkHref="images/sprite.svg#icon-star-outlined"></use>
                  </svg>
                  <svg className="comments__rating-icon icon--inactive">
                    <use xlinkHref="images/sprite.svg#icon-star-outlined"></use>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
