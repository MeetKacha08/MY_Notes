import { useState } from "react";
import Note from "./Note List Page/Note";
import Login from "./Login page/Login.jsx";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = (e) => {
    e.preventDefault();

    if (
      loginData.email === "admin@gmail.com" &&
      loginData.password === "123456"
    ) {
      setIsLoggedIn(true);
    } else {
      alert("Invalid Email or Password");
    }
  };

  return (
    <>
      {isLoggedIn ? (
        <Note />
      ) : (
        <Login
          loginData={loginData}
          setLoginData={setLoginData}
          handleLogin={handleLogin}
        />
      )}
    </>
  );
}

export default App;