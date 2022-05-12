import "./style.css";
import api from "../../api";
import imglogin from "../../assets/imglogin.png";
import { useNavigate,Link} from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocalStorage } from "react-use";
function Login() {
  const navigate = useNavigate();

  const [formLogin, setFormLogin] = useState({ email: "", senha: "" });
  const [token, setToken, removeToken] = useLocalStorage("token", "");
  const [usuario, setUsuario, removeUsuario] = useLocalStorage("usuario");
  async function trocarValorInput(e) {
    setFormLogin({ ...formLogin, [e.target.name]: e.target.value });
  }

  async function fazerLogin() {
    if (!formLogin.email || !formLogin.senha) {
      return;
    }

    try {
      const { data } = await api.post("/login", formLogin);
      setToken(data.token);
      setUsuario(data.usuario);
      navigate("/home");
    } catch (error) {}
  }

  async function handleSubmitLogin(e) {
    e.preventDefault();
    fazerLogin();
  }
  useEffect(() => {
    if (token) {
      navigate("/home");
    }
  }, []);

  return (
    <div className="container-page">
      <div className="content-page">
        <img src={imglogin} alt="smartphone" />
        <div className="content-login">
          <form onSubmit={handleSubmitLogin}>
            <div className="text-login">
              <span>Bem vindo</span>
              <h1>Faça o login com sua conta</h1>
            </div>
            <label>
              <input
                type="text"
                placeholder="E-mail"
                onChange={trocarValorInput}
                name="email"
              />
            </label>
            <label>
              <input
                type="password"
                placeholder="Senha"
                onChange={trocarValorInput}
                name="senha"
              />
            </label>
            <button className="btn-confirmar">Login</button>
          </form>
          <Link to="/cadastre-se">Não tem uma conta? Cadastre-se </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
