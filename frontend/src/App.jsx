import { useState, useEffect } from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { MdOutlineDone } from "react-icons/md";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editing, setEditing] = useState(null);
  const [editTodo, setEditTodo] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = "/todos"; // Proxied to http://localhost:5000/todos

  // Fetch todos
  useEffect(() => {
    const fetchTodos = async () => {
      setLoading(true);
      try {
        const response = await axios.get(API_URL);
        setTodos(Array.isArray(response.data) ? response.data : []);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch todos.");
      } finally {
        setLoading(false);
      }
    };
    fetchTodos();
  }, []);

  // Add a todo
  const handleAddTodo = async () => {
    if (!newTodo.trim()) return;
    try {
      const response = await axios.post(`${API_URL}/add`, { text: newTodo });
      setTodos([...todos, response.data.toDo]);
      setNewTodo("");
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to add todo.");
    }
  };

  // Delete a todo
  const handleDeleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/delete/${id}`);
      setTodos(todos.filter((todo) => todo._id !== id));
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to delete todo.");
    }
  };

  // Start editing a todo
  const handleEditTodo = (id, text) => {
    setEditing(id);
    setEditTodo(text);
  };

  // Save edited todo
  const handleSaveEdit = async (id) => {
    try {
      const todo = todos.find((todo) => todo._id === id);
      if (!todo) throw new Error("Todo not found");
      await axios.put(`${API_URL}/update/${id}`, { text: editTodo });
      setTodos(
        todos.map((todo) =>
          todo._id === id ? { ...todo, text: editTodo } : todo
        )
      );
      setEditing(null);
      setEditTodo("");
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to update todo.");
    }
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditing(null);
    setEditTodo("");
  };

  // Toggle todo completion
  const handleToggleComplete = async (id) => {
    const todo = todos.find((todo) => todo._id === id);
    if (!todo) return;
    try {
      await axios.put(`${API_URL}/update/${id}`, {
        text: todo.text,
        completed: !todo.completed,
      });
      setTodos(
        todos.map((todo) =>
          todo._id === id ? { ...todo, completed: !todo.completed } : todo
        )
      );
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to update todo.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8">
      <header className="text-4xl font-bold text-gray-800 mb-8">
        TODO LIST
      </header>
      {error && (
        <div className="w-full max-w-md mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}
      {loading && (
        <div className="w-full max-w-md mb-4 p-3 text-gray-600 animate-pulse">
          Loading...
        </div>
      )}
      {!loading && todos.length === 0 && !error && (
        <div className="w-full max-w-md mb-4 p-3 text-gray-600 text-center">
          No todos yet. Add one to get started!
        </div>
      )}
      <div className="w-full max-w-md flex gap-2 mb-6">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new task"
          className="flex-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleAddTodo}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          ADD
        </button>
      </div>
      <div className="w-full max-w-md">
        <ul className="space-y-3">
          {todos.map((todo) => (
            <li
              key={todo._id}
              className="flex items-center bg-white p-4 rounded-lg shadow-md"
            >
              {editing === todo._id ? (
                <input
                  type="text"
                  value={editTodo}
                  onChange={(e) => setEditTodo(e.target.value)}
                  className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <>
                  <input
                    type="checkbox"
                    checked={todo.completed || false}
                    onChange={() => handleToggleComplete(todo._id)}
                    className="h-5 w-5 text-blue-500 rounded focus:ring-blue-500"
                  />
                  <span
                    className={`flex-1 ml-3 ${
                      todo.completed
                        ? "line-through text-gray-500"
                        : "text-gray-800"
                    }`}
                  >
                    {todo.text || "Untitled"}
                  </span>
                </>
              )}
              <div className="flex gap-2">
                {editing === todo._id ? (
                  <>
                    <button
                      onClick={() => handleSaveEdit(todo._id)}
                      className="p-2 text-green-500 hover:text-green-600 transition"
                    >
                      <MdOutlineDone size={24} />
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="p-2 text-red-500 hover:text-red-600 transition"
                    >
                      <IoClose size={24} />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEditTodo(todo._id, todo.text || "")}
                      className="p-2 text-blue-500 hover:text-blue-600 transition"
                    >
                      <MdEdit size={24} />
                    </button>
                    <button
                      onClick={() => handleDeleteTodo(todo._id)}
                      className="p-2 text-red-500 hover:text-red-600 transition"
                    >
                      <MdDelete size={24} />
                    </button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
