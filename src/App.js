import { Route, Routes } from "react-router-dom";
import React, { useState } from "react";
import Home from "./components/Home";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import TrackExpense from "./components/TrackExpense";
import NotFound from "./components/NotFound";

function App() {
  const [user, setUser] = useState({
    user: JSON.parse(localStorage.getItem("user")),
  });

  return (
    <>
      <Navbar user={user.user} setUser={setUser} />
      <div className="container">
        <Routes>
          {user.user === null ? (
            <>
              <Route
                path="/"
                element={<Login user={user.user} setUser={setUser} />}
              />
            </>
          ) : (
            <>
              <Route
                path="/track-expense"
                element={<TrackExpense user={user.user} />}
              />

              <Route
                path="/"
                element={<Home user={user.user} setUser={setUser} />}
              />
            </>
          )}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
