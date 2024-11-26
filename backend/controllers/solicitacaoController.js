const SolicitacaoServico = require('../models/SolicitacaoServico');
const Cliente = require('../models/Cliente');

exports.getUserRequests = async (req, res) => {
  const { email } = req.body;
  try {
    const cliente = await Cliente.findOne({ email });
    if (!cliente) {
      return res
        .status(404)
        .json({ success: false, message: 'Cliente não encontrado.' });
    }

    const solicitacoes = await SolicitacaoServico.find({
      cliente: cliente._id,
    }).populate('servico');
    res.status(200).json({ success: true, data: solicitacoes });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateRequests = async (req, res) => {
  const { email, solicitacoes } = req.body;
  try {
    const cliente = await Cliente.findOne({ email });
    if (!cliente) {
      return res
        .status(404)
        .json({ success: false, message: 'Cliente não encontrado.' });
    }

    console.log('Received Solicitacoes:', solicitacoes);

    const novasSolicitacoes = solicitacoes.map((solicitacao) => ({
      cliente: cliente._id,
      servicoId: solicitacao.servicoId,
      servico: solicitacao.servico,
      dataPrevista: solicitacao.dataPrevista,
      preco: solicitacao.preco,
      descricao: solicitacao.descricao,
      status: solicitacao.status || 'Em Elaboração',
    }));

    console.log('Processed Solicitacoes:', novasSolicitacoes);

    const result = await SolicitacaoServico.insertMany(novasSolicitacoes);
    res.status(200).json({
      success: true,
      message: 'Solicitações atualizadas com sucesso.',
      data: result,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.deleteRequest = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRequest = await SolicitacaoServico.findByIdAndDelete(id);
    if (!deletedRequest) {
      return res
        .status(404)
        .json({ success: false, message: 'Solicitação não encontrada.' });
    }
    res.status(200).json({
      success: true,
      message: 'Solicitação removida com sucesso.',
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
