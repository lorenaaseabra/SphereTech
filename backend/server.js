const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const clienteRoutes = require("./routes/clienteRoutes");
const servicoRoutes = require("./routes/servicoRoutes");
const solicitacaoRoutes = require("./routes/solicitacaoRoutes");

const app = express();
require("dotenv").config();

app.use(cors());
app.use(bodyParser.json());

// Conexão com MongoDB
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Conectado ao MongoDB"))
    .catch((err) => console.error("Erro ao conectar ao MongoDB", err));

// Rotas
app.use("/api/clientes", clienteRoutes);
app.use("/api/servicos", servicoRoutes);
app.use("/api/solicitacoes", solicitacaoRoutes);

// Iniciar o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
