const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
exports.handler = async (event) => {
  const MOVIE_API = process.env.API_KEY;
  const movieName = JSON.parse(event.body).movieName;

  await delay(1000);

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/multi?api_key=${MOVIE_API}&query=${movieName}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();

    const result = data.results;

    const filteredMovies = result.filter((movie) => movie.poster_path);

    return {
      statusCode: 200,
      body: JSON.stringify(filteredMovies),
    };
  } catch (error) {
    return {
      statusCode: error.statusCode || 500,
      body: JSON.stringify({ message: error.message }),
    };
  }
};
