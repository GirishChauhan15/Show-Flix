import React, { useState } from "react";
import { useData } from "../context";
import bg from "../assets/Card_bg.jpg";
import styles from "./Card.module.css"

export default function Card() {
  const [cardKey, setCardKey] = useState("");
  const [cardVisible, setCardVisible] = useState(false);

  const { data } = useData();

  const filteredMovies = data.filter((movie) => movie.poster_path !== null);

  const handleClick = (e) => {
    if (e.target.parentNode.parentNode.className === styles.card) {
      setCardKey(e.target.parentNode.parentNode.id);
    } else if (
      e.target.parentNode.parentNode.className.baseVal === styles.svg_arrow
    ) {
      setCardKey(e.target.parentNode.parentNode.parentNode.parentNode.id);
    }
    setCardVisible(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleExit = (e) => {
    setCardVisible(false);
  };

  let filteredCardInfo = data.filter(
    (movie) => String(movie.id) === String(cardKey)
  );

  return (
    <>
      {cardVisible && filteredCardInfo.length > 0 ? (
        <div className={styles.parent_card}>
          <div className={styles.bg_image}>
            <img className={styles.bg_image_img} src={bg} alt="background image" />
          </div>
          <div className={styles.exit} onClick={handleExit}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={styles.exit_svg}
              fill="white"
              width="17.828"
              height="17.828"
              viewBox="0 0 17.828 17.828"
            >
              <polygon points="2.828 17.828 8.914 11.742 15 17.828 17.828 15 11.742 8.914 17.828 2.828 15 0 8.914 6.086 2.828 0 0 2.828 6.085 8.914 0 15 2.828 17.828" />
            </svg>
          </div>
          <div className={styles.card_image}>
            <img
              className={styles.card_poster}
              src={`https://image.tmdb.org/t/p/w780/${filteredCardInfo[0].poster_path}`}
              alt={filteredCardInfo[0].title}
            />
          </div>
          <div className={styles.card_content}>
            <div className={styles.card_info}>
              <h3 className={styles.card_title}>{filteredCardInfo[0].title}</h3>
              <p className={styles.card_year}>
                {String(filteredCardInfo[0].release_date).substring(0, 4)}
              </p>
            </div>
            <div className={styles.card_overview}>{filteredCardInfo[0].overview}</div>
          </div>
        </div>
      ) : (
        ""
      )}
      <ul className={styles.container}>
        {filteredMovies.map((movie) => (
          <li className={styles.card} id={movie.id} key={movie.id}>
            <div onClick={handleClick}>
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
              <div className={styles.img_wrap}>
                <img
                  className={styles.poster}
                  src={`https://image.tmdb.org/t/p/w780/${movie.poster_path}`}
                  alt={movie.title}
                />
                <div className={styles.blackFilter}></div>
              </div>
              <div className={styles.sub}>
                <h3 className={styles.title}>{movie.title}</h3>
                <p className={styles.date}>
                  {String(movie.release_date).substring(0, 4)}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}