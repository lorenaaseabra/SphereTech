const mongoose = require('mongoose');

const SolicitacaoServicoSchema = new mongoose.Schema({
  cliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cliente',
    required: true,
  },
  servicoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ServicoTI',
    required: true,
  },
  preco: { type: Number },
  servico: { type: String },
  status: { type: String, default: 'Em Elaboração' },
  dataSolicitacao: { type: Date, default: Date.now },
  dataPrevista: { type: Date },
  descricao: { type: String },
});

module.exports = mongoose.model('SolicitacaoServico', SolicitacaoServicoSchema);
