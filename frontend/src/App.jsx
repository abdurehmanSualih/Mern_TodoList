import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { MdOutlineDone } from "react-icons/md";

function App() {
  const [editing, setEditing] = useState(true);
  return (
    <div>
      <header>TODO LIST</header>
      <div>
        <input type="text" />
        <button>ADD</button>
      </div>
      <div>
        <ul>
          <li>
            {!editing ? (
              <>
                <input type="checkbox" />
                <span>todos </span>
              </>
            ) : (
              <input type="text" />
            )}
            {!editing ? (
              <>
                <button>
                  <MdEdit />
                </button>
                <button>
                  <MdDelete />
                </button>
              </>
            ) : (
              <>
                <button>
                  <MdOutlineDone />
                </button>
                <button>
                  <IoClose />
                </button>
              </>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default App;
