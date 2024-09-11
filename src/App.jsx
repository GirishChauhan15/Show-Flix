import { useState } from "react";
import styles from "./App.module.css";
import { SearchProvider } from "./context";
import Card from "./components/Card";
import Loading from "./assets/loading.gif";

function App() {
  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearchValue = (e) => {
    setSearchData(String(e.target.value));
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api", {
        method: "POST",
        body: JSON.stringify({
          searchData: `${searchData}`,
        }),
      });
      const data = await response.json();

      if (data.length === 0) {
        throw new Error("No data found");
      }

      if (response.ok) {
        setData(data);
        setError(null);
      } else {
        setError(data.message);
        setData([]);
      }
    } catch (error) {
      setError(error.message);
      setData([]);
    } finally {
      setLoading(false)
    }
  };

  if (error) {
    setTimeout(() => {
      setError(null);
    }, 3000);
  }

  return (
    <SearchProvider value={{ data, setData }}>
      <h1 className={styles.title}>Show Flix</h1>
      <div className={styles.wrap}>
        <form className={styles.input_wrap} onSubmit={handleSearch}>
          <input
            className={styles.input_box}
            placeholder="Search for a movie..."
            type="text"
            onChange={handleSearchValue}
            required
          />
        </form>
        {error && <div className={styles.error}>* {error}</div>}
        {loading && (
          <div className={styles.loading}>
            <img className={styles.loading_img} src={Loading} alt="Loading" />
          </div>
        )}
        <Card />
      </div>
    </SearchProvider>
  );
}

export default App;
