import "./style.css";
import api from "../../api";
import NavBar from "../../components/NavBar";
import Table from "../../components/Table";
import Contato from "../../components/ModalNovoContato/index";
import ModalExcluirContato from "../../components/ModalExcluirContato";
import { useEffect, useState } from "react";
import { useLocalStorage } from "react-use";
import { useNavigate } from "react-router-dom";
function Home() {
  const navigate = useNavigate();
  const [contatos, setContatos] = useState([]);
  const [token, setToken, removeToken] = useLocalStorage("token", "");
  const [usuario, setUsuario, removeUsuario] = useLocalStorage("usuario");
  const [qualmodal, setqualModal] = useState([]);
  const [abrirModalContato, SetModalContato] = useState(false);
  const [abrirModalExcluir, setAbrirModalExcluir] = useState(false);
  const [contatoAtual, setContatoAtual] = useState({});
  const [formContato, setFormContato] = useState({
    nome: "",
    email: "",
    telefone: "",
  });
  const config = { headers: { Authorization: `Bearer ${token}` } };

  async function GetContatos() {
    try {
      const { data } = await api.get("/contatos", config);
      setContatos(data);
    } catch (error) {
      console.log(error);
    }
  }
  function deslogar() {
    removeToken();
    removeUsuario();
    navigate("/login");
  }
  useEffect(() => {
    GetContatos();

    if (token) {
      navigate("/home");
    }
  }, []);
  function modalContato(nome, tipobutton, tipobutton2, contato) {
    setFormContato({});
    setqualModal([nome, tipobutton, tipobutton2]);
    setContatoAtual(contato);
    if (contato) {
      setFormContato({
        nome: contato.nome,
        email: contato.email,
        telefone: contato.telefone,
      });
    }
    SetModalContato(true);
  }
  function modalExcluir(boolean, nome, id) {
    setAbrirModalExcluir(boolean);
    setContatoAtual({ nome, id });
  }
  async function excluirContato() {
    try {
      const { data } = await api.delete(`/contatos/${contatoAtual.id}`, config);
      const contatosFilter = contatos.filter(
        (contato) => contato.id !== contatoAtual.id,
      );
      setContatos(contatosFilter);
      setAbrirModalExcluir(false);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="container-page">
      <nav>
        <NavBar deslogar={deslogar} />
      </nav>
      <div className="content-home">
        <div className="table">
          <button
            onClick={() => modalContato("Novo Contato", "Adicionar", "limpar")}
            className="btn-adicionar"
          >
            Adicionar
          </button>
          <div className="table-container">
            <div className="infos-table">
              <span>Nome</span>
              <span>Email</span>
              <span>Telefone</span>
            </div>
            {contatos.map((contato) => (
              <Table
                contato={contato}
                key={contato.id}
                nome={contato.nome}
                id={contato.id}
                email={contato.email}
                telefone={contato.telefone}
                modalContato={modalContato}
                modalExcluir={modalExcluir}
              />
            ))}
          </div>{" "}
          {abrirModalContato ? (
            <Contato
              SetModalContato={SetModalContato}
              qualmodal={qualmodal}
              contatos={contatos}
              setContatos={setContatos}
              contatoAtual={contatoAtual}
              formContato={formContato}
              setFormContato={setFormContato}
            />
          ) : (
            ""
          )}
        </div>
        {abrirModalExcluir ? (
          <ModalExcluirContato
            excluirContato={excluirContato}
            modalExcluir={modalExcluir}
            contatoAtual={contatoAtual}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Home;
