const express = require("express");

const router = express.Router();

const { addToDos, getToDos } = require("../controllers/todosController");

router.get("/", getToDos);
router.post("/add", addToDos);

module.exports = router;
