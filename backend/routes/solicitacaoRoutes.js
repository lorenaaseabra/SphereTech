const express = require('express');
const router = express.Router();
const solicitacaoController = require('../controllers/solicitacaoController');

router.post('/get-user-requests', solicitacaoController.getUserRequests);
router.post('/update-requests', solicitacaoController.updateRequests);
router.delete('/delete/:id', solicitacaoController.deleteRequest);

module.exports = router;
