
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BuscarVeiculo from './pages/BuscarVeiculo';
import Perfil from './pages/Perfil';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastrar" element={<Cadastro />} />
        <Route path="/buscar-veiculo/:veiculo" element={<BuscarVeiculo />} />
        <Route path="/perfil/:aba" element={<Perfil />} />
        <Route path="/*" element={<h1>Not found</h1>} />
      </Routes>
      <ToastContainer/>
    </BrowserRouter>
  );
}

export default App;
