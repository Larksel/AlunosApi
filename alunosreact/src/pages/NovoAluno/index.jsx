import { Link, useParams } from 'react-router-dom';
import styles from './NovoAluno.module.css';
import { UserPlus, ArrowBendDownLeft } from '@phosphor-icons/react';

export default function NovoAluno() {
  const { alunoId } = useParams();

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
        <form>
          <input type="text" placeholder='Nome' />
          <input type="text" placeholder='Email' />
          <input type="text" placeholder='Idade' />
          <button className='button' type='submit'>{alunoId === '0' ? 'Incluir' : 'Atualizar'}</button>
        </form>
      </div>
    </div>
  );
}