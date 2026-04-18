import { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import Login from './components/Login';
import { getTasks, createTask, updateTask, deleteTask } from './services/api';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState({ id: null, title: '', description: '', deadline: '', status: 'pending' });
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (token) {
      const fetchTasks = async () => {
        try {
          const { data } = await getTasks(token);
          setTasks(data);
        } catch (error) {
          console.error('Error fetching tasks:', error);
        }
      };
      fetchTasks();
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (task.id) {
        const { data } = await updateTask(task.id, task, token);
        setTasks(tasks.map(t => (t.id === task.id ? data : t)));
      } else {
        const { data } = await createTask(task, token);
        setTasks([...tasks, data]);
      }
      setTask({ id: null, title: '', description: '', deadline: '', status: 'pending' });
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  const handleEdit = (id) => {
    const taskToEdit = tasks.find(t => t.id === id);
    setTask(taskToEdit);
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id, token);
      setTasks(tasks.filter(t => t.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      const { data } = await updateTask(id, { status }, token);
      setTasks(tasks.map(t => (t.id === id ? data : t)));
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  const handleLogin = (userToken) => {
    setToken(userToken);
  };

  const handleLogout = () => {
    setToken(null);
  };

  if (!token) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="app-container">
      <h1>Task Management App</h1>
      <button onClick={handleLogout} className="logout-button">Logout</button>
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
