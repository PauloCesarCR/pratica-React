import "./style.css";
import imgcadastrar from "../../assets/imgcadastrar.png";
import { useEffect, useState } from "react";
import api from "../../api";
import { useNavigate, Link} from "react-router-dom";
import { useLocalStorage } from "react-use";
function Cadastrar() {
  const navigate = useNavigate();
  const [token] = useLocalStorage("token");
  const [formCadastro, setFormCadastro] = useState({
    nome: "",
    email: "",
    senha: "",
  });
  console.log(formCadastro);
  async function trocarValorInput(e) {
    setFormCadastro({ ...formCadastro, [e.target.name]: e.target.value });
  }

  async function fazerCadastro() {
    if (!formCadastro.nome || !formCadastro.email || !formCadastro.senha) {
      return;
    }

    try {
      const { data } = await api.post("/usuarios", formCadastro);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSubmitCadastro(e) {
    e.preventDefault();
    fazerCadastro();
  }

  useEffect(() => {
    if (token) {
      navigate("/home");
    }
  }, []);
  return (
    <div className="container-page">
      <div className="content-page">
        <div className="content-cadastro">
          <form onSubmit={handleSubmitCadastro}>
            <div className="text-cadastro">
              <h1>Cadastre-se</h1>
            </div>
            <label>
              <input
                type="text"
                placeholder="Nome"
                name="nome"
                onChange={trocarValorInput}
              />
            </label>
            <label>
              <input
                type="text"
                placeholder="E-mail"
                name="email"
                onChange={trocarValorInput}
              />
            </label>
            <label>
              <input
                type="password"
                placeholder="Senha"
                name="senha"
                onChange={trocarValorInput}
              />
            </label>
            <button className="btn-confirmar">Cadastrar</button>
            <button className="btn-cancelar">Cancelar</button>
          </form>
          <Link to="/login">Já tem uma conta? clique para fazer login</Link>
        </div>
        <img src={imgcadastrar} alt="smartphone" />
      </div>
    </div>
  );
}

export default Cadastrar;
