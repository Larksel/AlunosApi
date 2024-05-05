import { BrowserRouter, Routes as Rotas, Route } from "react-router-dom";

import Login from "./pages/Login";
import Alunos from "./pages/Alunos";
import NovoAluno from "./pages/NovoAluno";

export default function Routes() {
  return (
    <BrowserRouter>
      <Rotas>
        <Route path="/" element={<Login />} />
        <Route path="/alunos" element={<Alunos />} />
        <Route path="/aluno/novo/:alunoId" element={<NovoAluno />} />
      </Rotas>
    </BrowserRouter>
  );
}