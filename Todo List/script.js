
let tasks = [];
let currentFilter = "all";

const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const taskCounter = document.getElementById("taskCounter");
const errorMessage = document.getElementById("errorMessage");
const clearCompleted = document.getElementById("clearCompleted");

function displayTasks() {
    taskList.innerHTML = "";

    let filteredTasks = tasks.filter(function(task) {
        if (currentFilter === "active") {
            return !task.completed;
        }

        if (currentFilter === "completed") {
            return task.completed;
        }

        return true;
    });

    filteredTasks.forEach(function(task) {
        let li = document.createElement("li");
        li.className = "list-group-item task-item";

        if (task.completed) {
            li.classList.add("completed");
        }

        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.className = "form-check-input";

        checkbox.addEventListener("change", function() {
            task.completed = checkbox.checked;
            displayTasks();
        });

        let span = document.createElement("span");
        span.className = "task-text";
        span.textContent = task.text;

        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "btn btn-sm btn-danger";

        deleteBtn.addEventListener("click", function() {
            tasks = tasks.filter(function(item) {
                return item.id !== task.id;
            });

            displayTasks();
        });

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);

        taskList.appendChild(li);
    });

    let remaining = tasks.filter(function(task) {
        return !task.completed;
    }).length;

    taskCounter.textContent = remaining + " tasks remaining";
}

function addTask() {
    let taskText = taskInput.value.trim();

    if (taskText === "") {
        errorMessage.textContent = "Please enter a task!";
        return;
    }

    tasks.push({
        id: Date.now() + Math.random(),
        text: taskText,
        completed: false
    });

    taskInput.value = "";
    errorMessage.textContent = "";

    displayTasks();
}

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

// Filter buttons
let filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        currentFilter = button.dataset.filter;

        filterButtons.forEach(function(btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        displayTasks();
    });
});

// Clear completed tasks
clearCompleted.addEventListener("click", function() {
    tasks = tasks.filter(function(task) {
        return !task.completed;
    });

    displayTasks();
});

displayTasks();