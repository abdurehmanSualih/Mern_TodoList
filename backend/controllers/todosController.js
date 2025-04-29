const Todos = require("../models/todo");

exports.getTodos = (req, res, next) => {};

exports.getToDos = async (req, res, nest) => {
  try {
    const gettodos = await Todos.find();
    if (!gettodos) {
      return res.status(401).json({ error: "no data found" });
    }
    res.status(200).json(gettodos);
  } catch (error) {
    res
      .status(500)
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
    res.status(500).json({ error: "An error occurred while adding the to-do" });
  }
};
