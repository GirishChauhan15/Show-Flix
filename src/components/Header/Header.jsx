import React, { useState } from "react";
import styles from "./Header.module.css";
import { Link, NavLink } from "react-router-dom";
import Search from "../Search/Search";
import menu from "../../assets/menu.png";
import close from "../../assets/cross.png";
import { useMetaData } from "../../context";

function Header() {
  const [nav, setNav] = useState(false);
  const { inputRef } = useMetaData()
  return (
    <div className={styles.wrap}>
      <div className={styles.container}>
        <div>
          <Link to={"/"}>
            <h1 className={styles.title}>Show Flix</h1>
          </Link>
        </div>
        {!nav && (
          <img
            className={styles.menu}
            onClick={() => setNav(true)}
            src={menu}
            alt="menu"
          />
        )}
        <div className={nav ? styles.nav : styles.hide}>
          {nav && (
            <img
              className={styles.close}
              onClick={() => setNav(false)}
              src={close}
              alt="close menu"
            />
          )}
          <NavLink
            to={"/"}
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Home
          </NavLink>
          <NavLink
            to={"/about-us"}
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            About us
          </NavLink>
        </div>
      </div>
        <div>
          <Search ref={inputRef}/>
        </div>
    </div>
  );
}

export default Header;
