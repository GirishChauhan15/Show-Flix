import { useState } from "react";
import styles from "./App.module.css";
import { SearchProvider } from "./context";
import Card from "./components/Card";

function App() {
  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState("");
  const [error, setError] = useState(null);

  const handleSearchValue = (e) => {
    setSearchData(String(e.target.value));
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api", {
        method : 'POST',
        body : JSON.stringify({
          searchData : `${searchData}`
        })
      });
      const data = await response.json();
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
        <Card />
      </div>
    </SearchProvider>
  );
}

export default App;
