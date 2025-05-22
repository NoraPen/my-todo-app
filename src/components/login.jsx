import { useState } from 'react';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const API_URL = 'http://localhost:3000'; 

  const handleAuth = async (endpoint) => {
    try {
      const response = await fetch(`${API_URL}/auth/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        
        document.cookie = `authToken=${data.token}; path=/`;
        setMessage('Success! Logged in.');
      } else {
        setMessage(data.message || 'Authentication failed.');
      }
    } catch (error) {
      setMessage('Error connecting to server.');
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Login or Register</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        /><br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br />
        <button type="button" onClick={() => handleAuth('register')}>Register</button>
        <button type="button" onClick={() => handleAuth('login')}>Login</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default LoginForm;