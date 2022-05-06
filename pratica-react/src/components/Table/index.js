import "./style.css";

import deletar from "../../assets/deletar.png";
import editar from "../../assets/editar.png";
function Table({
  nome,
  email,
  telefone,
  modalExcluir,
  modalContato,
  id,
  contato,
}) {
  const parte1 = telefone.slice(0, 2);
  const parte2 = telefone.slice(2, 7);
  const parte3 = telefone.slice(7, 11);
  const telefoneFormatado = `(${parte1})${parte2}-${parte3}`;
  return (
    <div className="infos-contato">
      <div className="nome">
        <span>{nome}</span>
      </div>
      <div className="email">
        <span>{email}</span>
      </div>
      <div className="telefone">
        <span>{telefoneFormatado}</span>
      </div>
      <div className="btns-contato">
        <img
          onClick={() =>
            modalContato("Editar Contato", "Salvar", "Cancelar", contato)
          }
          src={editar}
          className="btn-editar"
        />
        <img
          onClick={() => modalExcluir(true, nome, id)}
          src={deletar}
          className="btn-editar"
        />
      </div>
    </div>
  );
}

export default Table;
