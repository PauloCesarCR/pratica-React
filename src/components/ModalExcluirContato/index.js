import "./style.css";

function ModalExcluirContato({ modalExcluir, contatoAtual, excluirContato }) {
  return (
    <div className="container-form">
      <div className="modal-excluircontato">
        <span
          onClick={() => modalExcluir(false)}
          className="fecharModalExcluir"
        >
          X
        </span>
        <h1>Confirma a exclusão?</h1>
        <span>Deseja excluir o contato, {contatoAtual.nome}?</span>
        <button onClick={() => excluirContato()} className="btn-excluir">
          Excluir
        </button>
        <button
          onClick={() => modalExcluir(false)}
          className="btn-cancelarAcao"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}

export default ModalExcluirContato;
