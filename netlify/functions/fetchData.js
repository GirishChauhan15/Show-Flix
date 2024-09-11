exports.handler = async (event, context) => {
  const MOVIE_API = process.env.API_KEY;
  const searchData = JSON.parse(event.body).searchData;

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API}&query=${searchData}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data.results),
    };
  } catch (error) {
    return {
      statusCode: error.statusCode || 500,
      body: JSON.stringify({ message: error.message }),
    };
  }
};
