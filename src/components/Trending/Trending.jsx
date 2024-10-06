import React, { useCallback, useEffect, useState } from "react";
import styles from "./Trending.module.css";
import Scroller from "../Scroller/Scroller";
import { useMetaData } from "../../context";
import { errorMessage } from "../../errorMsg/error";
import close from "../../assets/cross.png";
import Loading from "../../assets/loading.gif";

function Trending() {
  const {
    dayError,
    setDayError,
    dayLoading,
    setDayLoading,
    weekError,
    setWeekError,
    weekLoading,
    setWeekLoading,
  } = useMetaData();
  const [dayData, setDayData] = useState([]);
  const [weekData, setWeekData] = useState([]);

  const fetchTrendingDay = useCallback(async () => {
    setDayLoading(true);
    try {
      const cachedData = localStorage?.getItem("day");
      const newData = cachedData?.length ? JSON.stringify(cachedData) : null;

      if (cachedData?.length) {
        setDayData(JSON.parse(cachedData));
      }

      const response = await fetch("/trend/day", {
        method: "POST",
      });

      const data = await response.json();

      if (!response.ok) {
        let status = String(response.status);
        if (status === "500" && newData === null) {
          throw new Error("4");
        } else if (status === "500" && newData !== null) {
          throw new Error("5");
        } else {
          throw new Error("6");
        }
      }

      if (response.ok) {
        if (data?.length > 0) {
          if (JSON.stringify(data) !== JSON.stringify(newData)) {
            localStorage.setItem("day", JSON.stringify(data));
            setDayData(data);
            setDayError(null);
          }
        }
      }
    } catch (error) {
      setDayError(error.message);
    } finally {
      setDayLoading(false);
    }
  }, []);

  const fetchTrendingWeek = useCallback(async () => {
    setWeekLoading(true);
    try {
      const cachedData = localStorage?.getItem("week");
      const newData = cachedData?.length ? JSON.stringify(cachedData) : null;

      if (cachedData?.length) {
        setWeekData(JSON.parse(cachedData));
      }

      const response = await fetch("/trend/week", {
        method: "POST",
      });

      const data = await response.json();

      if (!response.ok) {
        let status = String(response.status);
        if (status === "500" && newData === null) {
          throw new Error("4");
        } else if (status === "500" && newData !== null) {
          throw new Error("5");
        } else {
          throw new Error("6");
        }
      }

      if (response.ok) {
        if (data?.length > 0) {
          if (JSON.stringify(data) !== JSON.stringify(newData)) {
            localStorage.setItem("week", JSON.stringify(data));
            setWeekData(data);
            setWeekError(null);
          }
        }
      }
    } catch (error) {
      setWeekError(error.message);
    } finally {
      setWeekLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTrendingDay();
    fetchTrendingWeek();
  }, []);

  const errorHandler = (error) => {
    setTimeout(() => {
      error(null);
    }, 5000);
  };
  if (dayError === "5") {
    errorHandler(setDayError);
  } else if (weekError === "5") {
    errorHandler(setWeekError);
  } else if (dayError === "5" && weekError === "5") {
    errorHandler(setDayError)
    errorHandler(setWeekError)
  }

  return (
    <>
      {dayLoading && (
        <div className={styles.loading}>
          <img className={styles.loading_img} src={Loading} alt="Loading" />
        </div>
      )}

      {dayError && (
        <div className="scroll_error">
          {errorMessage
            ? errorMessage?.map((errorCode) =>
                String(errorCode.id) === String(dayError) ? (
                  <div key={errorCode.id} className="small_container">
                    <div className="error_wrap">
                      <div className="error_title">{errorCode.errorTitle}</div>
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
                              onClick={() => btn?.btnHandler(setDayError)}
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
                                btn?.btnHandler(
                                  setDayError,
                                  btn?.btnTitle === "Retry" && fetchTrendingDay
                                )
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
      )}

      <div className={styles.T_container}>
        {dayError === "5" || dayData?.length ? (
          <div className={styles.T_wrap}>
            <h3 className={styles.T_title}>Trending Today</h3>
          </div>
        ) : (
          ""
        )}
        <Scroller movieInfo={dayData} />

        {weekLoading && (
          <div className={styles.loading}>
            <img className={styles.loading_img} src={Loading} alt="Loading" />
          </div>
        )}

        {weekError && (
          <div className="scroll_error">
            {errorMessage
              ? errorMessage?.map((errorCode) =>
                  String(errorCode.id) === String(weekError) ? (
                    <div key={errorCode.id} className="small_container">
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
                                onClick={() => btn?.btnHandler(setWeekError)}
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
                                  btn?.btnHandler(
                                    setWeekError,
                                    btn?.btnTitle === "Retry" &&
                                      fetchTrendingWeek
                                  )
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
        )}

        {weekError === "5" || weekData?.length ? (
          <div className={styles.T_wrap}>
            <h3 className={styles.T_title}>Trending This Week</h3>
          </div>
        ) : (
          ""
        )}

        <Scroller movieInfo={weekData} />
      </div>
    </>
  );
}

export default Trending;
