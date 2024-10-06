import React from "react";
import styles from "./AboutUs.module.css";
import { useMetaData } from "../../context";
import About from "../../assets/about.png";

function AboutUs() {
  const { inputRef } = useMetaData();
  return (
    <div className={styles.wrap}>
      <div className={styles.main}>
        <div className={styles.one}>
          <h2 className={styles.title}>About Us</h2>
          <p className={styles.info}>
            Welcome to Show Flix, your ultimate destination for discovering
            movies! We believe that finding the right film should be as
            enjoyable as watching it.
          </p>

          <p className={styles.info}>
            Our platform allows you to easily search through a vast collection
            of movies, from timeless classics to the latest releases. With a
            user-friendly interface and comprehensive movie data, we aim to help
            you explore different genres, plot summaries, and more.
          </p>
          <p className={styles.info}>
            Whether you’re a casual viewer or a movie enthusiast, we’re here to
            enhance your cinematic experience. Join us in celebrating the magic
            of film and find your next favorite movie today!
          </p>
          <p className={styles.info}>
            Ready to start your movie journey?
            <button
            className={styles.cta}
              onClick={() =>
                inputRef?.current ? inputRef.current.focus() : ""
              }
            >
              Search Now
            </button>
          </p>
        </div>
        <div className={styles.two}>
          <img className={styles.about_img} src={About} loading="lazy" alt="Illustration" />
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
