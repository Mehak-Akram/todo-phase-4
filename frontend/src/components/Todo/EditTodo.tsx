import { useState } from 'react';

interface EditTodoProps {
  initialContent: string;
  onSave: (content: string) => void;
  onCancel: () => void;
}

export default function EditTodo({ initialContent, onSave, onCancel }: EditTodoProps) {
  const [content, setContent] = useState(initialContent);

  const handleSave = () => {
    if (content.trim()) {
      onSave(content);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      onCancel();
    }
  };

  return (
    <div className="flex items-center flex-1">
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1 px-2 py-1 border border-blue-500 bg-white text-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        autoFocus
      />
      <div className="flex space-x-2 ml-3">
        <button
          onClick={handleSave}
          className="px-3 py-2 text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 min-w-[60px]"
        >
          Save
        </button>
        <button
          onClick={onCancel}
          className="px-3 py-2 text-sm font-medium text-blue-700 bg-white border border-blue-300 rounded-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 min-w-[60px]"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}