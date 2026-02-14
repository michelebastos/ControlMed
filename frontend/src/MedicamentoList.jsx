
import React, { useState } from 'react';

// Grid de medicamentos em tabela
function MedicamentoGrid({ medicamentos, onEdit, onDelete }) {
	if (!medicamentos.length) return <p style={{color:'#6366f1', fontWeight:500}}>Nenhum medicamento encontrado.</p>;
	return (
		<div style={{overflowX:'auto', width:'100%'}}>
			<table style={{width:'100%', borderCollapse:'collapse', minWidth:700, fontSize:'1rem'}}>
				<thead>
					<tr style={{background:'#f3f4f6'}}>
						<th style={th}>Nome</th>
						<th style={th}>Dosagem</th>
						<th style={th}>Tipo</th>
						<th style={th}>Qtd</th>
						<th style={th}>Validade</th>
						<th style={th}>Horários</th>
						<th style={th}>Uso</th>
						<th style={th}>Status</th>
						<th style={th}>Ações</th>
					</tr>
				</thead>
				<tbody>
					{medicamentos.map(m => {
						const diasRestantes = m.validade ? Math.ceil((new Date(m.validade) - new Date())/86400000) : null;
						const vencendo = diasRestantes !== null && diasRestantes <= 7 && diasRestantes >= 0;
						const vencido = diasRestantes !== null && diasRestantes < 0;
						return (
							<tr key={m.id} style={{background: vencido ? '#fee2e2' : vencendo ? '#fef9c3' : '#fff'}}>
								<td style={td}><b>{m.nome}</b></td>
								<td style={td}>{m.dosagem}</td>
								<td style={td}>{m.tipo}</td>
								<td style={td}>{m.quantidade}</td>
								<td style={td}>{m.validade}</td>
								<td style={td}>{m.horarios}</td>
								<td style={td}>{m.uso}</td>
								<td style={td}>{m.status}</td>
								<td style={td}>
									<button className="cute-btn" style={{padding:'4px 10px', fontSize:'0.95rem', marginRight:6}} onClick={()=>onEdit(m)}>Editar</button>
									<button className="cute-btn" style={{padding:'4px 10px', fontSize:'0.95rem', background:'#e11d48'}} onClick={()=>onDelete(m.id)}>Excluir</button>
									{vencendo && <span style={{color:'#b91c1c', fontWeight:600, marginLeft:8}}>Vencendo em {diasRestantes}d</span>}
									{vencido && <span style={{color:'#b91c1c', fontWeight:600, marginLeft:8}}>Vencido</span>}
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
			<style>{`
				@media (max-width: 900px) {
					table { font-size: 0.95rem !important; min-width: 600px !important; }
					th, td { padding: 6px 4px !important; }
				}
				@media (max-width: 700px) {
					table { font-size: 0.92rem !important; min-width: 500px !important; }
					th, td { padding: 5px 2px !important; }
				}
				@media (max-width: 600px) {
					table { font-size: 0.89rem !important; min-width: 400px !important; }
					th, td { padding: 4px 2px !important; }
				}
			`}</style>
		</div>
	);
}

const th = {padding:'8px 6px', borderBottom:'2px solid #e5e7eb', fontWeight:600, fontSize:'1rem', textAlign:'left'};
const td = {padding:'7px 6px', borderBottom:'1px solid #e5e7eb', fontSize:'0.98rem'};

const usos = [
	{ label: 'Todos', value: '' },
	{ label: 'Adulto', value: 'adulto' },
	{ label: 'Infantil', value: 'infantil' },
	{ label: 'Veterinário', value: 'veterinario' }
];

export default function MedicamentoList({ medicamentos, onEdit, onDelete }) {
	const [filtroUso, setFiltroUso] = useState('');
	const [apenasVencidos, setApenasVencidos] = useState(false);
	const [busca, setBusca] = useState('');
	const [ordem, setOrdem] = useState('validade');
	const [ordemCresc, setOrdemCresc] = useState(true);

	const hoje = new Date().toISOString().slice(0, 10);
	let filtrados = medicamentos.filter(m => {
		let ok = true;
		if (filtroUso) ok = m.uso === filtroUso;
		if (apenasVencidos) ok = ok && m.validade && m.validade < hoje;
		if (busca) ok = ok && m.nome.toLowerCase().includes(busca.toLowerCase());
		return ok;
	});

	if (ordem === 'validade') {
		filtrados = filtrados.sort((a, b) => {
			if (!a.validade) return 1;
			if (!b.validade) return -1;
			return ordemCresc ? a.validade.localeCompare(b.validade) : b.validade.localeCompare(a.validade);
		});
	} else if (ordem === 'nome') {
		filtrados = filtrados.sort((a, b) => ordemCresc ? a.nome.localeCompare(b.nome) : b.nome.localeCompare(a.nome));
	}

	// Exportação para XLSX
	function exportarXLSX() {
		import('xlsx').then(XLSX => {
			const ws = XLSX.utils.json_to_sheet(filtrados.map(m => ({
				ID: m.id,
				Nome: m.nome,
				Dosagem: m.dosagem,
				Tipo: m.tipo,
				Quantidade: m.quantidade,
				Validade: m.validade,
				Horarios: m.horarios,
				Observacoes: m.observacoes,
				Status: m.status,
				Uso: m.uso
			})));
			const wb = XLSX.utils.book_new();
			XLSX.utils.book_append_sheet(wb, ws, 'Medicamentos');
			XLSX.writeFile(wb, 'medicamentos.xlsx');
		});
	}

	return (
		<div style={{background:'#fff', borderRadius:16, boxShadow:'0 2px 16px #a5b4fc22', padding:'28px 18px', margin:'0 auto', maxWidth:700}}>
			<h2 style={{color:'#4f46e5', fontWeight:700, marginBottom:18, fontSize:'1.5rem'}}>Lista de Medicamentos</h2>
			{/* Painel de filtros e opções */}
			<div style={{
				background:'#f6f7fa',
				borderRadius:10,
				boxShadow:'0 1px 4px #e5e7eb55',
				padding:'18px 14px',
				marginBottom:24,
				display:'flex',
				flexDirection:'column',
				gap:14
			}}>
				<div style={{display:'flex', gap:16, flexWrap:'wrap', alignItems:'center'}}>
					<label className="cute-label">Filtrar por uso:</label>
					<select value={filtroUso} onChange={e=>setFiltroUso(e.target.value)}>
						{usos.map(u => <option key={u.value} value={u.value}>{u.label}</option>)}
					</select>
					<label style={{marginLeft:10}}>
						<input type="checkbox" checked={apenasVencidos} onChange={e=>setApenasVencidos(e.target.checked)} />{' '}
						Mostrar apenas vencidos
					</label>
					<input style={{border:'1.5px solid #a5b4fc', borderRadius:8, padding:'7px 12px', minWidth:160}} placeholder="Buscar por nome..." value={busca} onChange={e=>setBusca(e.target.value)} />
					<button className="cute-btn" onClick={exportarXLSX}>Exportar .xlsx</button>
				</div>
				<div style={{display:'flex', gap:10, alignItems:'center', flexWrap:'wrap'}}>
					<span className="cute-label">Ordenar por:</span>
					<button className="cute-btn" style={{padding:'6px 16px', fontSize:'0.98rem', background: ordem==='validade' ? '#6366f1' : '#a5b4fc'}} onClick={()=>setOrdem('validade')}>Validade</button>
					<button className="cute-btn" style={{padding:'6px 16px', fontSize:'0.98rem', background: ordem==='nome' ? '#6366f1' : '#a5b4fc'}} onClick={()=>setOrdem('nome')}>Nome</button>
					<button className="cute-btn" style={{padding:'6px 10px', fontSize:'0.98rem'}} onClick={()=>setOrdemCresc(!ordemCresc)}>{ordemCresc ? 'Crescente' : 'Decrescente'}</button>
				</div>
			</div>
			{/* Grid de medicamentos */}
			<MedicamentoGrid medicamentos={filtrados} onEdit={onEdit} onDelete={onDelete} />
		</div>
	);
}
