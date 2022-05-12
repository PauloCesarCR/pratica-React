import { Routes, Route, Outlet, Navigate, Router } from "react-router-dom";
import { useLocalStorage } from 'react-use';
import Home from "./pages/home/index";
import Login from "./pages/login/index";
import Cadastrar from "./pages/cadastrar";

 function ProtegerRotas({ redirectTo }) {
  const [token] = useLocalStorage("token");
  const estaAutenticado = token;

  return estaAutenticado ? <Outlet /> : <Navigate to={redirectTo} />;
}

function MainRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Login />} />
    <Route element={<ProtegerRotas redirectTo="/login" />}> 
      <Route path="/home" element={<Home />} />
    </Route> 
      <Route path="/cadastre-se" element={<Cadastrar />} />
    </Routes>
  );
}
export default MainRoutes;
