import { HashRouter, Link, Route, Routes, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function FrontPage() {
  return (
    <>
      <div id={"frontpage"}>
        <h2>Welcome to this app for keeping track of your tasks</h2>
        <p>
          Here you can add new tasks and see the list of your tasks <br />
          by clicking in the menu at det top of the page
        </p>
      </div>
    </>
  );
}

function ListingTasks(props) {
  const task = props.task;

  return (
    <p>
      <li>
        {task.title} ({task.description})
      </li>
    </p>
  );
}

function ListTasks({ tasks }) {
  return (
    <>
      <h2>Your list of tasks</h2>
      {tasks.map((task) => (
        <ListingTasks key={task.title} task={task} />
      ))}
    </>
  );
}

function AddTask({ onNewTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const newTask = { title, description };

  function handleSubmit(e) {
    e.preventDefault();

    onNewTask(newTask);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add a new task to the list</h2>
      <div>
        Task title: <br />
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </div>
      <br />
      <div>
        Description of the task: <br />
        <input
          type="text"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </div>
      <br />

      <button>Submit task</button>
    </form>
  );
}

function TaskRouting() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);

  async function fetchTasks() {
    const res = await fetch("/api/tasks");
    setTasks(await res.json());
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  async function handleNewTask(task) {
    await fetch("/api/tasks", {
      method: "POST",
      body: JSON.stringify(task),
      headers: { "Content-Type": "application/json" },
    });

    fetchTasks();
    navigate("/listTasks");
  }

  return (
    <Routes>
      <Route path={"/"} element={<FrontPage />} />
      <Route path={"/listTasks"} element={<ListTasks tasks={tasks} />} />
      <Route
        path={"/addTask"}
        element={<AddTask onNewTask={handleNewTask} />}
      />
    </Routes>
  );
}

export function TaskApplication() {
  return (
    <HashRouter>
      <header>
        <h1>Task Application</h1>
      </header>
      <nav>
          <h3>Menu</h3>
          <Link to={"/"}>Front page</Link> <br />
        <Link to={"/listTasks"}>List your tasks</Link> <br />
        <Link to={"/addTask"}>Add a new task</Link>
      </nav>
      <main>
        <TaskRouting />
      </main>
      <footer>Created by Line</footer>
    </HashRouter>
  );
}
