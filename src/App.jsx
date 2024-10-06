import styles from "./App.module.css";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className={styles.wrap}>
      <Outlet />
    </div>
  );
}

export default App;
