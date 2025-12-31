interface EmptyStateProps {
  title: string;
  message: string;
  action?: () => void;
  actionText?: string;
  icon?: React.ReactNode;
}

export default function EmptyState({
  title,
  message,
  action,
  actionText,
  icon
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="mb-4 text-blue-500">
        {icon || (
          <svg
            className="w-16 h-16 mx-auto text-blue-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
        )}
      </div>
      <h3 className="text-lg font-medium text-blue-500">{title}</h3>
      <p className="mt-1 text-sm text-blue-300">{message}</p>
      {action && actionText && (
        <div className="mt-6">
          <button
            onClick={action}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 min-w-[100px]"
          >
            {actionText}
          </button>
        </div>
      )}
    </div>
  );
}