import React from 'react';
import { Todo } from '../api/todos';

interface TodoItemProps {
  todo: Todo;
  toggleTodo: () => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, toggleTodo }) => {
  return (
    <li className="flex justify-between items-center mb-2">
      <span className={todo.completed ? 'line-through' : ''}>{todo.text}</span>
      <button onClick={toggleTodo} className="bg-green-500 text-white px-2 py-1 rounded">
        {todo.completed ? 'Undo' : 'Complete'}
      </button>
    </li>
  );
};

export default TodoItem;
