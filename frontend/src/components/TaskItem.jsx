import React from 'react';
import './TaskItem.css';

const TaskItem = ({ task, handleEdit, handleDelete, handleStatusChange }) => {
  const { _id, title, description, deadline, status } = task;

  const formattedDeadline = deadline ? new Date(deadline).toLocaleString() : 'No deadline';

  return (
    <div className={`task-item-full status-${status}`}>
      <div className="task-item-header">
        <h3>{title}</h3>
        <div className="task-item-controls">
            <button onClick={() => handleEdit(_id)} className="edit-button">Edit</button>
            <button onClick={() => handleDelete(_id)} className="delete-button">Delete</button>
        </div>
      </div>
      <p className="task-description">{description || 'No description'}</p>
      <div className="task-meta">
          <span className="task-deadline">Deadline: {formattedDeadline}</span>
          <select value={status} onChange={(e) => handleStatusChange(_id, e.target.value)} className="status-select">
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
          </select>
      </div>
    </div>
  );
};

export default TaskItem;
