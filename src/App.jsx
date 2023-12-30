import { React, useEffect, useState } from "react";

function App() {
  const [title, settitle] = useState("");
  const [mainTask, setmainTask] = useState(getLocalItems());

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(mainTask));
  }, [mainTask]);

  function handleSubmit(e) {
    e.preventDefault();

    if (title.trim() === "") {
      alert("cannot assign empty item to list");
      return;
    }
    setmainTask([...mainTask, title]);
    settitle("");
  }
  function handleDelete(key) {
    const copyTask = [...mainTask];
    copyTask.splice(key, 1);
    setmainTask(copyTask);
  }
  function getLocalItems() {
    const list = localStorage.getItem("list");
    if (list) {
      return JSON.parse(localStorage.getItem("list"));
    } else {
      return [];
    }
  }

  let renderTask = <h2 className="text-center text-2xl">No Task Available</h2>;

  if (mainTask.length > 0) {
    renderTask = mainTask.map((elem, index) => {
      return (
        <li
          key={index}
          className="flex justify-between items-center mx-auto py-2 px-2 md:px-5 li-item"
        >
          <h5 className="w-5/6 px-2">{elem}</h5>
          <button
            onClick={() => {
              handleDelete(index);
            }}
            className="bg-red-500 rounded px-2 py-1 text-base text-zinc-900"
          >
            Delete
          </button>
        </li>
      );
    });
  }

  return (
    <div>
      <div className="bg-zinc-900 py-5 text-4xl font-bold text-white text-center">
        <h1>MOHSIN's Todo List</h1>
      </div>
      <div className="w-full md:w-4/6 bg-orange-600 mx-auto md:rounded-lg py-5 md:my-24 h-screen md:h-auto">
        <div>
          <form
            onSubmit={handleSubmit}
            className="flex justify-between items-center md:justify-start"
          >
            <div className="flex justify-between items-center flex-wrap md:flex-nowrap mx-auto">
              <input
                type="text"
                placeholder="Write your task"
                value={title}
                className="m-5 border-zinc-700 outline-2 outline px-5 py-1.5 rounded focus-within:outline-blue-700 focus-within:outline-3.5 w-full md:w-96"
                onChange={(e) => {
                  settitle(e.target.value);
                }}
              />
              <button
                type="submit"
                className="py-2 px-3 mx-5 mb-5 md:mb-0  w-full md:w-fit bg-zinc-900 rounded text-white"
              >
                Add Task
              </button>
            </div>
          </form>
        </div>
        <div className="bg-slate-100 py-10 font-semibold w-11/12  md:w-5/6 mx-auto rounded-md h-4/6 overflow-y-scroll">
          <ul className="text-lg ">{renderTask}</ul>
        </div>
      </div>
    </div>
  );
}

export default App;
