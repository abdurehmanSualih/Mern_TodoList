const express = require("express");

const router = express.Router();

const { addToDos, getToDos, updateTodos, deleteTodos } = require("../controllers/todosController");

router.get("/", getToDos);
router.post("/add", addToDos);
router.put("/update/:id", updateTodos);
router.delete("/delete/:id", deleteTodos);


module.exports = router;
