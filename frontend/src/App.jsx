


import React, { useState } from 'react';
import MedicamentoForm from './MedicamentoForm';
import MedicamentoList from './MedicamentoList';

import Home from './Home';
import Login from './Login';
import Register from './Register';
import { v4 as uuidv4 } from 'uuid';
import './CuteStyles.css';


function App() {
	const [page, setPage] = useState('home');
	const [medicamentos, setMedicamentos] = useState([]);
	const [user, setUser] = useState(null);
	const [showRegister, setShowRegister] = useState(false);

	function addMedicamento(data) {
		setMedicamentos([...medicamentos, { ...data, id: uuidv4() }]);
		setPage('lista');
	}
	function editMedicamento(med) {
		alert('Editar: ' + med.nome);
	}
	function deleteMedicamento(id) {
		setMedicamentos(medicamentos.filter(m => m.id !== id));
	}
	function handleLogin(data) {
		setUser(data);
		setPage('home');
	}
	function handleLogout() {
		setUser(null);
		setPage('home');
	}

	if (!user) {
		return showRegister ? (
			<div style={{minHeight:'100vh', background:'#f6f7fa', display:'flex', alignItems:'center', justifyContent:'center'}}>
				<Register onRegister={()=>setShowRegister(false)} />
				<div style={{marginLeft:24}}>
					<button className="cute-btn" onClick={()=>setShowRegister(false)}>Já tenho conta</button>
				</div>
			</div>
		) : (
			<div style={{minHeight:'100vh', background:'#f6f7fa', display:'flex', alignItems:'center', justifyContent:'center'}}>
				<Login onLogin={handleLogin} />
				<div style={{marginLeft:24}}>
					<button className="cute-btn" onClick={()=>setShowRegister(true)}>Criar conta</button>
				</div>
			</div>
		);
	}

	return (
		<div style={{minHeight:'100vh', background:'#f6f7fa', display:'flex'}}>
			{/* Menu lateral */}
			<aside style={{
				width:220,
				background:'#23272f',
				color:'#fff',
				minHeight:'100vh',
				display:'flex',
				flexDirection:'column',
				alignItems:'center',
				padding:'32px 0 0 0',
				position:'sticky',
				top:0,
				zIndex:2
			}}>
				<div style={{fontWeight:700, fontSize:'1.3rem', marginBottom:32, letterSpacing:'-1px'}}>Med-Control</div>
				<button className="cute-btn" style={{width:'80%', marginBottom:12, background: page==='home' ? '#4f46e5' : '#23272f', color:'#fff'}} onClick={()=>setPage('home')}>Home</button>
				<button className="cute-btn" style={{width:'80%', marginBottom:12, background: page==='lista' ? '#4f46e5' : '#23272f', color:'#fff'}} onClick={()=>setPage('lista')}>Lista de Medicamentos</button>
				<button className="cute-btn" style={{width:'80%', marginBottom:12, background: page==='cadastro' ? '#4f46e5' : '#23272f', color:'#fff'}} onClick={()=>setPage('cadastro')}>Cadastrar Medicamento</button>
				<div style={{flex:1}}></div>
				<div style={{fontSize:'0.97rem', color:'#a5b4fc', marginBottom:8}}>
					Usuário: <b>{user.username}</b>
				</div>
				<button className="cute-btn" style={{width:'80%', marginBottom:24, background:'#e11d48'}} onClick={handleLogout}>Sair</button>
				<div style={{fontSize:'0.95rem', color:'#a5b4fc', marginBottom:24}}>© 2026</div>
			</aside>
			{/* Conteúdo */}
			<main style={{flex:1, minHeight:'100vh', padding:'0', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'flex-start'}}>
				{page==='home' && <Home />}
				{page==='lista' && <div className="cute-container" style={{boxShadow:'none', marginTop:40}}><MedicamentoList medicamentos={medicamentos} onEdit={editMedicamento} onDelete={deleteMedicamento} /></div>}
				{page==='cadastro' && <div className="cute-container" style={{boxShadow:'none', marginTop:40}}><MedicamentoForm onSubmit={addMedicamento} /></div>}
			</main>
			<style>{`
				@media (max-width: 800px) {
					aside { width: 100px !important; }
					aside div, aside button { font-size: 0.95rem !important; }
				}
				@media (max-width: 600px) {
					aside { display: none !important; }
					main { padding: 0 !important; }
				}
			`}</style>
		</div>
	);
}

import { createRoot } from 'react-dom/client';
const root = document.getElementById('root');
if (root) {
	createRoot(root).render(<App />);
}
