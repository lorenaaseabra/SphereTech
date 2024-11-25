const express = require("express");
const router = express.Router();
const servicoController = require("../controllers/servicoController");

router.post("/create", servicoController.createService);
router.get("/all", servicoController.getAllServices);

module.exports = router;
