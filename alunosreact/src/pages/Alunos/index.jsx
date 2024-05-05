import { Link } from 'react-router-dom';
import styles from './Alunos.module.css';
import { XCircle, ClipboardText, NotePencil, X } from '@phosphor-icons/react';

export default function Alunos() {
  return (
    <div className={styles.alunoContainer}>
      <header className={styles.header}>
        <ClipboardText size={50} color='#6D66B7' />
        <span>Bem vindo, <strong>Lemuel</strong>!</span>
        <Link className='button' to='/aluno/novo/0'>Novo Aluno</Link>
        <button type='button'>
          <XCircle size={35} color='#17202a'/>
        </button>
      </header>

      <form>
        <input type="text" placeholder='Nome' />
        <button type='button' className='button'>
          Filtrar aluno por nome (parcial)
        </button>
      </form>

      <h1>Relação de Alunos</h1>
      <ul className={styles.lista}>
        <li>
          <br />
          <b>Nome:</b> Paulo <br /><br />
          <b>Email:</b> paulo@email.com<br /><br />
          <b>Idade:</b> 22<br /><br />
          <button type='button'>
            <NotePencil size={35} color='#17202a'/>
          </button>
          <button type='button'>
            <X size={35} color='#17202a'/>
          </button>
        </li>

        <li>
          <br />
          <b>Nome:</b> Paulo <br /><br />
          <b>Email:</b> paulo@email.com<br /><br />
          <b>Idade:</b> 22<br /><br />
          <button type='button'>
            <NotePencil size={35} color='#17202a'/>
          </button>
          <button type='button'>
            <X size={35} color='#17202a'/>
          </button>
        </li>
      </ul>
    </div>
  );
}