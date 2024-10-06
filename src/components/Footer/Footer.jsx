import React from "react";
import { Link, NavLink } from "react-router-dom";
import styles from "./Footer.module.css";
function Footer() {
  return (
    <div className={styles.bg}>
      <div className={styles.wrap}>
        <div className={styles.container}>
          <div className={styles.parent}>
            <div className={styles.nav}>
              <h3 className={styles.title}>Explore</h3>
              <nav>
                <ul className={styles.list}>
                  <NavLink
                    to={"/"}
                    className={({ isActive }) =>
                      isActive ? styles.active : ""
                    }
                  >
                    Home
                  </NavLink>
                  <NavLink
                    to={"/about-us"}
                    className={({ isActive }) =>
                      isActive ? styles.active : ""
                    }
                  >
                    About us
                  </NavLink>
                </ul>
              </nav>
            </div>
            <div className={styles.sub}>
              <div className={styles.contact}>
                <h3 className={styles.title}>Get in Touch</h3>
              </div>
              <div className={styles.social}>
                <Link target="blank" to={"https://github.com/GirishChauhan15"}>
                  Github
                </Link>
                <Link
                  target="blank"
                  to={"https://www.linkedin.com/in/girish-chauhan/"}
                >
                  Linkedin
                </Link>
              </div>
              <p>
                Email :<br />
                <Link
                  className={styles.email}
                  target="blank"
                  to={"mailto:contact.girishchauhan@gmail.com"}
                >
                  contact.girishchauhan@gmail.com
                </Link>
              </p>
            </div>
          </div>
          <p className={styles.copyRight}>
            © 2024 Film Finder. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
