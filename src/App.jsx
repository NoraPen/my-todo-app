import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import LoginForm from './components/login';
import TodoList from './components/show-list';
import TodoForm from './components/todo-form';


function App() {
  return (
    <div>
      <h1>My Todo List App</h1>
      <LoginForm />
      <TodoForm />
      <TodoList />
    </div>
  );
}

export default App;