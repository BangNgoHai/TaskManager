import { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState({ id: null, title: '', description: '', deadline: '', status: 'pending' });

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.id) {
      setTasks(tasks.map(t => t.id === task.id ? task : t));
    } else {
      setTasks([...tasks, { ...task, id: Date.now() }]);
    }
    setTask({ id: null, title: '', description: '', deadline: '', status: 'pending' });
  };

  const handleEdit = (id) => {
    const taskToEdit = tasks.find(t => t.id === id);
    setTask(taskToEdit);
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const handleStatusChange = (id, status) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, status } : t));
  };

  return (
    <div className="app-container">
      <h1>Task Management App</h1>
      <TaskForm handleSubmit={handleSubmit} task={task} setTask={setTask} />
      <TaskList
        tasks={tasks}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        handleStatusChange={handleStatusChange}
      />
    </div>
  );
}

export default App;
