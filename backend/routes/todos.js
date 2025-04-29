const express = require("express");

const router = express.Router();

const { addToDos, getToDos, updateTodos } = require("../controllers/todosController");

router.get("/", getToDos);
router.post("/add", addToDos);
router.put("/update/:id", updateTodos);


module.exports = router;
