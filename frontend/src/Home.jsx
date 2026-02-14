
import React from 'react';
import MedicamentoList from './MedicamentoList';

// Home agora exibe diretamente a listagem de medicamentos
export default function Home(props) {
  // Recebe props.medicamentos, props.onEdit, props.onDelete do App
  return (
    <div style={{padding:'24px 0'}}>
      <MedicamentoList 
        medicamentos={props.medicamentos || []}
        onEdit={props.onEdit || (()=>{})}
        onDelete={props.onDelete || (()=>{})}
      />
    </div>
  );
}
