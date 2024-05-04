import styles from './Login.module.css';
import { Lock } from '@phosphor-icons/react';

export default function Login() {
  return (
    <div className={styles.loginContainer}>
      <section className={styles.form}>
        <Lock id={styles.loginIcon} />
        <form>
          <h1>Cadastro de Alunos</h1>
          <input type='text' placeholder='Email' />
          <input type='password' placeholder='Password' />
          <button className='button' type='submit'>
            Login
          </button>
        </form>
      </section>
    </div>
  );
}
