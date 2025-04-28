const express = require("express");

const router = express.Router();

const { addToDos } = require("../controllers/todosController");

router.post("/add", addToDos);

module.exports = router;
