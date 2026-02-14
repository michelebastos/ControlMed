import React from 'react';

export default function MedicamentoItem({ medicamento, onEdit, onDelete }) {
	const diasRestantes = medicamento.validade ? Math.ceil((new Date(medicamento.validade) - new Date())/86400000) : null;
	const vencendo = diasRestantes !== null && diasRestantes <= 7 && diasRestantes >= 0;
	return (
		<div style={{border: '1px solid #ccc', marginBottom: 8, padding: 12, borderRadius: 6, background: vencendo ? '#ffeaea' : '#fff'}}>
			<b>{medicamento.nome}</b> - {medicamento.dosagem} - {medicamento.tipo} - Qtd: {medicamento.quantidade} - Validade: {medicamento.validade}
			<br />Horários: {medicamento.horarios} | Status: {medicamento.status}
			<br />Obs: {medicamento.observacoes}
			<br />
			<button onClick={() => onEdit && onEdit(medicamento)}>Editar</button>{' '}
			<button onClick={() => onDelete && onDelete(medicamento.id)}>Excluir</button>
			{vencendo && <span style={{color: 'red', marginLeft: 8}}><b>Vencendo em {diasRestantes} dias!</b></span>}
		</div>
	);
}
