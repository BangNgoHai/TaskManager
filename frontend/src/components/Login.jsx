import React, { useState } from 'react';
import { register, login } from '../services/api';
import './Login.css';

const Login = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: '', username: '', password: '' });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      if (isLogin) {
        const { data } = await login({ username: formData.username, password: formData.password });
        onLogin(data.accessToken);
      } else {
        await register(formData);
        const { data } = await login({ username: formData.username, password: formData.password });
        onLogin(data.accessToken);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred.');
    }
  };

  const switchMode = () => {
    setIsLogin((prevIsLogin) => !prevIsLogin);
    setError(null);
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleAuth}>
        <h2>{isLogin ? 'Login' : 'Register'}</h2>
        {error && <p className="error-message">{error}</p>}
        {!isLogin && (
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
        )}
        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
        <p onClick={switchMode} className="switch-form-text">
          {isLogin ? "Don't have an account yet?" : 'Already have an account?'}
        </p>
      </form>
    </div>
  );
};

export default Login;
