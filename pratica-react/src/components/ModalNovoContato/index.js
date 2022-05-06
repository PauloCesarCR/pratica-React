import { useState } from "react";
import { useLocalStorage } from "react-use";
import api from "../../api";
import "./style.css";

function Contato({
  SetModalContato,
  qualmodal,
  setContatos,
  contatos,
  formContato,
  contatoAtual,
  setFormContato,
}) {
  const [token] = useLocalStorage("token");
  const config = { headers: { Authorization: `Bearer ${token}` } };

  async function trocarValorInput(e) {
    setFormContato({ ...formContato, [e.target.name]: e.target.value });
  }

  async function CadastrarContato() {
    try {
      const { data } = await api.post("/contatos", formContato, config);
      const newuser = data[0];
      setContatos([...contatos, newuser]);
      SetModalContato(false);
    } catch (error) {
      console.log(error);
    }
  }
  async function editarcontato() {
    try {
      const { data } = api.put(
        `/contatos/${contatoAtual.id}`,
        formContato,
        config,
      );
      SetModalContato(false);
    } catch (error) {
      console.log(error);
    }
  }
  function HandleSubmitContato(e) {
    e.preventDefault();
    if (qualmodal[0] === "Novo Contato") {
      CadastrarContato();
      return;
    } else {
      editarcontato();
    }
  }
  return (
    <div className="container-form">
      <form onSubmit={HandleSubmitContato} className="form-contato">
        <span
          onClick={() => {
            SetModalContato(false);
          }}
          className="btn-fechar"
        >
          X
        </span>
        <h1>{qualmodal[0]}</h1>
        <label>
          <input
            type="text"
            placeholder="Nome"
            name="nome"
            onChange={trocarValorInput}
            defaultValue={formContato.nome}
          />
        </label>
        <label>
          <input
            type="email"
            placeholder="E-mail"
            name="email"
            defaultValue={formContato.email}
            onChange={trocarValorInput}
          />
        </label>
        <label>
          <input
            type="number"
            placeholder="Telefone"
            name="telefone"
            defaultValue={formContato.telefone}
            onChange={trocarValorInput}
          />
        </label>
        <button className="btn-adicionar">{qualmodal[1]}</button>
        <button type="button" className="btn-cancelar">
          {qualmodal[2]}
        </button>
      </form>
    </div>
  );
}

export default Contato;
