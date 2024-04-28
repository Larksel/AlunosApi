import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './App.module.css';
import axios from 'axios';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import logoCadastro from './assets/cadastro.svg';
import { useEffect, useState } from 'react';

export default function App() {
  const baseUrl = 'https://localhost:7260/api/alunos';
  const [data, setData] = useState([]);
  const [updateData, setUpdateData] = useState(true);
  const [modalIncluir, setModalIncluir] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalExcluir, setModalExcluir] = useState(false);
  const [alunoSelecionado, setAlunoSelecionado] = useState({
    id: '',
    nome: '',
    email: '',
    idade: '',
  });

  useEffect(() => {
    if (updateData) {
      pedidoGet();
      setUpdateData(false);
    }
  }, [updateData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAlunoSelecionado({
      ...alunoSelecionado,
      [name]: value,
    });
  };

  const abriFecharModalIncluir = () => {
    setModalIncluir(!modalIncluir);
  };

  const abriFecharModalEditar = () => {
    setModalEditar(!modalEditar);
  };

  const abriFecharModalExcluir = () => {
    setModalExcluir(!modalExcluir);
  };

  const selecionarAluno = (aluno, opcao) => {
    setAlunoSelecionado(aluno);
    opcao === 'Editar' ? abriFecharModalEditar() : abriFecharModalExcluir();
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
        setUpdateData(true);
        abriFecharModalIncluir();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const pedidoPut = async () => {
    alunoSelecionado.idade = parseInt(alunoSelecionado.idade);
    await axios
      .put(baseUrl + '/' + alunoSelecionado.id, alunoSelecionado)
      .then((res) => {
        let resposta = res.data;
        let dadosAuxiliares = data;
        dadosAuxiliares.map((aluno) => {
          if (alunoSelecionado.id === aluno.id) {
            aluno.nome = resposta.nome;
            aluno.email = resposta.email;
            aluno.idade = resposta.idade;
          }
        });
        setUpdateData(true);

        abriFecharModalEditar();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const pedidoDelete = async () => {
    await axios
      .delete(baseUrl + '/' + alunoSelecionado.id, alunoSelecionado)
      .then((res) => {
        //setData(data.filter((aluno) => aluno.id !== res.data)); //! Não funciona, a api não retorna dados, apenas uma mensagem de sucesso
        console.log(res.data);
        setData(data.filter((aluno) => aluno.id !== alunoSelecionado.id));
        setUpdateData(true);
        abriFecharModalExcluir();
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
                <button
                  className='btn btn-primary'
                  onClick={() => selecionarAluno(aluno, 'Editar')}
                >
                  Editar
                </button>{' '}
                <button
                  className='btn btn-danger'
                  onClick={() => selecionarAluno(aluno, 'Excluir')}
                >
                  Excluir
                </button>
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

      <Modal isOpen={modalEditar}>
        <ModalHeader>Editar Aluno</ModalHeader>
        <ModalBody>
          <div className='form-group'>
            <label>ID: </label>
            <br />
            <input
              type='text'
              className='form-control'
              readOnly
              value={alunoSelecionado && alunoSelecionado.id}
            />
            <br />
            <label>Nome: </label>
            <br />
            <input
              type='text'
              className='form-control'
              name='nome'
              onChange={handleChange}
              value={alunoSelecionado && alunoSelecionado.nome}
            />
            <label>Email: </label>
            <br />
            <input
              type='text'
              className='form-control'
              name='email'
              onChange={handleChange}
              value={alunoSelecionado && alunoSelecionado.email}
            />
            <label>Idade: </label>
            <br />
            <input
              type='text'
              className='form-control'
              name='idade'
              onChange={handleChange}
              value={alunoSelecionado && alunoSelecionado.idade}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className='btn btn-primary' onClick={() => pedidoPut()}>
            Editar
          </button>{' '}
          <button
            className='btn btn-danger'
            onClick={() => abriFecharModalEditar()}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalExcluir}>
        <ModalBody>
          Confirma a exclusão deste(a) aluno(a):{' '}
          {alunoSelecionado && alunoSelecionado.nome}?
        </ModalBody>
        <ModalFooter>
          <button className='btn btn-danger' onClick={() => pedidoDelete()}>
            Sim
          </button>
          <button
            className='btn btn-secondary'
            onClick={() => abriFecharModalExcluir()}
          >
            Não
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
