import React, { useState } from "react";
import styles from "./Card.module.css";
import { Link, useLocation } from "react-router-dom";

export default function Card() {
  const location = useLocation();
  const data = location.state?.movies || [];

  return (
    <>
      <ul className={`${styles.container} ${styles.wrap}`}>
        {data.map((movie) => (
          <Link
            key={movie.id}
            to={`/movie/${movie.id}-${(movie?.title || movie?.name).replace(
              /[^\w\s]|_/g,
              " "
            )}`}
          >
            <li className={styles.card} id={movie.id}>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={styles.svg_arrow}
                  fill="white"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <g>
                    <polygon points="11.707 3.293 10.293 4.707 17.586 12 10.293 19.293 11.707 20.707 20.414 12 11.707 3.293" />
                    <polygon points="5.707 3.293 4.293 4.707 11.586 12 4.293 19.293 5.707 20.707 14.414 12 5.707 3.293" />
                  </g>
                </svg>
              </div>
              <div className={styles.front}>
                <div>
                  <img
                    className={styles.poster}
                    src={`https://image.tmdb.org/t/p/w780${movie?.poster_path}`}
                    alt={movie?.title || movie?.name}
                  />
                  <div className={styles.blackFilter}></div>
                </div>
                <div className={styles.sub}>
                  <h3 className={styles.title}>
                    {movie?.title || movie?.name}
                  </h3>
                  <p className={styles.date}>
                    {String(
                      movie?.release_date || movie?.first_air_date
                    ).substring(0, 4)}
                  </p>
                </div>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </>
  );
}
