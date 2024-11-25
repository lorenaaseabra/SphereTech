const mongoose = require("mongoose");

const SolicitacaoServicoSchema = new mongoose.Schema({
  cliente: { type: mongoose.Schema.Types.ObjectId, ref: "Cliente", required: true },
  servico: { type: mongoose.Schema.Types.ObjectId, ref: "ServicoTI", required: true },
  status: { type: String, default: "Em Elaboração" },
  dataSolicitacao: { type: Date, default: Date.now },
  dataPrevista: { type: Date },
});

module.exports = mongoose.model("SolicitacaoServico", SolicitacaoServicoSchema);
