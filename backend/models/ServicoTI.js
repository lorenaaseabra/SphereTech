const mongoose = require("mongoose");

const ServicoTISchema = new mongoose.Schema({
  nome: { type: String, required: true },
  preco: { type: Number, required: true },
  descricao: { type: String, required: true },
  prazo: { type: String, required: true },
});

module.exports = mongoose.model("ServicoTI", ServicoTISchema);
