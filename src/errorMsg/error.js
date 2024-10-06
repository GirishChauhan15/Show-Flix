export const errorMessage = [
  {
    id: 1,
    errorTitle: "Movie Not Found",
    errorMsg:
      "We couldn't find the movie you’re looking for. Please check the title and try again!",
    buttons: [
      {
        btnTitle: "exit",
        btnHandler: (setError) => handleClose(setError),
        btnClassName: "err_exit_btn",
        divClassName: "err_exit_div",
      },
      {
        btnTitle: "Search Movie",
        btnHandler: (setError, ref) => handleSearchRef(setError, ref),
        btnClassName: "err_search_btn",
        divClassName: "err_search_div",
      },
    ],
  },
  {
    id: 2,
    errorTitle: "Network Error",
    errorMsg:
      "It seems there’s a problem connecting to our movie database. Please check your internet connection and try again.",
    buttons: [
      {
        btnTitle: "exit",
        btnHandler: (setError,navigate) => handleCloseMovie(setError,navigate),
        btnClassName: "err_exit_btn",
        divClassName: "err_exit_div",
      },
      {
        btnTitle: "Retry",
        btnHandler: (setError, handleSearch) =>
          handleRetry(setError, handleSearch),
        btnClassName: "err_retry_btn",
        divClassName: "err_retry_div",
      },
    ],
  },
  {
    id: 3,
    errorTitle: "Something Went Wrong",
    errorMsg: "Sorry, there’s a problem on our end. Please check back soon!",
    buttons: [
      {
        btnTitle: "exit",
        btnHandler: (setError) => handleClose(setError),
        btnClassName: "err_exit_btn",
        divClassName: "err_exit_div",
      },
    ],
  },
  {
    id: 4,
    errorTitle: "Network Error",
    errorMsg:
      "It seems there’s a problem connecting to our movie database. Please check your internet connection and try again.",
    buttons: [
      {
        btnTitle: "exit",
        btnHandler: (setDayError) => handleClose(setDayError),
        btnClassName: "err_exit_btn",
        divClassName: "err_exit_div",
      },
      {
        btnTitle: "Retry",
        btnHandler: (setDayError, fetchTrendingDay) =>
          handleRetry(setDayError, fetchTrendingDay),
        btnClassName: "err_retry_btn",
        divClassName: "err_retry_div",
      },
    ],
  },
  {
    id: 5,
    errorTitle: "Unable to Refresh Feed",
    errorMsg:
      "We can't fetch Trending movies right now, but you can still see your previous data.",
    buttons: [
      {
        btnTitle: "exit",
        btnHandler: (setError) => handleClose(setError),
        btnClassName: "err_exit_btn",
        divClassName: "err_exit_div",
      },
    ],
  },
  {
    id: 6,
    errorTitle: "Something Went Wrong",
    errorMsg: "Sorry, there’s a problem on our end. Please check back soon!",
    buttons: [
      {
        btnTitle: "exit",
        btnHandler: (setError) => handleClose(setError),
        btnClassName: "err_exit_btn",
        divClassName: "err_exit_div",
      },
    ],
  },
];

// Exit
export const handleClose = (setError) => {
  setError(null);
};

export const handleCloseMovie = (setError,navigate) => {
  setError(null);
  navigate(-1)
};

// Retry
export const handleRetry = (setError, handleSearch) => {
  setError(null);
  setTimeout(() => {
    handleSearch();
  }, 1000);
};

// Search
export const handleSearchRef = (setError, ref) => {
  setError(null);
  ref?.current.focus();
};
