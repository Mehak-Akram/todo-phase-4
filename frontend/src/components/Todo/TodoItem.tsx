import { useState } from 'react';
import { Todo } from '../../types';
import ToggleTodo from './ToggleTodo';
import DeleteTodo from './DeleteTodo';
import EditTodo from './EditTodo';

interface TodoItemProps {
  todo: Todo;
  onUpdate: (id: string, content: string) => void;
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
}

export default function TodoItem({ todo, onUpdate, onToggle, onDelete }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdate = (content: string) => {
    onUpdate(todo.id, content);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleToggle = () => {
    onToggle(todo.id, todo.completed);
  };

  const handleDelete = () => {
    onDelete(todo.id);
  };

  return (
    <div className={`flex items-center justify-between p-4 border border-blue-500 rounded-md ${todo.completed ? 'bg-white text-blue-300' : 'bg-white text-blue-500'}`}>
      <div className="flex items-center flex-1">
        <ToggleTodo completed={todo.completed} onToggle={handleToggle} />
        {isEditing ? (
          <EditTodo
            initialContent={todo.content}
            onSave={handleUpdate}
            onCancel={handleCancel}
          />
        ) : (
          <span
            className={`ml-3 flex-1 ${todo.completed ? 'line-through text-blue-300' : 'text-blue-500'}`}
            onClick={() => setIsEditing(true)}
          >
            {todo.content}
          </span>
        )}
      </div>

      <div className="flex space-x-2">
        {!isEditing && (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="px-3 py-2 text-sm font-medium text-blue-700 bg-white border border-blue-300 rounded-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 min-w-[60px]"
            >
              Edit
            </button>
            <DeleteTodo onDelete={handleDelete} todoContent={todo.content} />
          </>
        )}
      </div>
    </div>
  );
}