import axios from 'axios';

const API_URL = 'http://localhost:5000/todos';

export const fetchTodos = () => axios.get(API_URL);

export const addTodo = (todo) => axios.post(API_URL, todo);

export const deleteTodo = (id) => axios.delete(`${API_URL}/${id}`);

export const updateTodo = (id, todo) => axios.put(`${API_URL}/${id}`, todo);
