const Todos = require("../models/todo");

exports.getToDos = async (req, res, nest) => {
  try {
    const gettodos = await Todos.find();
    if (!gettodos) {
      return res.status(401).json({ error: "no data found" });
    }
    res.status(200).json(gettodos);
  } catch (error) {
    res
      .status(400)
      .json({ message: "erroe retraving data", error: error.message });
  }
};

exports.addToDos = async (req, res, next) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Text field is required" });
    }

    const newToDo = await Todos.create({ text });

    res
      .status(201)
      .json({ message: "To-do added successfully", toDo: newToDo });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "An error occurred while adding the to-do" });
  }
};

exports.updateTodos = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { text } = req.body;

    const todo = await Todos.findOneAndUpdate(
      { _id: id },
      { text: text },
      { new: true }
    );

    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.status(200).json(todo);
  } catch (error) {
    res
      .status(400)
      .json({
        error: "An error occurred while updating the to-do",
        details: error.message,
      });
  }
};


exports.deleteTodos = async (req, res, next) => {
  try {
    const { id } = req.params;

    const todo = await Todos.findOneAndDelete({ _id: id });

    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.status(200).json({ message: "Todo deleted successfully", deletedTodo: todo });
  } catch (error) {
    res.status(400).json({ error: "An error occurred while deleting the to-do", details: error.message });
  }
};