function todoItem({ title }) {
    return (
      <div>
        <p>{title}</p>
        <button>Edit</button>
        <button>Delete</button>
      </div>
    );
  }
  
  export default todoItem;