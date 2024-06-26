import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Alunos.module.css';
import api from '../../services/api';

import { XCircle, ClipboardText, NotePencil, X } from '@phosphor-icons/react';

export default function Alunos() {
  const navigate = useNavigate();
  const [alunos, setAlunos] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [filtro, setFiltro] = useState([]);

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

  const searchAlunos = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput !== '') {
      const dadosFiltrados = alunos.filter((item) => {
        return Object.values(item)
          .join('')
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });

      setFiltro(dadosFiltrados);
    } else {
      setFiltro(alunos);
    }
  };

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

  async function editarAluno(id) {
    try {
      navigate(`/aluno/novo/${id}`);
    } catch (err) {
      alert('Não foi possível editar o aluno');
    }
  }

  async function deleteAluno(id) {
    try {
      if (window.confirm('Deseja deletar o aluno de id = ' + id + '?')) {
        await api.delete(`api/alunos/${id}`, authorization);
        setAlunos(alunos.filter(aluno => aluno.id !== id));
      }
    } catch (err) {
      alert('Não foi possível excluir o aluno ' + err);
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
        <input
          type='text'
          placeholder='Nome'
          onChange={(e) => searchAlunos(e.target.value)}
        />
      </form>

      <h1>Relação de Alunos</h1>
      {searchInput.length > 1 ? (
        <ul className={styles.lista}>
          {filtro.map((aluno) => (
            <li key={aluno.id}>
              <br />
              <b>Nome:</b> {aluno.nome} <br />
              <br />
              <b>Email:</b> {aluno.email} <br />
              <br />
              <b>Idade:</b> {aluno.idade} <br />
              <br />
              <button onClick={() => editarAluno(aluno.id)} type='button'>
                <NotePencil size={35} color='#17202a' />
              </button>
              <button onClick={() => deleteAluno(aluno.id)} type='button'>
                <X size={35} color='#17202a' />
              </button>
            </li>
          ))}
        </ul>
      ) : (
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
              <button onClick={() => editarAluno(aluno.id)} type='button'>
                <NotePencil size={35} color='#17202a' />
              </button>
              <button onClick={() => deleteAluno(aluno.id)} type='button'>
                <X size={35} color='#17202a' />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
