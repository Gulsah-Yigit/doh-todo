import { useState, useRef } from "react";
import { Form, Button } from "react-bootstrap";

import "./styles/style.css";

const initialState = [
  { id: 1, todo: "Çöpü çıkar.", isCompleted: false },
  { id: 2, todo: "Ekmek al", isCompleted: true },
];

const TodoList = () => {
  const inputRef = useRef();
  const [list, setList] = useState(initialState);
  const [entry, setEntry] = useState("");

  const focusOnInput = () => {
    inputRef.current.focus();
  };

  return (
    <div className="container">
      <h1 className="title">D'oh! ToDo</h1>
      {/* burası input form kısmı */}

      <Form>
        <div>
          <label className="label" for="exampleInputEmail1">
            I can't fucking remember
          </label>
          <div className="d-flex">
            <input
              ref={inputRef}
              value={entry}
              onChange={(event) => setEntry(event.target.value)}
              className="input form-control"
              type="text"
              placeholder="add to do"
            />
            <button
              onClick={(event) => {
                event.preventDefault();

                if (entry.trim().length) {
                  setList((prev) => [
                    ...prev,
                    {
                      id: Date.now(),
                      todo:
                        entry.substring(0, 1).toUpperCase() +
                        entry.substring(1),
                      completed: false,
                    },
                  ]);

                  setEntry("");
                }

                focusOnInput();
              }}
              className="btn btn-outline-warning"
              type="submit"
            >
              Add
            </button>
          </div>
        </div>
      </Form>

      {/* burası da liste kısmı */}
      <ul className="mt-2 item-position">
        {list.map((item) => (
          <li
            onClick={() => {
              setList(
                list.map((elmn) =>
                  elmn.id === item.id
                    ? { ...elmn, isCompleted: !elmn.isCompleted }
                    : elmn
                )
              );
            }}
            key={item.id}
            className={`list-group-item ${item.isCompleted ? "completed" : ""}`}
            aria-current="true"
          >
            {item.todo}
          </li>
        ))}
      </ul>

      <Button
        className="clear-btn"
        onClick={() => setList(list.filter((item) => !item.isCompleted))}
        variant="info"
      >
        Clear Completed
      </Button>
    </div>
  );
};

export default TodoList;
