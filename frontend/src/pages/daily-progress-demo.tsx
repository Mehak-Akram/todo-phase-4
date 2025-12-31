import React, { useState } from 'react';
import DailyProgress from '../components/UI/DailyProgress';

const DailyProgressDemo = () => {
  const [totalTasks, setTotalTasks] = useState(10);
  const [completedTasks, setCompletedTasks] = useState(3);

  const incrementCompleted = () => {
    if (completedTasks < totalTasks) {
      setCompletedTasks(prev => prev + 1);
    }
  };

  const decrementCompleted = () => {
    if (completedTasks > 0) {
      setCompletedTasks(prev => prev - 1);
    }
  };

  const incrementTotal = () => {
    setTotalTasks(prev => prev + 1);
  };

  const decrementTotal = () => {
    if (totalTasks > 0) {
      setTotalTasks(prev => prev - 1);
      // Ensure completed tasks don't exceed total tasks
      if (completedTasks > totalTasks - 1) {
        setCompletedTasks(totalTasks - 1);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Daily Progress Component Demo</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Controls</h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Total Tasks:</span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={decrementTotal}
                    className="px-3 py-1 bg-red-500 text-white rounded disabled:opacity-50"
                    disabled={totalTasks <= 0}
                  >
                    -
                  </button>
                  <span className="px-3">{totalTasks}</span>
                  <button
                    onClick={incrementTotal}
                    className="px-3 py-1 bg-green-500 text-white rounded"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span>Completed Tasks:</span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={decrementCompleted}
                    className="px-3 py-1 bg-red-500 text-white rounded disabled:opacity-50"
                    disabled={completedTasks <= 0}
                  >
                    -
                  </button>
                  <span className="px-3">{completedTasks}</span>
                  <button
                    onClick={incrementCompleted}
                    className="px-3 py-1 bg-green-500 text-white rounded"
                    disabled={completedTasks >= totalTasks}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Component Preview</h2>
            <DailyProgress
              totalTasks={totalTasks}
              completedTasks={completedTasks}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyProgressDemo;