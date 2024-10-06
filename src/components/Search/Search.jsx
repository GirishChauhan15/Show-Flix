import { forwardRef, useRef, useState } from "react";
import React from "react";
import styles from "./Search.module.css";
import { useNavigate } from "react-router-dom";
import Loading from "../../assets/loading.gif";
import close from "../../assets/cross.png";
import {errorMessage} from '../../errorMsg/error.js'

const Search = forwardRef(({}, ref) => {
  const [searchData, setSearchData] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearchValue = (e) => {
    setSearchData(String(e.target.value));
  };

  const handleSearch = async (e) => {
    e?.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api", {
        method: "POST",
        body: JSON.stringify({
          searchData: `${searchData}`,
        }),
      });
      const data = await response.json();

      if (data?.length <= 0) {
        throw new Error("1");
      }
      if (!response.ok) {
        let status = String(response.status);
        if (status === "500") {
          throw new Error("2");
        } else {
          throw new Error("3");
        }
      }

      if (response.ok) {
        navigate("/search", { state: { movies: data } });
        setError(null);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.wrap}>
      <form className={styles.input_wrap} onSubmit={handleSearch}>
        <input
          ref={ref}
          className={styles.input_box}
          placeholder="Search for a movie..."
          type="text"
          value={searchData}
          onChange={handleSearchValue}
          required
        />
      </form>
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
                        <div className="error_msg">
                          {errorCode.errorMsg}
                        </div>
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
                                onClick={() => btn?.btnHandler(setError)}
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
                                onClick={() => btn?.btnHandler(setError, btn?.btnTitle === 'Search Movie' ? ref : handleSearch)}
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
    </div>
  );
});

export default Search;
