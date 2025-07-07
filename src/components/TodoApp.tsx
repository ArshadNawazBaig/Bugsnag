'use client';

import { useState } from 'react';
import { Bugsnag } from '../lib/bugsnag';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState('');

  const addTodo = () => {
    if (inputValue.trim() === '') return;

    const newTodo: Todo = {
      id: Date.now(),
      text: inputValue.trim(),
      completed: false,
    };

    setTodos((prev) => [...prev, newTodo]);
    setInputValue('');

    // Track the action with Bugsnag
    Bugsnag.leaveBreadcrumb('Todo added', {
      todoText: newTodo.text,
      totalTodos: todos.length + 1,
    });
  };

  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );

    // Track completion with Bugsnag
    const todo = todos.find((t) => t.id === id);
    if (todo) {
      Bugsnag.leaveBreadcrumb('Todo toggled', {
        todoText: todo.text,
        completed: !todo.completed,
      });
    }
  };

  const deleteTodo = (id: number) => {
    const todoToDelete = todos.find((t) => t.id === id);
    setTodos((prev) => prev.filter((todo) => todo.id !== id));

    // Track deletion with Bugsnag
    if (todoToDelete) {
      Bugsnag.leaveBreadcrumb('Todo deleted', {
        todoText: todoToDelete.text,
      });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Simple Todo App</h1>

      {/* Add Todo Form */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Add a new todo..."
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={addTodo}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Add
        </button>
      </div>

      {/* Todo List */}
      <div className="space-y-2">
        {todos.length === 0 ? (
          <p className="text-gray-500 text-center py-4">
            No todos yet. Add one above!
          </p>
        ) : (
          todos.map((todo) => (
            <div
              key={todo.id}
              className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span
                className={`flex-1 ${
                  todo.completed
                    ? 'line-through text-gray-500'
                    : 'text-gray-900'
                }`}
              >
                {todo.text}
              </span>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="px-2 py-1 text-red-500 hover:bg-red-100 rounded transition-colors"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>

      {/* Stats */}
      {todos.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            {todos.filter((t) => t.completed).length} of {todos.length}{' '}
            completed
          </p>
        </div>
      )}
    </div>
  );
}
