import React, { useState, useEffect } from 'react';
import { Clock, Flag, Calendar, AlertTriangle } from 'lucide-react';
import { useContext } from 'react';
import TaskContext from '../context/TaskContext';

const TaskPriorityPage = ({ tasks = [] }) => {

  const [organizedTasks, setOrganizedTasks] = useState({
    overdue: [],
    today: [],
    tomorrow: [],
    thisWeek: [],
    later: []
  });

  // Tag colors and categories
  const tagConfig = {
    work: { color: 'bg-blue-100 text-blue-800 border-blue-200', label: 'Work' },
    personal: { color: 'bg-green-100 text-green-800 border-green-200', label: 'Personal' },
    hobby: { color: 'bg-purple-100 text-purple-800 border-purple-200', label: 'Hobby' },
    health: { color: 'bg-red-100 text-red-800 border-red-200', label: 'Health' },
    learning: { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', label: 'Learning' },
    shopping: { color: 'bg-pink-100 text-pink-800 border-pink-200', label: 'Shopping' },
    finance: { color: 'bg-indigo-100 text-indigo-800 border-indigo-200', label: 'Finance' }
  };

  // Priority levels
  const priorityConfig = {
    high: { color: 'text-red-600', icon: '🔴', label: 'High' },
    medium: { color: 'text-orange-600', icon: '🟡', label: 'Medium' },
    low: { color: 'text-green-600', icon: '🟢', label: 'Low' }
  };

  useEffect(() => {
    if (tasks.length === 0) {
      // Generate sample data for demonstration
      const sampleTasks = generateSampleTasks();
      organizeTasks(sampleTasks);
    } else {
      organizeTasks(tasks);
    }
  }, [tasks]);

  const generateSampleTasks = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    
    const dayAfterTomorrow = new Date(today);
    dayAfterTomorrow.setDate(today.getDate() + 2);
    
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);
    
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    return [
      // Today's tasks
      { id: 1, title: "New Final Check", dueDate: today, priority: "high", tags: ["work"], estimatedTime: "2 hours" },
      { id: 2, title: "Donut Check", dueDate: today, priority: "medium", tags: ["personal"], estimatedTime: "1 hour" },
      { id: 3, title: "Donut", dueDate: today, priority: "low", tags: ["health"], estimatedTime: "45 mins" },
      { id: 4, title: "Low", dueDate: today, priority: "high", tags: ["health"], estimatedTime: "15 mins" },
      
      // Tomorrow's tasks
      { id: 5, title: "Test", dueDate: tomorrow, priority: "high", tags: ["work"], estimatedTime: "1.5 hours" },
      { id: 6, title: "Upcoming Tasks", dueDate: tomorrow, priority: "low", tags: ["hobby", "learning"], estimatedTime: "1 hour" },
      { id: 7, title: "Pay utility bills", dueDate: tomorrow, priority: "medium", tags: ["finance"], estimatedTime: "30 mins" },
      
      // This week
      { id: 8, title: "Plan weekend trip", dueDate: dayAfterTomorrow, priority: "low", tags: ["personal"], estimatedTime: "2 hours" },
      { id: 9, title: "Code review", dueDate: nextWeek, priority: "medium", tags: ["work"], estimatedTime: "3 hours" },
      { id: 10, title: "Guitar practice", dueDate: nextWeek, priority: "low", tags: ["hobby"], estimatedTime: "1 hour" },
      
      // Overdue
      { id: 11, title: "Submit expense report", dueDate: yesterday, priority: "high", tags: ["work"], estimatedTime: "30 mins" },
      { id: 12, title: "Return library books", dueDate: yesterday, priority: "medium", tags: ["personal"], estimatedTime: "20 mins" }
    ];
  };

  const organizeTasks = (taskList) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const weekEnd = new Date(today);
    weekEnd.setDate(today.getDate() + 7);

    const organized = {
      overdue: [],
      today: [],
      tomorrow: [],
      thisWeek: [],
      later: []
    };

    taskList.forEach(task => {
      if (!task.dueDate) return;
      
      const dueDate = new Date(task.dueDate);
      const dueDateOnly = new Date(dueDate.getFullYear(), dueDate.getMonth(), dueDate.getDate());
      
      if (dueDateOnly < today) {
        organized.overdue.push(task);
      } else if (dueDateOnly.getTime() === today.getTime()) {
        organized.today.push(task);
      } else if (dueDateOnly.getTime() === tomorrow.getTime()) {
        organized.tomorrow.push(task);
      } else if (dueDateOnly <= weekEnd) {
        organized.thisWeek.push(task);
      } else {
        organized.later.push(task);
      }
    });

    // Sort each category by priority (high -> medium -> low)
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    Object.keys(organized).forEach(key => {
      organized[key].sort((a, b) => {
        const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
        if (priorityDiff !== 0) return priorityDiff;
        // If same priority, sort by estimated time (shorter first)
        const timeA = parseFloat(a.estimatedTime) || 0;
        const timeB = parseFloat(b.estimatedTime) || 0;
        return timeA - timeB;
      });
    });

    setOrganizedTasks(organized);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const TaskCard = ({ task, showDate = false }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className={priorityConfig[task.priority].color}>
              {priorityConfig[task.priority].icon}
            </span>
            <h3 className="font-medium text-gray-900">{task.title}</h3>
          </div>
          
          <div className="flex flex-wrap gap-1 mb-3">
            {task.tags.map(tag => (
              <span 
                key={tag}
                className={`px-2 py-1 text-xs font-medium rounded-full border ${tagConfig[tag]?.color || 'bg-gray-100 text-gray-800 border-gray-200'}`}
              >
                {tagConfig[tag]?.label || tag}
              </span>
            ))}
          </div>
          
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Clock size={14} />
              <span>{task.estimatedTime}</span>
            </div>
            {showDate && (
              <div className="flex items-center gap-1">
                <Calendar size={14} />
                <span>{formatDate(task.dueDate)}</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <span className={`text-xs font-medium ${priorityConfig[task.priority].color}`}>
            {priorityConfig[task.priority].label}
          </span>
        </div>
      </div>
    </div>
  );

  const TaskSection = ({ title, tasks, icon, isUrgent = false }) => {
    if (tasks.length === 0) return null;
    
    return (
      <div className={`mb-8 ${isUrgent ? 'border-l-4 border-red-500 pl-4' : ''}`}>
        <div className="flex items-center gap-2 mb-4">
          {icon}
          <h2 className={`text-xl font-semibold ${isUrgent ? 'text-red-700' : 'text-gray-800'}`}>
            {title}
          </h2>
          <span className="bg-gray-100 text-gray-700 text-sm font-medium px-2 py-1 rounded">
            {tasks.length}
          </span>
        </div>
        
        <div className="space-y-3">
          {tasks.map(task => (
            <TaskCard key={task.id} task={task} showDate={title === "Later"} />
          ))}
        </div>
      </div>
    );
  };

  const totalTasks = Object.values(organizedTasks).reduce((sum, tasks) => sum + tasks.length, 0);
  const highPriorityTasks = Object.values(organizedTasks).flat().filter(task => task.priority === 'high').length;

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Task Priority Assistant</h1>
        <p className="text-gray-600">Complete tasks in the optimal order based on due dates and priority</p>
        
        {/* Quick Stats */}
        <div className="flex gap-4 mt-4">
          <div className="bg-blue-50 px-3 py-2 rounded-lg">
            <span className="text-sm text-blue-600 font-medium">Total Tasks: {totalTasks}</span>
          </div>
          <div className="bg-red-50 px-3 py-2 rounded-lg">
            <span className="text-sm text-red-600 font-medium">High Priority: {highPriorityTasks}</span>
          </div>
        </div>
      </div>

      {/* Task Sections */}
      <TaskSection 
        title="Overdue Tasks" 
        tasks={organizedTasks.overdue} 
        icon={<AlertTriangle className="text-red-500" size={24} />}
        isUrgent={true}
      />
      
      <TaskSection 
        title="Today's Tasks" 
        tasks={organizedTasks.today} 
        icon={<Calendar className="text-blue-500" size={24} />}
      />
      
      <TaskSection 
        title="Tomorrow's Tasks" 
        tasks={organizedTasks.tomorrow} 
        icon={<Calendar className="text-green-500" size={24} />}
      />
      
      <TaskSection 
        title="This Week" 
        tasks={organizedTasks.thisWeek} 
        icon={<Calendar className="text-purple-500" size={24} />}
      />
      
      <TaskSection 
        title="📋 Later" 
        tasks={organizedTasks.later} 
        icon={<Calendar className="text-gray-500" size={24} />}
      />

      {/* Legend */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-medium mb-3">Priority & Tag Guide</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Priority Levels</h4>
            <div className="space-y-1">
              {Object.entries(priorityConfig).map(([key, config]) => (
                <div key={key} className="flex items-center gap-2">
                  <span>{config.icon}</span>
                  <span className={`text-sm ${config.color}`}>{config.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Task Categories</h4>
            <div className="flex flex-wrap gap-1">
              {Object.entries(tagConfig).map(([key, config]) => (
                <span key={key} className={`px-2 py-1 text-xs font-medium rounded-full border ${config.color}`}>
                  {config.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskPriorityPage;