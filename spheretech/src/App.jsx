import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import ChangePassword from "./components/ChangePassword";
import RequestService from "./components/RequestService";
import "./App.css"; // Certifique-se de que os estilos globais estejam neste arquivo

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Página inicial */}
          <Route path="/" element={<Home />} />

          {/* Página de login */}
          <Route path="/login" element={<Login />} />

          {/* Página de registro */}
          <Route path="/register" element={<Register />} />

          {/* Página de troca de senha */}
          <Route path="/change-password" element={<ChangePassword />} />

          {/* Página de solicitação de serviços */}
          <Route path="/request-service" element={<RequestService />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
