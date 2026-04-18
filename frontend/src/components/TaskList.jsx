import React from 'react';
import TaskItem from './TaskItem';
import './TaskList.css';

const TaskList = ({ tasks, handleEdit, handleDelete, handleStatusChange }) => {
  if (!tasks || tasks.length === 0) {
    return <p className="no-tasks-message">No tasks yet. Add one using the form above!</p>;
  }

  return (
    <div className="task-list-full">
      {tasks.map((task) => (
        <TaskItem
          key={task._id} // Use MongoDB's _id as the key
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
