import { TodoForm } from "./components/TodoForm";
import TodoList from './components/TodoList'
import './App.css';
import { useCallback, useEffect, useState } from "react";
import { Fa0 } from "react-icons/fa6";

function App() {
  const [todos, setTodos] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  // const [inputValue, setInputValue] = useState("");

  // Load to Localstorage
  useEffect(() => {
    const storedTodos = localStorage.getItem('todos')
    if (storedTodos) setTodos(JSON.parse(storedTodos));
    setHasLoaded(true);
  }, []);

  // Save to Localstorage
  useEffect(() => {
    if (hasLoaded) localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos, hasLoaded]);

  const addTodo = useCallback((todoText) => {
    setTodos(todos => [...todos, {id: Date.now(), text: todoText, isComplete: false}])
  }, [])

  const toggleComplete = (id) => {
    setTodos(todos.map(todo => (
      todo.id === id ? {...todo, isComplete: !todo.isComplete } : todo
    )))
  }

  const onDelete = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  }

  const onEdit = (id, newTodo) => {
    setTodos(todos.map(todo => (
      todo.id === id ? {...todo, text: newTodo } : todo
    )));
  }

  return (
    <div className="todo-app">
      <h1>To-Do List</h1>
      <TodoForm addTodo={addTodo} />
      <div className="todo-scroll-area">
      <TodoList onEdit={onEdit} onDelete={onDelete} onToggle={toggleComplete} todos={todos}/>
      </div>
    </div>
  );
}

export default App;
