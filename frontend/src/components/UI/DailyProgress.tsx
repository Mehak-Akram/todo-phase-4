import React from 'react';

interface DailyProgressProps {
  totalTasks: number;
  completedTasks: number;
}

const DailyProgress: React.FC<DailyProgressProps> = ({
  totalTasks = 0,
  completedTasks = 0
}) => {
  const remainingTasks = totalTasks - completedTasks;
  const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <div
      className="relative rounded-[24px] p-6 text-blue-900 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #dbeafe 0%, #3b82f6 100%)',
      }}
    >
      {/* Abstract geometric pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-4 right-4 w-16 h-16 border border-white rounded-full"></div>
        <div className="absolute bottom-6 left-6 w-12 h-12 rotate-45 border border-white"></div>
        <div className="absolute top-1/2 left-1/3 w-6 h-6 border border-white rounded-full"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <h2 className="text-2xl font-bold mb-2">Daily Progress</h2>
        <p className="text-blue-900 mb-6 opacity-90">
          You have {remainingTasks} tasks remaining today.
        </p>

        {/* Progress bar */}
        <div className="absolute bottom-4 left-4 right-4 h-2.5 rounded-full bg-blue-200">
          <div
            className="h-full rounded-full bg-blue-600 transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default DailyProgress;