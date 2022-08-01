import { Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

export default function EditModalTodo(props) {
  console.log(props.todo);
  const {
    register,
    handleSubmit,
    // watch,
    reset,
    // formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const updatedTodos = props.todos.map((todo) => {
      if (props.todo.id === todo.id) {
        todo = { ...data, id: props.todo.id };
      }
      return todo;
    });
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    props.setTodos(updatedTodos);
    props.setOpenEdit(false);
  };

  useEffect(() => {
    console.log("dsfsfsdsdsf");
    reset(props.todo);
  }, [props.todo]);

  // console.log("Todo", props.todos);

  return (
    <Transition.Root show={props.openEdit} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={props.setOpenEdit}>
        <div className="fixed inset-0" />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl"
                  >
                    <div className="h-0 flex-1 overflow-y-auto">
                      <div className="bg-indigo-700 py-6 px-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <Dialog.Title className="text-lg font-medium text-white">
                            {" "}
                            Add Task{" "}
                          </Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="rounded-md bg-indigo-700 text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                              onClick={() => props.setOpenEdit(false)}
                            >
                              <span className="sr-only">Close panel</span>
                              <XIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                        <div className="mt-1">
                          <p className="text-sm text-indigo-300">
                            Get started by filling in the information below to
                            create a new task
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-1 flex-col justify-between">
                        <div className="divide-y divide-gray-200 px-4 sm:px-6">
                          <div className="space-y-6 pt-6 pb-5">
                            <div>
                              <label
                                htmlFor="title"
                                className="block text-sm font-medium text-gray-900"
                              >
                                {" "}
                                Title{" "}
                              </label>
                              <div className="mt-1">
                                <input
                                  type="text"
                                  name="title"
                                  id="title"
                                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                  {...register("title", {
                                    required: true,
                                  })}
                                />
                              </div>
                            </div>
                            <div>
                              <label
                                htmlFor="description"
                                className="block text-sm font-medium text-gray-900"
                              >
                                {" "}
                                Description{" "}
                              </label>
                              <div className="mt-1">
                                <textarea
                                  id="description"
                                  name="description"
                                  rows={4}
                                  className="resize-none block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                  defaultValue={""}
                                  {...register("description", {
                                    required: true,
                                  })}
                                />
                              </div>
                            </div>
                            <div>
                              <label
                                htmlFor="dueDate"
                                className="block text-sm font-medium text-gray-900"
                              >
                                {" "}
                                Due Date{" "}
                              </label>
                              <div className="mt-1">
                                <input
                                  type="date"
                                  name="dueDate"
                                  id="dueDate"
                                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                  {...register("dueDate", {
                                    required: true,
                                  })}
                                />
                              </div>
                            </div>

                            <div>
                              <label
                                htmlFor="status"
                                className="block text-sm font-medium text-gray-900"
                              >
                                {" "}
                                Status{" "}
                              </label>
                              <div className="mt-1">
                                <select
                                  id="status"
                                  name="status"
                                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                  defaultValue="To Do"
                                  {...register("status", {
                                    required: true,
                                  })}
                                >
                                  <option>To Do</option>
                                  <option>In Progress</option>
                                  <option>Review</option>
                                  <option>Done</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-shrink-0 justify-end px-4 py-4">
                      <button
                        type="button"
                        className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        onClick={() => props.setOpenEdit(false)}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="ml-4 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
