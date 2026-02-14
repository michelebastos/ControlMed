import React, { useState } from 'react';

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erro ao logar');
      onLogin(data);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="cute-container" style={{maxWidth:340, marginTop:60}}>
      <h2 className="cute-title">Login</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Usuário" value={username} onChange={e=>setUsername(e.target.value)} required />
        <input type="password" placeholder="Senha" value={password} onChange={e=>setPassword(e.target.value)} required />
        <button className="cute-btn" type="submit">Entrar</button>
      </form>
      {error && <div style={{color:'#e11d48', marginTop:10}}>{error}</div>}
    </div>
  );
}
