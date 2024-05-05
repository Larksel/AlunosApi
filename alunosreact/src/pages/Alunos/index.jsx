import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Alunos.module.css';
import api from '../../services/api';

import { XCircle, ClipboardText, NotePencil, X } from '@phosphor-icons/react';

export default function Alunos() {
  const navigate = useNavigate();
  const [alunos, setAlunos] = useState([]);

  const email = localStorage.getItem('email');
  const token = localStorage.getItem('token');

  const authorization = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    api.get('api/alunos', authorization).then((response) => {
      setAlunos(response.data);
    });
  }, []);

  async function logout() {
    try {
      localStorage.setItem('token', '');
      localStorage.clear();
      authorization.headers = '';

      navigate('/');
    } catch (err) {
      alert('Não foi possível fazer logout ' + err);
    }
  }

  return (
    <div className={styles.alunoContainer}>
      <header className={styles.header}>
        <ClipboardText size={50} color='#6D66B7' />
        <span>
          Bem vindo, <strong>{email}</strong>!
        </span>
        <Link className='button' to='/aluno/novo/0'>
          Novo Aluno
        </Link>
        <button type='button' onClick={logout}>
          <XCircle size={35} color='#17202a' />
        </button>
      </header>

      <form>
        <input type='text' placeholder='Nome' />
        <button type='button' className='button'>
          Filtrar aluno por nome (parcial)
        </button>
      </form>

      <h1>Relação de Alunos</h1>
      <ul className={styles.lista}>
        {alunos.map((aluno) => (
          <li key={aluno.id}>
            <br />
            <b>Nome:</b> {aluno.nome} <br />
            <br />
            <b>Email:</b> {aluno.email} <br />
            <br />
            <b>Idade:</b> {aluno.idade} <br />
            <br />
            <button type='button'>
              <NotePencil size={35} color='#17202a' />
            </button>
            <button type='button'>
              <X size={35} color='#17202a' />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
