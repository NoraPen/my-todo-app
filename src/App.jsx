import React, { useState, useEffect } from "react";
import LoginForm from "./Login";
import RegisterForm from "./Register";
import TodoList from "./ToDoList";

function getAuthTokenFromCookie() {
  const match = document.cookie.match(/authToken=([^;]+)/);
  return match ? match[1] : null;
}

export default function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
   
    const tokenFromCookie = getAuthTokenFromCookie();
    if (tokenFromCookie) {
      
      setToken(tokenFromCookie);
      
    }
  }, []);

  const handleLogout = () => {
    document.cookie = "authToken=; max-age=0; path=/";
    setUser(null);
    setToken(null);
  };

  if (!user && !token) {
    return (
      <div style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
        {showRegister ? (
          <RegisterForm
            onRegister={(user) => {
              setUser(user);
              setToken(user.token);
              document.cookie = `authToken=${user.token}; path=/`;
              setShowRegister(false);
            }}
          />
        ) : (
          <LoginForm
            onLogin={(user) => {
              setUser(user);
              setToken(user.token);
              document.cookie = `authToken=${user.token}; path=/`;
            }}
          />
        )}
        <button
          onClick={() => setShowRegister(!showRegister)}
          style={{ marginTop: 10 }}
        >
          {showRegister ? "Back to Login" : "Register New User"}
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <h2>Welcome, {user ? user.email : "User"}</h2>
      <button onClick={handleLogout}>Logout</button>
      <TodoList authToken={token} />
    </div>
  );
}