import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "../MovieInfo/MovieInfo.module.css";
import Loading from "../../assets/loading.gif";
import close from "../../assets/cross.png";
import { errorMessage } from "../../errorMsg/error.js";

function MovieInfo() {
  const { movie_id } = useParams();
  const [data, setData] = useState({});
  const [show, setShow] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const movieId = movie_id.split("-")[0];
  const movieName = movie_id.split("-")[1];

  const findMovie = async () => {
    setLoading(true);
    try {
      const response = await fetch("/movie", {
        method: "POST",
        body: JSON.stringify({
          movieName: `${movieName}`,
        }),
      });
      const data = await response.json();

      if (data?.length <= 0) {
        throw new Error("3");
      }
      if (!response.ok) {
        setShow(false);
        let status = String(response.status);
        // setData({});
        if (status === "500") {
          throw new Error("2");
        } else {
          throw new Error("3");
        }
      }

      if (response.ok) {
        setShow(true);
        const newData = data.filter(
          (movie) => String(movie.id) === String(movieId)
        );
        setData(newData[0]);
        setError(null);
      }
    } catch (error) {
      setError(error.message);
      // setData({});
      setShow(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      findMovie();
    }, 1000);
  }, [movie_id]);

  return (
    <div className={styles.wrap}>
      {error && (
        <div className="error">
          <div className="container">
            {errorMessage
              ? errorMessage?.map((errorCode) =>
                  String(errorCode.id) === String(error) ? (
                    <div key={errorCode.id}>
                      <div className="error_wrap">
                        <div className="error_title">
                          {errorCode.errorTitle}
                        </div>
                        <div className="error_msg">{errorCode.errorMsg}</div>
                      </div>
                      <div className="error_two">
                        {errorCode?.buttons.map((btn) =>
                          btn?.btnTitle === "exit" ? (
                            <div
                              key={btn?.btnTitle}
                              className={btn?.divClassName}
                            >
                              <button
                                className={btn?.btnClassName}
                                onClick={() =>
                                  btn?.btnHandler(setError, navigate)
                                }
                              >
                                <img
                                  className="close"
                                  src={close}
                                  alt="close menu"
                                />
                              </button>
                            </div>
                          ) : (
                            <div
                              key={btn?.btnTitle}
                              className={btn?.divClassName}
                            >
                              <button
                                className={btn?.btnClassName}
                                onClick={() =>
                                  btn?.btnHandler(setError, findMovie)
                                }
                              >
                                {btn?.btnTitle}
                              </button>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  ) : (
                    ""
                  )
                )
              : ""}
          </div>
        </div>
      )}

      {loading && (
        <div className={styles.loading}>
          <img className={styles.loading_img} src={Loading} alt="Loading" />
        </div>
      )}
      {show ? (
        <div className={styles.parent_card} id={data?.id}>
          <div className={styles.bg_image}></div>
          <div className={styles.exit} onClick={() => navigate(-1)}>
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
              src={`https://image.tmdb.org/t/p/w780/${data?.poster_path}`}
              alt={data?.title || data?.name}
            />
          </div>
          <div className={styles.card_content}>
            <div className={styles.card_info}>
              <h3 className={styles.card_title}>{data?.title || data?.name}</h3>
              <p className={styles.card_year}>
                {String(data?.release_date || data?.first_air_date).substring(
                  0,
                  4
                )}
              </p>
            </div>
            <div className={styles.card_overview}>{data?.overview}</div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default MovieInfo;
