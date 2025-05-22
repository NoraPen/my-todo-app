import React, { useState } from "react";
import LoginForm from "./Login";
import RegisterForm from "./Register";
import TodoList from "./ToDoList";

function getAuthToken() {
  const match = document.cookie.match(/authToken=([^;]+)/);
  return match ? match[1] : null;
}

export default function App() {
  const [user, setUser] = useState(null);
  const [showRegister, setShowRegister] = useState(false);

  const handleLogin = (userData, token) => {
    document.cookie = `authToken=${token}; path=/`;
    setUser(userData);
  };

  const handleLogout = () => {
    document.cookie = "authToken=; max-age=0; path=/";
    setUser(null);
  };

  if (!user) {
    return (
      <div style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
        {showRegister ? (
          <RegisterForm
            onRegister={(userData, token) => {
              handleLogin(userData, token);
              setShowRegister(false);
            }}
          />
        ) : (
          <LoginForm
            onLogin={(userData, token) => {
              handleLogin(userData, token);
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
      <h2>Welcome, {user.username}</h2>
      <button onClick={handleLogout}>Logout</button>
      <TodoList authToken={getAuthToken()} />
    </div>
  );
}