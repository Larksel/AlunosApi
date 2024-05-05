import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import api from '../../services/api';

import { Lock } from '@phosphor-icons/react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  async function login(event) {
    event.preventDefault();

    const data = {
      email, password
    };

    try {
      const response = await api.post('api/account/loginuser', data);

      localStorage.setItem('email', email);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('expiration', response.data.expiration);

      navigate('/alunos');

    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className={styles.loginContainer}>
      <section className={styles.form}>
        <Lock id={styles.loginIcon} />
        <form onSubmit={login}>
          <h1>Cadastro de Alunos</h1>
          <input
            type='text'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Email'
          />
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
          />
          <button className='button' type='submit'>
            Login
          </button>
        </form>
      </section>
    </div>
  );
}
