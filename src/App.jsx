import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import UserDetails from "../pages/UserDetails";


function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  }
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900"></div>
      <Routes>
        <Route
          path="/"
          element={
            <Home darkMode={darkMode} setDarkMode={setDarkMode} />
          }
        />
        <Route
          path="/users/:id"
          element={
            <UserDetails darkMode={darkMode} setDarkMode={setDarkMode} />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;