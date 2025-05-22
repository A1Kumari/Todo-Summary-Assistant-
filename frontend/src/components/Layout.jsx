import React from 'react';
import TaskIndicator from './TaskIndicator';
import CreateTask from './createTask/CreateTask';
import { Outlet } from 'react-router-dom';
import TaskPriorityDonutChart from './DonutChart';
import UpcomingTasksIndicator from './UpcomingTasksIndicator'; // New component for upcoming tasks
import TaskPriorityPage from './TaskAssistant';

function Layout() {
    return (
        <div className="min-h-screen bg-gray-100 py-6 px-4">
            <div className="max-w-6xl mx-auto space-y-6">
                {/* Create Task - Full width */}
                <div>
                    <CreateTask />
                </div>

                {/* Dashboard Grid Layout */}
                <div className="flex gap-6">
  {/* Left column - about 40% width */}
  <div className="w-2/5 space-y-6">
    {/* Current Task Status */}
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-lg font-semibold mb-4">Task Status</h2>
      <TaskIndicator />
    </div>

    {/* Task Distribution Donut Chart */}
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-lg font-semibold mb-2">Task Distribution</h2>
      <TaskPriorityDonutChart />
    </div>
  </div>

  {/* Right column - about 60% width */}
  <div className="w-3/5">
    {/* Main Content Area */}
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <Outlet />
    </div>

    {/* Upcoming Tasks Indicator - Below Main Content */}
  </div>
</div>

                <div className="bg-white rounded-lg shadow p-4">
                            <h2 className="text-lg font-semibold mb-4">Task Timeline</h2>
                            <UpcomingTasksIndicator />
                           
                </div>
                <div className="bg-white rounded-lg shadow p-4">
                            
                           
                </div>
                 <TaskPriorityPage/>
            </div>
        </div>
    );
}

export default Layout;