import React from 'react';
import './TaskForm.css';

const TaskForm = ({ handleSubmit, task, setTask }) => {
  return (
    <form onSubmit={handleSubmit} className="task-form">
      <h2>{task.id ? 'Edit Task' : 'Add Task'}</h2>
      <div>
        <label>Title</label>
        <input
          type="text"
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
          required
        />
      </div>
      <div>
        <label>Description</label>
        <textarea
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
          required
        ></textarea>
      </div>
      <div>
        <label>Deadline</label>
        <input
          type="date"
          value={task.deadline}
          onChange={(e) => setTask({ ...task, deadline: e.target.value })}
          required
        />
      </div>
      <button type="submit">{task.id ? 'Update Task' : 'Add Task'}</button>
    </form>
  );
};

export default TaskForm;
