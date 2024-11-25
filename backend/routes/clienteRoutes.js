const express = require("express");
const router = express.Router();
const clienteController = require("../controllers/clienteController");

router.post("/auth", clienteController.authenticate);
router.post("/change-password", clienteController.changePassword);
router.post("/register", clienteController.register);

module.exports = router;
