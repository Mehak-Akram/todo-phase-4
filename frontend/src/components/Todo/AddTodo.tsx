import { useState } from 'react';

interface AddTodoProps {
  onAddTodo: (content: string) => void;
}

export default function AddTodo({ onAddTodo }: AddTodoProps) {
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onAddTodo(content);
      setContent('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex justify-center">
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Add a new todo..."
          className="flex-1 px-4 py-2 border border-blue-500 bg-white text-blue-900 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium bg-blue-500 rounded-r-md hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 text-white"
        >
          Add
        </button>
      </div>
    </form>
  );
}