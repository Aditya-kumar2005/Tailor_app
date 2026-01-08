import React, { useState, useEffect } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [taskDetails, setTaskDetails] = useState("");

  // Load tasks from localStorage
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
  }, []);

  // Save tasks to localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e) => {
    e.preventDefault();
    if (!taskName) return;

    const newTask = {
      id: Date.now(),
      name: taskName,
      details: taskDetails,
    };

    setTasks([newTask, ...tasks]);
    setTaskName("");
    setTaskDetails("");
  };

  // Download as JSON
  const downloadJSON = () => {
    const data = JSON.stringify(tasks, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "tasks.json";
    a.click();
  };

  // Download as TXT
  const downloadTXT = () => {
    const text = tasks
      .map(
        (task, i) =>
          `${i + 1}. ${task.name}\n${task.details}\n------------------`
      )
      .join("\n");

    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "tasks.txt";
    a.click();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex justify-center">
      <div className="w-full max-w-3xl bg-white p-6 rounded-xl shadow">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Task Manager (No Database)
        </h1>

        <form onSubmit={addTask} className="space-y-4">
          <input
            type="text"
            placeholder="Task Name"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            className="w-full p-2 border rounded"
          />

          <textarea
            placeholder="Task Details"
            value={taskDetails}
            onChange={(e) => setTaskDetails(e.target.value)}
            className="w-full p-2 border rounded"
          />

          <button className="w-full bg-blue-600 text-white py-2 rounded">
            Add Task
          </button>
        </form>

        <div className="flex gap-4 mt-4">
          <button
            onClick={downloadJSON}
            className="flex-1 bg-green-600 text-white py-2 rounded"
          >
            Download JSON
          </button>
          <button
            onClick={downloadTXT}
            className="flex-1 bg-purple-600 text-white py-2 rounded"
          >
            Download TXT
          </button>
        </div>

        <ul className="mt-6 space-y-3">
          {tasks.map((task) => (
            <li key={task.id} className="p-4 bg-gray-50 rounded shadow">
              <h3 className="font-semibold">{task.name}</h3>
              <p className="text-sm text-gray-600">{task.details}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
