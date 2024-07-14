import React from 'react';

function ToDo({ todo, id, toggleComplete, removeTodo }) {
    return (
        <div
            className="todo"
            style={{ textDecoration: todo.completed ? 'line-through' : '' }}
        >
            {todo.text}
            <div>
                <button onClick={() => toggleComplete(id, todo.completed)}>
                    {todo.completed ? 'Undo' : 'Complete'}
                </button>
                <button onClick={() => removeTodo(id)}>Delete</button>
            </div>
        </div>
    );
}

export default ToDo;
