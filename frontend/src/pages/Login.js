import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/restaurants');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow p-8 mt-10">
      <h2 className="text-2xl font-bold text-red-500 mb-6 text-center">Zwiggy Login</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-200" />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-200" />
        <button type="submit" className="bg-red-500 hover:bg-red-600 text-white py-2 rounded font-semibold">Login</button>
      </form>
      {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
    </div>
  );
}

export default Login;
