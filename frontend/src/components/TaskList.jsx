import React from 'react';
import TaskItem from './TaskItem';
import './TaskList.css';

const TaskList = ({ tasks, handleEdit, handleDelete, handleStatusChange }) => {
  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          handleStatusChange={handleStatusChange}
        />
      ))}
    </div>
  );
};

export default TaskList;
