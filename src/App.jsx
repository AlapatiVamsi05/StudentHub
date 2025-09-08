import { useState, useEffect } from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import Profile from "./components/Profile";

function App() {
  const [page, setPage] = useState("home");
  const [loggedInUserId, setLoggedInUserId] = useState(null);

  useEffect(() => {
    const savedId = localStorage.getItem("loggedinUserid");
    if (savedId) setLoggedInUserId(savedId);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedinUserid");
    setLoggedInUserId(null);
    alert("Logged out");
    setPage("home");
  };

  return (
    <>
      <Header
        setPage={setPage}
        isLoggedIn={!!loggedInUserId}
        handleLogout={handleLogout}
      />
      {page === "home" && <Home />}
      {page === "login" && (
        <Login setPage={setPage} setLoggedInUserId={setLoggedInUserId} />
      )}
      {page === "profile" && <Profile loggedInUserId={loggedInUserId} />}
    </>
  );
}

export default App;
