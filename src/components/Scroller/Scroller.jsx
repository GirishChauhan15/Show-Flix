import React, { useCallback, useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import styles from "./Scroller.module.css";

function Scroller({ movieInfo }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    let mount = true;

    if (mount) {
      if (movieInfo?.length > 0) {
        setData(movieInfo);
      } else {
        setData([]);
      }
    }
    mount = false;
  }, [movieInfo]);

  let settings = {
    dots: false,
    infinite: true,
    speed: 400,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      {data?.length ? (
        <div className={styles.wrap}>
          <div className={styles.containerWrap}>
            <Slider {...settings}>
              {data.map((movie) => (
                <Link
                  key={movie.id}
                  id={movie.id}
                  className={styles.nav}
                  to={`/movie/${movie.id}-${(
                    movie?.title || movie?.name
                  ).replace(/[^\w\s]|_/g, " ")}`}
                >
                  <li>
                    <div className={styles.main}>
                      <div className={styles.one}>
                        <img
                          className={styles.postImg}
                          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                          alt={movie?.title || movie?.name}
                        />
                        <div className={styles.blackFil}></div>
                        <div className={styles.two}>
                          <h3 className={styles.movieTitle}>
                            {movie?.title || movie?.name}
                          </h3>
                          <p className={styles.relsDate}>
                            {String(
                              movie?.release_date || movie?.first_air_date
                            ).slice(0, 4)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                </Link>
              ))}
            </Slider>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default Scroller;
