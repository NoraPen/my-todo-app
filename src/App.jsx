import React, { useState, useEffect } from "react";
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

  
  useEffect(() => {
    const token = getAuthToken();
    if (token) {
      
      fetch("http://localhost:3000/auth/verify", {
        headers: { Authorization: token },
      })
        .then((res) => {
          if (!res.ok) throw new Error("Not authorized");
          return res.json();
        })
        .then((data) => setUser(data.user))
        .catch(() => {
          
          document.cookie = "authToken=; max-age=0; path=/";
          setUser(null);
        });
    }
  }, []);

  const handleLogout = () => {
    document.cookie = "authToken=; max-age=0; path=/";
    setUser(null);
  };

  if (!user) {
    return (
      <div style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
        {showRegister ? (
          <RegisterForm
            onRegister={(user) => {
              setUser(user);
              setShowRegister(false);
            }}
          />
        ) : (
          <LoginForm
            onLogin={(user) => {
              setUser(user);
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
      <h2>Welcome, {user.email}</h2>
      <button onClick={handleLogout}>Logout</button>
      <TodoList authToken={getAuthToken()} />
    </div>
  );
}