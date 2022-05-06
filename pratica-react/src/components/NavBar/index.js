import "./style.css";
import sair from "../../assets/sair.png";
import { useLocalStorage } from "react-use";
function NavBar({ deslogar }) {
  return (
    <nav>
      <div className="content-navbar">
        <h1>KONTACTS</h1>
      </div>
      <img
        onClick={() => deslogar()}
        className="img-sair"
        src={sair}
        alt="sair"
      />
    </nav>
  );
}

export default NavBar;
