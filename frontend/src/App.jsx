import { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import Login from './components/Login';
import { getTasks, createTask, updateTask, deleteTask } from './services/api';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  // State to hold the task currently being edited
  const [editingTask, setEditingTask] = useState({ id: null, title: '', description: '', deadline: '', status: 'pending' });
  const [token, setToken] = useState(localStorage.getItem('token'));

  // Fetch tasks when the component mounts or token changes
  useEffect(() => {
    if (token) {
      const fetchTasks = async () => {
        try {
          const { data } = await getTasks(token);
          setTasks(data);
        } catch (error) {
          console.error('Error fetching tasks:', error);
          if (error.response && error.response.status === 401) {
            handleLogout(); // Log out if token is invalid
          }
        }
      };
      fetchTasks();
    }
  }, [token]);

  // Handles both creating and updating tasks
  const handleSubmit = async (taskData) => {
    try {
      if (taskData.id) {
        // Update existing task
        const { data } = await updateTask(taskData.id, taskData, token);
        setTasks(tasks.map(t => (t._id === taskData.id ? data : t)));
      } else {
        // Create new task
        const { data } = await createTask(taskData, token);
        setTasks([...tasks, data]);
      }
    } catch (error) {
      console.error('Error saving task:', error);
    }
    // Reset editing state after submission
    setEditingTask({ id: null, title: '', description: '', deadline: '', status: 'pending' });
  };

  const handleEdit = (id) => {
    const taskToEdit = tasks.find(t => t._id === id);
    // MongoDB uses `_id`, but we pass `id` for consistency in the form
    if (taskToEdit) {
      setEditingTask({ ...taskToEdit, id: taskToEdit._id });
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id, token);
      setTasks(tasks.filter(t => t._id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      const { data } = await updateTask(id, { status }, token);
      setTasks(tasks.map(t => (t._id === id ? data : t)));
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  const handleLogin = (userToken) => {
    localStorage.setItem('token', userToken);
    setToken(userToken);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setTasks([]); // Clear tasks from state
  };

  if (!token) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="app-container">
      <div className="header">
          <h1>Task Management</h1>
          <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>
      
      <TaskForm 
        handleSubmit={handleSubmit} 
        task={editingTask}
        setTask={setEditingTask} // Pass the setter to allow the form to clear itself
      />

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
