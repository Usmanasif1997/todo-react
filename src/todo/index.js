import { useState, useEffect } from "react";
import AddTodoModal from "../components/addTodoModal";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { DotsVerticalIcon } from "@heroicons/react/solid";
import { ClockIcon } from "@heroicons/react/outline";
import EditModalTodo from "../components/editTodoModal";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Task() {
  let [open, setOpen] = useState(false);
  let [openEdit, setOpenEdit] = useState(false);
  let [todo, setTodo] = useState(null);
  let [todos, setTodos] = useState([]);
  let [todoEditing, setTodoEditing] = useState(null);
  let [editingText, setEditingText] = useState("");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("todos"));
    setTodos(data ? data : []);
  }, []);

  function deleteTodo(id) {
    let updatedTodos = [...todos].filter((todo) => todo.id !== id);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setTodos(updatedTodos);
  }

  function submitEdits(id) {
   [...todos].map((todo) => {
      if (todo.id === id) {
        setTodo(todo);
        setOpenEdit(true);
      }
      return todo;
    });
  }

  return (
    <>
      <div className="h-screen w-full overflow-hidden flex flex-col gap-4 p-4 bg-slate-100">
        <div className="flex justify-between items-center gap-4">
          <div className="relative flex items-center">
            <input
              type="text"
              name="search"
              id="search"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-12 text-sm border-gray-300 rounded-md"
            />
            <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
              <kbd className="inline-flex items-center border border-gray-200 rounded px-2 text-sm font-sans font-medium text-gray-400">
                ⌘K
              </kbd>
            </div>
          </div>
          <div>
            <button
              onClick={() => setOpen(true)}
              type="button"
              className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Add
            </button>
          </div>
        </div>
        <div className="flex flex-1 overflow-x-auto space-x-4">
          <div className="w-80 flex-shrink-0 h-full p-2 flex flex-col gap-2">
            <div className="text-sm font-semibold">To Do</div>
            <div className="h-full flex flex-col gap-2 rounded">
              {todos.map((todo) => (
                <div
                  key={todo.id}
                  className="shadow-sm p-4 rounded-md bg-white flex flex-col gap-2"
                >
                  <div className="flex justify-between items-start space-x-2">
                    <h4 className="prose prose-sm font-bold prose-slate">
                      {todo.title}
                    </h4>
                    <Menu
                      as="div"
                      className="relative inline-block text-left mt-1"
                    >
                      <div>
                        <Menu.Button className="rounded-full flex items-center text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                          <span className="sr-only">Open options</span>
                          <DotsVerticalIcon
                            className="h-4 w-4"
                            aria-hidden="true"
                          />
                        </Menu.Button>
                      </div>

                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="origin-top-right z-10 absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <div className="py-1">
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  onClick={() => submitEdits(todo.id)}
                                  className={classNames(
                                    active
                                      ? "bg-gray-100 text-gray-900"
                                      : "text-gray-700",
                                    "block px-4 py-2 text-sm w-full text-left"
                                  )}
                                >
                                  Edit
                                </button>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  onClick={() => deleteTodo(todo.id)}
                                  className={classNames(
                                    active
                                      ? "bg-gray-100 text-gray-900"
                                      : "text-gray-700",
                                    "block px-4 py-2 text-sm w-full text-left"
                                  )}
                                >
                                  Delete
                                </button>
                              )}
                            </Menu.Item>
                          </div>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                  <p className="prose prose-sm prose-slate">
                    {todo.description}
                  </p>
                  <div className="flex items-center gap-2 ml-auto">
                    <ClockIcon className="h-4 w-4 text-slate-500" />
                    <div className="text-xs prose prose-slate">
                      {todo.dueDate}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <AddTodoModal
        todos={todos}
        setTodos={setTodos}
        open={open}
        setOpen={setOpen}
      />
      <EditModalTodo
        todos={todos}
        setTodos={setTodos}
        openEdit={openEdit}
        setOpenEdit={setOpenEdit}
        todoEditing={todoEditing}
        todo={todo}
        setTodo={setTodo}
        setTodoEditing={setTodoEditing}
      />
    </>
  );
}
