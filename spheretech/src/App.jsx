import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import ChangePassword from "./components/ChangePassword";
import RequestService from "./components/RequestService";
import CreateService from "./components/CreateService";
import Home from "./components/Home";



const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          {/* Rota para a página inicial */}
          <Route path="/" element={<Home />} />
          
          {/* Rota para login */}
          <Route path="/login" element={<Login />} />

          {/* Rota para cadastro */}
          <Route path="/register" element={<Register />} />

          {/* Rota para troca de senha */}
          <Route path="/change-password" element={<ChangePassword />} />

          {/* Rota para solicitação de serviços */}
          <Route path="/request-service" element={<RequestService />} />

          {/* Rota para criar novo serviço de TI */}
          <Route path="/create-service" element={<CreateService />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
