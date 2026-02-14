import React, { useState } from 'react';

export default function Register({ onRegister }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSuccess(false);
    try {
      const res = await fetch('http://localhost:3001/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erro ao cadastrar');
      setSuccess(true);
      onRegister && onRegister();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="cute-container" style={{maxWidth:340, marginTop:60}}>
      <h2 className="cute-title">Cadastro</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Usuário" value={username} onChange={e=>setUsername(e.target.value)} required />
        <input type="password" placeholder="Senha" value={password} onChange={e=>setPassword(e.target.value)} required />
        <button className="cute-btn" type="submit">Cadastrar</button>
      </form>
      {success && <div style={{color:'#22c55e', marginTop:10}}>Usuário cadastrado!</div>}
      {error && <div style={{color:'#e11d48', marginTop:10}}>{error}</div>}
    </div>
  );
}
