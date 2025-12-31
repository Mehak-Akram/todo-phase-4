import { useState } from 'react';

interface DeleteTodoProps {
  onDelete: () => void;
  todoContent: string;
}

export default function DeleteTodo({ onDelete, todoContent }: DeleteTodoProps) {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleDelete = () => {
    onDelete();
    setShowConfirmation(false);
  };

  return (
    <div className="relative">
      {showConfirmation ? (
        <div className="absolute right-0 z-10 p-3 bg-white border border-blue-200 rounded-lg shadow-lg min-w-[200px]">
          <p className="text-sm text-blue-700 mb-3">
            Delete "{todoContent}"?
          </p>
          <div className="flex space-x-2">
            <button
              onClick={handleDelete}
              className="px-3 py-2 text-sm font-medium text-white bg-red-600 border border-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200 min-w-[60px]"
            >
              Yes
            </button>
            <button
              onClick={() => setShowConfirmation(false)}
              className="px-3 py-2 text-sm font-medium text-blue-700 bg-white border border-blue-300 rounded-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 min-w-[60px]"
            >
              No
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setShowConfirmation(true)}
          className="px-3 py-2 text-sm font-medium text-red-700 bg-white border border-red-300 rounded-md hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200 min-w-[60px]"
        >
          Delete
        </button>
      )}
    </div>
  );
}