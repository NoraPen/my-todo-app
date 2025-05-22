function TodoForm() {
    return (
      <form>
        <input type="text" placeholder="Todo title" />
        <textarea placeholder="Description"></textarea>
        <button type="submit">Save</button>
      </form>
    );
  }
  
  export default TodoForm;