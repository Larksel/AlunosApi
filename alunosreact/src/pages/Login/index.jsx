import styles from './Login.module.css';
import loginIcon from '../../assets/login.svg';

export default function Login() {
  return (
    <div className={styles.loginContainer}>
      <section className={styles.form}>
        <img src={loginIcon} alt='login' id={styles.loginIcon} />
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
