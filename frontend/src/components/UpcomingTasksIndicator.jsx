import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import TaskContext from '../context/TaskContext';

const UpcomingTasksIndicator = () => {
   const { tasks } = useContext(TaskContext);
  const [taskCategories, setTaskCategories] = useState({
    today: [],
    upcoming: [],
    delayed: []
  });

  useEffect(() => {
    if (!tasks || tasks.length === 0) {
      // Use sample data for demonstration
      const sampleTasks = generateSampleTasks();
      categorizeTasks(sampleTasks);
    } else {
      categorizeTasks(tasks);
    }
  }, [tasks]);

  // Generate sample tasks for demonstration
  const generateSampleTasks = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);
    
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    
    return [
      { id: 1, title: "Complete project proposal", dueDate: today, status: "pending" },
      { id: 2, title: "Team meeting", dueDate: today, status: "pending" },
      { id: 3, title: "Client presentation", dueDate: tomorrow, status: "pending" },
      { id: 4, title: "Review code changes", dueDate: nextWeek, status: "pending" },
      { id: 5, title: "Update documentation", dueDate: yesterday, status: "pending" },
      { id: 6, title: "Deploy application", dueDate: yesterday, status: "pending" }
    ];
  };

  // Categorize tasks based on due dates
  const categorizeTasks = (taskList) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const todayTasks = [];
    const upcomingTasks = [];
    const delayedTasks = [];
    
    taskList.forEach(task => {
      if (!task.dueDate) return;
      
      const dueDate = new Date(task.dueDate);
      dueDate.setHours(0, 0, 0, 0);
      
      if (dueDate.getTime() === today.getTime()) {
        todayTasks.push(task);
      } else if (dueDate.getTime() > today.getTime()) {
        upcomingTasks.push(task);
      } else if (dueDate.getTime() < today.getTime() && task.status !== 'completed') {
        delayedTasks.push(task);
      }
    });
    
    setTaskCategories({
      today: todayTasks,
      upcoming: upcomingTasks,
      delayed: delayedTasks
    });
  };

  // Format date for display
  const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  // Render a task item
  const renderTaskItem = (task) => (
    <div key={task.id} className="p-3 border-b border-gray-100 last:border-0">
      <div className="flex justify-between items-center">
        <div className="flex-1">
          <h4 className="font-medium text-gray-800">{task.title}</h4>
          <p className="text-sm text-gray-500">Due: {formatDate(task.dueDate)}</p>
        </div>
        <div className="flex items-center">
          <span className={`w-2 h-2 rounded-full mr-2 ${
            task.status === 'completed' ? 'bg-green-500' : 'bg-blue-500'
          }`}></span>
          <span className="text-xs text-gray-600">{task.status}</span>
        </div>
      </div>
    </div>
  );

  // Category components with color indicators
  const CategoryIndicator = ({ title, count, color, tasks = [] }) => (
    <div className="flex-1">
      <div className="flex items-center mb-2">
        <div className={`w-3 h-3 rounded-full ${color} mr-2`}></div>
        <h3 className="font-medium">{title}</h3>
        <span className="ml-auto bg-gray-100 text-gray-700 text-xs font-medium px-2 py-0.5 rounded">
          {count}
        </span>
      </div>
      <div className="bg-gray-50 rounded-lg overflow-hidden">
        {tasks.length > 0 ? (
          <div className="max-h-40 overflow-y-auto">
            {tasks.map(renderTaskItem)}
          </div>
        ) : (
          <div className="p-3 text-center text-gray-500 text-sm">
            No tasks
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row gap-4">
        <CategoryIndicator 
          title="Today's Tasks" 
          count={taskCategories.today.length} 
          color="bg-blue-500" 
          tasks={taskCategories.today} 
        />
        
        <CategoryIndicator 
          title="Upcoming Tasks" 
          count={taskCategories.upcoming.length} 
          color="bg-purple-500" 
          tasks={taskCategories.upcoming} 
        />
        
        <CategoryIndicator 
          title="Delayed Tasks" 
          count={taskCategories.delayed.length}
          color="bg-red-500" 
          tasks={taskCategories.delayed} 
        />
      </div>
    </div>
  );
};

export default UpcomingTasksIndicator;