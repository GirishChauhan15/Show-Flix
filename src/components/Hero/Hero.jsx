import React from "react";
import hero from "../../assets/hero.png";
import styles from "./Hero.module.css";
import Trending from "../Trending/Trending";
import { useMetaData } from "../../context";

function Hero() {
  const { inputRef } = useMetaData();
  return (
    <>
    <div className={styles.main}>
    
          <div className={styles.one}>
            <img className={styles.hero_img} loading='lazy' src={hero} alt="" />
            <div className={styles.fil}></div>
          </div>
    <div className={styles.container}>
        <div className={styles.wrap}>
          <div className={styles.two}>
            <h2 className={styles.heading}>Find Your Next Movie</h2>
            <p className={styles.info}>
              Searching for a movie? Our website makes it simple to discover all the
              details you need. Browse through an extensive collection and find your
              next favorite film in no time.
            </p>
            <button onClick={() => inputRef?.current ? inputRef.current.focus() : ''} className={styles.cta}>Search Movies</button>
          </div>
        </div>
    </div>
    </div>
    <Trending />
    
    </>
  );
}

export default Hero;
