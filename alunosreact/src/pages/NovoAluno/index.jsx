import { Link, useNavigate, useParams } from 'react-router-dom';
import styles from './NovoAluno.module.css';
import { UserPlus, ArrowBendDownLeft } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';
import api from '../../services/api';

export default function NovoAluno() {
  const [id, setId] = useState(null);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [idade, setIdade] = useState(0);

  const navigate = useNavigate();
  const { alunoId } = useParams();

  const token = localStorage.getItem('token');
  const authorization = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    if (alunoId === '0') return;
    else loadAluno();
  }, [alunoId]);

  async function loadAluno() {
    try {
      const response = await api.get(`api/alunos/${alunoId}`, authorization);
      setId(response.data.id);
      setNome(response.data.nome);
      setEmail(response.data.email);
      setIdade(response.data.idade);
    } catch (err) {
      alert('Erro ao carregar aluno ' + err);
      navigate('/alunos');
    }
  }

  async function saveOrUpdate(event) {
    event.preventDefault();
    
    const data = {
      nome,
      email,
      idade,
    };

    try {
      if (alunoId === '0') {
        await api.post('api/alunos', data, authorization);
      } else {
        data.id = id;
        await api.put(`api/alunos/${id}`, data, authorization);
      }
    } catch (err) {
      alert('Erro ao gravar aluno ' + err);
    }

    navigate('/alunos');
  }

  return (
    <div className={styles.novoAlunoContainer}>
      <div className={styles.content}>
        <section className={styles.form}>
          <UserPlus size={105} color='#17202a' />
          <h1>{alunoId === '0' ? 'Incluir Novo Aluno' : 'Atualizar Aluno'}</h1>
          <Link className={styles.backLink} to='/alunos'>
            <ArrowBendDownLeft size={25} color='#17202a' />
            Retornar
          </Link>
        </section>
        <form onSubmit={saveOrUpdate}>
          <input
            type='text'
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder='Nome'
          />
          <input
            type='text'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Email'
          />
          <input
            type='text'
            value={idade}
            onChange={(e) => setIdade(e.target.value)}
            placeholder='Idade'
          />
          <button className='button' type='submit'>
            {alunoId === '0' ? 'Incluir' : 'Atualizar'}
          </button>
        </form>
      </div>
    </div>
  );
}
