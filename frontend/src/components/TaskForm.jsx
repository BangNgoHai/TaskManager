import React, { useState, useEffect } from 'react';
import './TaskForm.css';

const TaskForm = ({ handleSubmit, task, setTask }) => {

  useEffect(() => {
    if (task && task.id) {
      const formattedDeadline = task.deadline ? new Date(task.deadline).toISOString().substring(0, 16) : '';
      setTitle(task.title || '');
      setDescription(task.description || '');
      setDeadline(formattedDeadline);
      setStatus(task.status || 'pending');
      setIsEditing(true);
    } else {
      // Reset form when there is no task to edit
      setTitle('');
      setDescription('');
      setDeadline('');
      setStatus('pending');
      setIsEditing(false);
    }
  }, [task]);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [status, setStatus] = useState('pending');
  const [isEditing, setIsEditing] = useState(false);

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Please enter a task title.');
      return;
    }

    handleSubmit({ 
      ...(task && task.id && { id: task.id }), // Keep the id for updates
      title,
      description,
      deadline: deadline || null, // Send null if deadline is empty
      status
    });

    // Clear parent task state to signify completion
    setTask({ id: null, title: '', description: '', deadline: '', status: 'pending' });
  };

  const handleCancel = () => {
    setTask({ id: null, title: '', description: '', deadline: '', status: 'pending' });
  };

  return (
    <form onSubmit={onFormSubmit} className="task-form-full">
      <h3>{isEditing ? 'Edit Task' : 'Add New Task'}</h3>
      <input
        type="text"
        placeholder="Task Title *"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="datetime-local"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
      <div className="form-buttons">
        <button type="submit" className="submit-button">{isEditing ? 'Update Task' : 'Add Task'}</button>
        {isEditing && <button type="button" onClick={handleCancel} className="cancel-button">Cancel</button>}
      </div>
    </form>
  );
};

export default TaskForm;
