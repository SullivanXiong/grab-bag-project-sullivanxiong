import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList'
import uuidv4 from 'uuid/v4'

const LOCAL_STORAGE_KEY_TODOS = 'todoApp.todos';

function App() {
    const [todos, setTodos] = useState([]);
    const todoNameRef = useRef();

    // Load our Todos from local storage
    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_TODOS));
        if (storedTodos) setTodos(storedTodos);
    }, []);

    // Store our Todos to local storage
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY_TODOS, JSON.stringify(todos));
    }, [todos]);

    function toggleTodo(id) {
        const newTodos = [...todos];
        const todo = newTodos.find(todo => todo.id === id);
        todo.complete = !todo.complete;
        setTodos(newTodos)
    }

    function handleAddTodo() {
        const name = todoNameRef.current.value;
        if (name === '') return;
        setTodos(prevTodos => {
            return [...prevTodos, { id: uuidv4(), name: name, complete: false}];
        })
        todoNameRef.current.value = null;
    }

    function handleClearTodos() {
        const newTodos = todos.filter(todo => !todo.complete);
        setTodos(newTodos);
    }

    return (
        <>
            <TodoList todos={todos} toggleTodo={toggleTodo}/>
            <input ref={todoNameRef} type='text' />
            <button onClick={handleAddTodo}>Add Todo</button>
            <button onClick={handleClearTodos}>Clear Complete</button>
            <div>{todos.filter(todo => !todo.complete).length} left to do</div>
        </>
    )
}

export default App;
