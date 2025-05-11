import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { MdOutlineDone } from "react-icons/md";

function App() {
  const [editing, setEditing] = useState(false); // Set to false initially to show view mode
  

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8">
      <header className="text-4xl font-bold text-gray-800 mb-8">TODO LIST</header>
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
              key={todo.id}
              className="flex items-center bg-white p-4 rounded-lg shadow-md"
            >
              {editing === todo.id ? (
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
                    checked={todo.completed}
                    onChange={() => handleToggleComplete(todo.id)}
                    className="h-5 w-5 text-blue-500 rounded focus:ring-blue-500"
                  />
                  <span
                    className={`flex-1 ml-3 ${
                      todo.completed ? "line-through text-gray-500" : "text-gray-800"
                    }`}
                  >
                    {todo.text}
                  </span>
                </>
              )}
              <div className="flex gap-2">
                {editing === todo.id ? (
                  <>
                    <button
                      onClick={() => handleSaveEdit(todo.id)}
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
                      onClick={() => handleEditTodo(todo.id, todo.text)}
                      className="p-2 text-blue-500 hover:text-blue-600 transition"
                    >
                      <MdEdit size={24} />
                    </button>
                    <button
                      onClick={() => handleDeleteTodo(todo.id)}
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