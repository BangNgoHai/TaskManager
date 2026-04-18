import React from 'react';
import './TaskItem.css';

const TaskItem = ({ task, handleEdit, handleDelete, handleStatusChange }) => {
  return (
    <div className={`task-item ${task.status}`}>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>Deadline: {task.deadline}</p>
      <p>Status: {task.status}</p>
      <div>
        <button onClick={() => handleEdit(task.id)}>Edit</button>
        <button onClick={() => handleDelete(task.id)}>Delete</button>
        <select
          value={task.status}
          onChange={(e) => handleStatusChange(task.id, e.target.value)}
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
    </div>
  );
};

export default TaskItem;
