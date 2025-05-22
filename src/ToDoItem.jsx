import React, { useState } from "react";

export default function TodoItem({
  todo,
  onUpdate,
  onDelete,
}) {
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description);
  const [editCompleted, setEditCompleted] = useState(todo.completed);

  const save = () => {
    if (!editTitle.trim()) {
      alert("Title is required");
      return;
    }
    onUpdate(todo.id, {
      title: editTitle,
      description: editDescription,
      completed: editCompleted,
    });
    setEditing(false);
  };

  if (editing) {
    return (
      <li
        style={{
          marginBottom: 10,
          padding: 10,
          border: "1px solid #ccc",
          backgroundColor: editCompleted ? "#e0ffe0" : "white",
        }}
      >
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
          />{" "}
          Completed
        </label>
        <br />
        <button onClick={save}>Save</button>{" "}
        <button onClick={() => setEditing(false)}>Cancel</button>
      </li>
    );
  }

  return (
    <li
      style={{
        marginBottom: 10,
        padding: 10,
        border: "1px solid #ccc",
        backgroundColor: todo.completed ? "#e0ffe0" : "white",
      }}
    >
      <h4 style={{ margin: "0 0 5px 0" }}>
        {todo.title} {todo.completed && <span style={{ color: "green" }}>(Completed)</span>}
      </h4>
      <p>{todo.description}</p>
      <button onClick={() => setEditing(true)}>Edit</button>{" "}
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </li>
  );
}