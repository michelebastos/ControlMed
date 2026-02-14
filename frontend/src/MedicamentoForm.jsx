import React, { useState } from 'react';

const tipos = [
	'Comprimido',
	'Cápsula',
	'Xarope',
	'Gotas',
	'Pomada',
	'Injetável',
	'Spray',
	'Outro'
];

const usos = [
	{ label: 'Adulto', value: 'adulto' },
	{ label: 'Infantil', value: 'infantil' },
	{ label: 'Veterinário', value: 'veterinario' }
];

export default function MedicamentoForm({ onSubmit }) {
	const [form, setForm] = useState({
		nome: '', dosagem: '', tipo: tipos[0], quantidade: '', validade: '', horarios: '', observacoes: '', status: 'Ativo', uso: usos[0].value
	});

	function handleChange(e) {
		setForm({ ...form, [e.target.name]: e.target.value });
	}

	function handleSubmit(e) {
		e.preventDefault();
		onSubmit && onSubmit(form);
		setForm({ nome: '', dosagem: '', tipo: tipos[0], quantidade: '', validade: '', horarios: '', observacoes: '', status: 'Ativo', uso: usos[0].value });
	}

	return (
		<form onSubmit={handleSubmit} style={{marginBottom: 24, border: '1px solid #eee', padding: 16, borderRadius: 8}}>
			<h2>Novo Medicamento</h2>
			<label className="cute-label">Nome</label>
			<input name="nome" placeholder="Nome" value={form.nome} onChange={handleChange} required />

			<label className="cute-label">Dosagem</label>
			<input name="dosagem" placeholder="Dosagem" value={form.dosagem} onChange={handleChange} required />

			<label className="cute-label">Tipo</label>
			<select name="tipo" value={form.tipo} onChange={handleChange} required>
				{tipos.map(tipo => <option key={tipo} value={tipo}>{tipo}</option>)}
			</select>

			<label className="cute-label">Quantidade</label>
			<input name="quantidade" placeholder="Quantidade" type="number" value={form.quantidade} onChange={handleChange} required />

			<label className="cute-label">Data de Vencimento</label>
			<input name="validade" placeholder="Validade" type="date" value={form.validade} onChange={handleChange} required />

			<label className="cute-label">Horários</label>
			<input name="horarios" placeholder="Horários" value={form.horarios} onChange={handleChange} />

			<label className="cute-label">Observações</label>
			<input name="observacoes" placeholder="Observações" value={form.observacoes} onChange={handleChange} />

			<label className="cute-label">Uso</label>
			<select name="uso" value={form.uso} onChange={handleChange} required>
				{usos.map(u => <option key={u.value} value={u.value}>{u.label}</option>)}
			</select>

			<label className="cute-label">Status</label>
			<select name="status" value={form.status} onChange={handleChange}>
				<option value="Ativo">Ativo</option>
				<option value="Inativo">Inativo</option>
			</select>

			<button className="cute-btn" type="submit">Salvar</button>
		</form>
	);
}
