import React, { useState, useEffect } from "react";

export default function TodoList({ authToken }) {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editCompleted, setEditCompleted] = useState(false);

  // Fetch todos on mount
  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://localhost:3000/todos", {
        headers: { Authorization: authToken },
      });
      if (!res.ok) throw new Error("Failed to fetch todos");
      const data = await res.json();
      setTodos(data.todos);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  async function createTodo() {
    if (!newTitle.trim()) return alert("Title is required");
    try {
      const res = await fetch("http://localhost:3000/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authToken,
        },
        body: JSON.stringify({ title: newTitle, description: newDescription }),
      });
      if (!res.ok) throw new Error("Failed to create todo");
      setNewTitle("");
      setNewDescription("");
      fetchTodos();
    } catch (e) {
      alert(e.message);
    }
  }

  async function updateTodo(id) {
    if (!editTitle.trim()) return alert("Title is required");
    try {
      const res = await fetch(`http://localhost:3000/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: authToken,
        },
        body: JSON.stringify({
          title: editTitle,
          description: editDescription,
          completed: editCompleted,
        }),
      });
      if (!res.ok) throw new Error("Failed to update todo");
      setEditingId(null);
      fetchTodos();
    } catch (e) {
      alert(e.message);
    }
  }

  async function deleteTodo(id) {
    if (!window.confirm("Delete this todo?")) return;
    try {
      const res = await fetch(`http://localhost:3000/todos/${id}`, {
        method: "DELETE",
        headers: { Authorization: authToken },
      });
      if (!res.ok) throw new Error("Failed to delete todo");
      fetchTodos();
    } catch (e) {
      alert(e.message);
    }
  }

  if (loading) return <p>Loading todos...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div>
      <h3>Your Todos</h3>

      {/* Create new todo form */}
      <div style={{ marginBottom: 20 }}>
        <h4>Create New Todo</h4>
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
        <button onClick={createTodo}>Add Todo</button>
      </div>

      {/* List todos */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{
              marginBottom: 10,
              padding: 10,
              border: "1px solid #ccc",
              backgroundColor: todo.completed ? "#e0ffe0" : "white",
            }}
          >
            {editingId === todo.id ? (
              <>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  style={{ width: "100%", marginBottom: 5 }}
                />
                <textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  style={{ width: "100%", height: 60, marginBottom: 5 }}
                />
                <label>
                  <input
                    type="checkbox"
                    checked={editCompleted}
                    onChange={(e) => setEditCompleted(e.target.checked)}
                  />
                  Completed
                </label>
                <br />
                <button onClick={() => updateTodo(todo.id)}>Save</button>
                <button onClick={() => setEditingId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <h4 style={{ margin: "0 0 5px 0" }}>
                  {todo.title}{" "}
                  {todo.completed && (
                    <span style={{ color: "green" }}>(Completed)</span>
                  )}
                </h4>
                <p>{todo.description}</p>
                <button
                  onClick={() => {
                    setEditingId(todo.id);
                    setEditTitle(todo.title);
                    setEditDescription(todo.description);
                    setEditCompleted(todo.completed);
                  }}
                >
                  Edit
                </button>{" "}
                <button onClick={() => deleteTodo(todo.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}