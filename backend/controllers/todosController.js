const Todos = require("../models/todo");

exports.getTodos = (req, res, next) => {};

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
    res.status(500).json({ error: "An error occurred while adding the to-do" });
  }
};
