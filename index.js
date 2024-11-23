// script.js

// Select elements
const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskBox = document.querySelector(".task-box");
const filters = document.querySelectorAll(".filters span");
const clearBtn = document.querySelector(".clear-btn");

// Retrieve tasks from localStorage or set an empty array
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Add task
addBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (taskText) {
    tasks.push({ text: taskText, status: "pending" });
    saveTasks();
    renderTasks();
    taskInput.value = "";
  }
});

// Render tasks
function renderTasks(filter = "all") {
  taskBox.innerHTML = ""; // Clear task list
  tasks.forEach((task, index) => {
    if (filter === "all" || task.status === filter) {
      const taskItem = document.createElement("li");
      taskItem.className = task.status === "completed" ? "completed" : "";
      taskItem.innerHTML = `
        <span>${task.text}</span>
        <div>
          <button onclick="toggleTask(${index})">${
        task.status === "completed" ? "Undo" : "Complete"
      }</button>
          <button onclick="editTask(${index})">Edit</button>
          <button onclick="deleteTask(${index})">Delete</button>
        </div>
      `;
      taskBox.appendChild(taskItem);
    }
  });
}

// Toggle task status (pending/completed)
function toggleTask(index) {
  tasks[index].status = tasks[index].status === "completed" ? "pending" : "completed";
  saveTasks();
  renderTasks();
}

// Edit task
function editTask(index) {
  const newTaskText = prompt("Edit task:", tasks[index].text);
  if (newTaskText !== null && newTaskText.trim() !== "") {
    tasks[index].text = newTaskText.trim();
    saveTasks();
    renderTasks();
  }
}

// Delete task
function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

// Save tasks to localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Clear all tasks
clearBtn.addEventListener("click", () => {
  if (confirm("Are you sure you want to clear all tasks?")) {
    tasks = [];
    saveTasks();
    renderTasks();
  }
});

// Filter tasks
filters.forEach((filter) => {
  filter.addEventListener("click", () => {
    document.querySelector(".filters .active").classList.remove("active");
    filter.classList.add("active");
    renderTasks(filter.id);
  });
});

// Initialize
renderTasks();
