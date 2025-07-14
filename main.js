// Получаем элементы
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// Загружаем задачи из localStorage
document.addEventListener("DOMContentLoaded", loadTasks);

// Добавляем задачу
addTaskBtn.addEventListener("click", addTask);

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") {
    alert("Введите задачу!");
    return;
  }

  const task = {
    id: Date.now(),
    text: taskText,
    completed: false
  };

  createTaskElement(task);
  saveTask(task);
  taskInput.value = "";
}

function createTaskElement(task) {
  const li = document.createElement("li");
  li.className = "task-item";
  li.dataset.id = task.id;

  const span = document.createElement("span");
  span.textContent = task.text;
  if (task.completed) {
    span.classList.add("completed");
  }

  span.addEventListener("click", () => toggleTask(task.id, span));

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Удалить";
  deleteBtn.className = "delete-btn";
  deleteBtn.addEventListener("click", () => deleteTask(task.id, li));

  li.appendChild(span);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

function toggleTask(id, span) {
  const tasks = getTasks();
  const updated = tasks.map(t => {
    if (t.id === id) {
      t.completed = !t.completed;
      span.classList.toggle("completed");
    }
    return t;
  });
  localStorage.setItem("tasks", JSON.stringify(updated));
}

function deleteTask(id, li) {
  const tasks = getTasks().filter(t => t.id !== id);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  li.remove();
}

function saveTask(task){
const tasks = getTasks();
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTasks() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

function loadTasks() {
  const tasks = getTasks();
  tasks.forEach(createTaskElement);
}
