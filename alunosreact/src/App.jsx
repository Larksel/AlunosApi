import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import logoCadastro from './assets/cadastro.svg';
import { useEffect, useState } from 'react';

export default function App() {
  const baseUrl = 'https://localhost:7260/api/alunos';
  const [data, setData] = useState([]);

  const pedidoGet = async () => {
    await axios.get(baseUrl)
    .then(res => {
      setData(res.data);
    })
    .catch(err => {
      console.log(err);
    })
  }

  useEffect(() => {
    pedidoGet();
  }, []);

  return (
    <div className='App'>
      <br />
      <h3>Cadastro de Alunos</h3>
      <header>
        <img src={logoCadastro} alt="Cadastro" />
        <button className='btn btn-success'>Incluir Novo Aluno</button>
      </header>
      <table className='table table-bordered'>
        <thead>
          <tr>
            <th>Id</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Idade</th>
            <th>Operação</th>
          </tr>
        </thead>
        <tbody>

        </tbody>
      </table>
    </div>
  )
}
