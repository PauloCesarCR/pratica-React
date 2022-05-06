import { Routes, Route, Outlet, Navigate, Router } from "react-router-dom";
import Home from "./pages/home/index";
import Login from "./pages/login/index";
import Cadastrar from "./pages/cadastrar";

// function ProtegerRotas({ redirectTo }) {
//   const estaAutenticado = getItem("token");

//   return estaAutenticado ? <Outlet /> : <Navigate to={redirectTo} />;
// }

function MainRoutes() {
  return (
    <Routes>
      {/* <Route element={<ProtegerRotas redirectTo="/login" />}> */}
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/cadastre-se" element={<Cadastrar />} />
      {/* </Route> */}
    </Routes>
  );
}
export default MainRoutes;
