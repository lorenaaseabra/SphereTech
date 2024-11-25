import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    email: "",
    senhaAtual: "",
    novaSenha: "",
    confirmaNovaSenha: "",
  });
  const [message, setMessage] = useState("");

  const handleChangePassword = async () => {
    // Verifica se as senhas coincidem
    if (formData.novaSenha !== formData.confirmaNovaSenha) {
      setMessage("As senhas não coincidem.");
      return;
    }

    // Fazendo a requisição para alterar a senha
    try {
      const response = await fetch("http://localhost:5000/api/clientes/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          senhaAtual: formData.senhaAtual,
          novaSenha: formData.novaSenha,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage("Senha alterada com sucesso.");
      } else {
        setMessage(data.message || "Erro ao alterar senha.");
      }
    } catch (error) {
      setMessage("Erro ao alterar senha.");
    }
  };

  return (
    <div className="d-flex flex-column vh-100">
      <Navbar loggedIn={false} />
      <div className="container mt-5 flex-grow-1">
        <h2 className="text-center">Trocar Senha</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">E-mail:</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="senhaAtual" className="form-label">Senha Atual:</label>
            <input
              type="password"
              className="form-control"
              id="senhaAtual"
              value={formData.senhaAtual}
              onChange={(e) => setFormData({ ...formData, senhaAtual: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="novaSenha" className="form-label">Nova Senha:</label>
            <input
              type="password"
              className="form-control"
              id="novaSenha"
              value={formData.novaSenha}
              onChange={(e) => setFormData({ ...formData, novaSenha: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="confirmaNovaSenha" className="form-label">Confirme a Nova Senha:</label>
            <input
              type="password"
              className="form-control"
              id="confirmaNovaSenha"
              value={formData.confirmaNovaSenha}
              onChange={(e) => setFormData({ ...formData, confirmaNovaSenha: e.target.value })}
            />
          </div>
          {message && <div className="text-danger mb-3">{message}</div>}
          <button type="button" className="btn btn-primary" onClick={handleChangePassword}>
            Alterar Senha
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default ChangePassword;
