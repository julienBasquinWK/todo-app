import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ToDo from './ToDo';
import ToDoForm from './ToDoForm';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);

  // Charger les tâches depuis l'API
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get('http://localhost:5000/todos');
        console.log('Fetched todos:', response.data);
        setTodos(response.data);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };
    fetchTodos().then(r => console.log('Todos fetched'));
  }, []);

  // Ajouter une nouvelle tâche
  const addTodo = async (text) => {
    try {
      const response = await axios.post('http://localhost:5000/todos', { text });
      console.log('Todo added:', response.data);
      setTodos([...todos, response.data]);
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  // Marquer une tâche comme complétée
  const toggleComplete = async (id, completed) => {
    try {
      await axios.patch(`http://localhost:5000/todos/${id}`, { completed: !completed });
      setTodos(todos.map(todo => (todo._id === id ? { ...todo, completed: !completed } : todo)));
      console.log('Todo toggled:', id);
    } catch (error) {
      console.error('Error toggling todo:', error);
    }
  };

  // Supprimer une tâche
  const removeTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/todos/${id}`);
      setTodos(todos.filter(todo => todo._id !== id));
      console.log('Todo removed:', id);
    } catch (error) {
      console.error('Error removing todo:', error);
    }
  };

  return (
      <div className="app">
        <h1>To-Do List</h1>
        <ToDoForm addTodo={addTodo} />
        <div className="todo-list">
          {todos.map(todo => (
              <ToDo
                  key={todo._id}
                  id={todo._id}
                  todo={todo}
                  toggleComplete={toggleComplete}
                  removeTodo={removeTodo}
              />
          ))}
        </div>
      </div>
  );
}

export default App;
