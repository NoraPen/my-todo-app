import React, { useState, useEffect } from "react";
import TodoItem from "./ToDoItem";

export default function TodoList({ authToken }) {
  const [todos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTodos = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const res = await fetch("http://localhost:3000/todos", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (!res.ok) throw new Error("Failed to fetch todos");
      const data = await res.json();
      setTodos(data);
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (authToken) {
      fetchTodos();
    }
  }, [authToken]);

  const handleAddTodo = async () => {
    if (!newTitle.trim()) {
      alert("Title is required");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ title: newTitle, description: newDescription }),
      });
      if (!res.ok) throw new Error("Failed to add todo");
      setNewTitle("");
      setNewDescription("");
      fetchTodos();
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <div>
      <h3>Your Todos</h3>

      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      <ul style={{ listStyle: "none", padding: 0 }}>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onUpdate={async (id, updatedData) => {
              try {
                const res = await fetch(`http://localhost:3000/todos/${id}`, {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authToken}`,
                  },
                  body: JSON.stringify(updatedData),
                });
                if (!res.ok) throw new Error("Failed to update todo");
                fetchTodos();
              } catch (e) {
                alert(e.message);
              }
            }}
            onDelete={async (id) => {
              if (!window.confirm("Delete this todo?")) return;
              try {
                const res = await fetch(`http://localhost:3000/todos/${id}`, {
                  method: "DELETE",
                  headers: { Authorization: `Bearer ${authToken}` },
                });
                if (!res.ok) throw new Error("Failed to delete todo");
                fetchTodos();
              } catch (e) {
                alert(e.message);
              }
            }}
          />
        ))}
      </ul>

      <h4>Add New Todo</h4>
      <input
        type="text"
        placeholder="Title"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        style={{ width: "100%", marginBottom: 5 }}
      />
      <textarea
        placeholder="Description"
        value={newDescription}
        onChange={(e) => setNewDescription(e.target.value)}
        style={{ width: "100%", height: 60, marginBottom: 5 }}
      />
      <button onClick={handleAddTodo} disabled={loading}>
        {loading ? "Adding..." : "Add Todo"}
      </button>
    </div>
  );
}