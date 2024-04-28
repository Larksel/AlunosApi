import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './App.module.css';
import axios from 'axios';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import logoCadastro from './assets/cadastro.svg';
import { useEffect, useState } from 'react';

export default function App() {
  const baseUrl = 'https://localhost:7260/api/alunos';
  const [data, setData] = useState([]);
  const [modalIncluir, setModalIncluir] = useState(false);
  const [alunoSelecionado, setAlunoSelecionado] = useState({
    id: '',
    nome: '',
    email: '',
    idade: '',
  });

  useEffect(() => {
    pedidoGet();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAlunoSelecionado({
      ...alunoSelecionado,
      [name]: value,
    });
    console.log(alunoSelecionado);
  };

  const abriFecharModalIncluir = () => {
    setModalIncluir(!modalIncluir);
  };

  const pedidoGet = async () => {
    await axios
      .get(baseUrl)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const pedidoPost = async () => {
    delete alunoSelecionado.id;
    alunoSelecionado.idade = parseInt(alunoSelecionado.idade);
    await axios
      .post(baseUrl, alunoSelecionado)
      .then((res) => {
        setData(data.concat(res.data));
        abriFecharModalIncluir();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={styles.App}>
      <h3>Cadastro de Alunos</h3>
      <header className={styles.header}>
        <img
          src={logoCadastro}
          className={styles.logoCadastro}
          alt='Cadastro'
        />
        <button className='btn btn-success' onClick={abriFecharModalIncluir}>
          Incluir Novo Aluno
        </button>
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
          {data.map((aluno) => (
            <tr key={aluno.id}>
              <td>{aluno.id}</td>
              <td>{aluno.nome}</td>
              <td>{aluno.email}</td>
              <td>{aluno.idade}</td>
              <td>
                <button className='btn btn-primary'>Editar</button>{' '}
                <button className='btn btn-danger'>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={modalIncluir}>
        <ModalHeader>Incluir Aluno</ModalHeader>
        <ModalBody>
          <div className='form-group'>
            <label>Nome: </label>
            <br />
            <input
              type='text'
              className='form-control'
              name='nome'
              onChange={handleChange}
            />
            <label>Email: </label>
            <br />
            <input
              type='text'
              className='form-control'
              name='email'
              onChange={handleChange}
            />
            <label>Idade: </label>
            <br />
            <input
              type='text'
              className='form-control'
              name='idade'
              onChange={handleChange}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className='btn btn-primary' onClick={() => pedidoPost()}>
            Incluir
          </button>{' '}
          <button
            className='btn btn-danger'
            onClick={() => abriFecharModalIncluir()}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
