import React, { useState, useRef } from "react";
import { Outlet } from "react-router-dom";
import { MetaProvider } from "./context";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

function Layout() {
  const [dayError, setDayError] = useState(null);
  const [dayLoading, setDayLoading] = useState(false);
  const [weekError, setWeekError] = useState(null);
  const [weekLoading, setWeekLoading] = useState(false);
  const inputRef = useRef();
  return (
    <MetaProvider
      value={{
        dayError,
        setDayError,
        dayLoading,
        setDayLoading,
        weekError,
        setWeekError,
        weekLoading,
        setWeekLoading,
        inputRef,
      }}
    >
      <Header />
      <Outlet />
      <Footer />
    </MetaProvider>
  );
}

export default Layout;
