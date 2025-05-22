import React, { useContext, useMemo } from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import TaskContext from '../context/TaskContext';

// Custom tooltip component
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div className="bg-white p-2 border border-gray-300 rounded shadow-lg">
        <p className="font-medium">{data.name}</p>
        <p className="text-sm">
          <span className="font-semibold">{data.value}</span> tasks
        </p>
        <p className="text-sm text-gray-600">
          {((data.value / data.payload.total) * 100).toFixed(1)}%
        </p>
      </div>
    );
  }
  return null;
};

const TaskPriorityDonutChart = () => {
 const { tasks } = useContext(TaskContext);

// Define pastel colors for each priority
const priorityColors = {
  High: '#ff0000',    // Coral Red - modern and vibrant
      Medium: '#ffff00',  // Teal - trendy and calming
      Low: '#adff2f'     // Soft Green
};

const chartData = useMemo(() => {
  // Fake data fallback (optional)
  if (!tasks || tasks.length === 0) {
    return [
      { title: 'High', value: 6, color: priorityColors.High },
      { title: 'Medium', value: 4, color: priorityColors.Medium },
      { title: 'Low', value: 2, color: priorityColors.Low },
    ];
  }

  // Count tasks by normalized priority
  const priorityCounts = tasks.reduce((acc, task) => {
    const rawPriority = task.priority || 'Low'; // fallback
    const priority = rawPriority.charAt(0).toUpperCase() + rawPriority.slice(1).toLowerCase();
    acc[priority] = (acc[priority] || 0) + 1;
    return acc;
  }, {});

  // Map counts to chart data format
  return Object.entries(priorityCounts).map(([priority, count]) => ({
    title: priority,
    value: count,
    color: priorityColors[priority] || '#d1d5db' // default grey fallback
  }));
}, [tasks]);


  // Show message if no tasks
  if (!tasks || tasks.length === 0) {
    return (
      <div className="w-full h-64 flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-lg font-medium mb-2">Task Priority Overview</h3>
          <p className="text-gray-500">No tasks found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full">
  <div style={{ width: '100%', height: 500 }}>
    <div className="w-full h-80 flex flex-col items-center justify-center">
      <PieChart
        data={chartData}
        lineWidth={50}
        radius={32}
        // Removed label prop to hide labels on the chart
        animate
      />
    </div>

    {/* Legend */}
    <div className="mt-4 flex flex-col items-start text-sm px-4">
      <p className="mb-2 font-medium">Total Tasks: {chartData.reduce((sum, entry) => sum + entry.value, 0)}</p>
      
      <div className="flex flex-col space-y-2">
        {chartData.map((entry, idx) => (
          <div key={idx} className="flex items-center space-x-2">
            <span
              className="inline-block w-4 h-4 rounded-full"
              style={{ backgroundColor: entry.color }}
            ></span>
            <span>{entry.title}: {entry.value}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
</div>


  );
};

export default TaskPriorityDonutChart;