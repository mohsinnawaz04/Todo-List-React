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
        <li key={index} className="flex justify-between w-5/6 mx-auto py-2">
          <h5>{elem}</h5>
          <button
            onClick={() => {
              handleDelete(index);
            }}
            className="bg-red-400 rounded px-2 py-1 text-base "
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
      <form
        onSubmit={handleSubmit}
        className="flex justify-between items-center md:justify-start"
      >
        <input
          type="text"
          placeholder="Write your task"
          value={title}
          className="border-zinc-700 m-5 outline px-5 py-1"
          onChange={(e) => {
            settitle(e.target.value);
          }}
        />
        <button
          type="submit"
          className="py-2 px-2 bg-zinc-900 rounded text-white"
        >
          Add Task
        </button>
      </form>
      <div className="bg-slate-100 py-10 font-semibold">
        <ul className="px-5 text-lg ">{renderTask}</ul>
      </div>
    </div>
  );
}

export default App;
