class Todo {
  constructor() {
    this.clearInputs(true);

    const saveButton = document.getElementById("saveButton");
    saveButton.addEventListener("click", () => {
      this.saveButtonHandler();
    });

    const searchBox = document.getElementById("search-box");
    let searchTimeout;
    searchBox.addEventListener("input", () => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        const searchValue = searchBox.value;
        this.searchTasks(searchValue);
      }, 300);
    });

    this.tasks = JSON.parse(localStorage.getItem("tasks")) || Array();
    this.filteredTasks = this.tasks;
    this.draw();
  }

  clearInputs(clearSearchBox = false) {
    document.getElementById("newTask-name").value = "";
    document.getElementById("newTask-date").value = "";

    if (clearSearchBox) {
      document.querySelector(".search-box input[type='text']").value = "";
    }
  }

  searchTasks(searchValue) {
    this.filteredTasks = this.tasks.filter((task) => {
      return task.name.toLowerCase().includes(searchValue.toLowerCase());
    });
    this.draw(this.filteredTasks);
  }

  saveToLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }

  addTask(task) {
    if (!task.date) {
      const currDate = new Date();
      const options = { year: "numeric", month: "2-digit", day: "2-digit" };
      task.date = currDate.toLocaleDateString("en-CA", options);
    }

    task.id = Date.now().toString();
    task.completed = false;
    this.tasks.push(task);
    this.saveToLocalStorage();
    this.clearInputs();
    this.draw();
  }

  removeTask(taskIndex) {
    const id = this.tasks.findIndex((task) => task.id === taskIndex);
    if (id !== -1) {
      this.tasks.splice(id, 1);
      this.saveToLocalStorage();
      this.draw();
    }

    this.clearInputs(true);
  }

  editTask(taskIndex, taskName, taskDate) {
    this.tasks[taskIndex].name = taskName;
    this.tasks[taskIndex].date = taskDate;
    this.tasks[taskIndex].completed = this.tasks[taskIndex].completed;
    this.saveToLocalStorage();
    this.draw();
  }

  toggleCompleted(taskIndex) {
    const task = this.tasks.find((task) => task.id === taskIndex);

    if (task) {
      task.completed = !task.completed;
      this.saveToLocalStorage();
      this.draw(this.filteredTasks);
    }
  }

  draw(tasks = this.tasks) {
    const todoDiv = document.getElementById("todo");
    todoDiv.innerHTML = "";

    const ul = document.createElement("ul");

    for (const task of tasks) {
      const li = document.createElement("li");
      const index = task.id;

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.name = "todo-item";
      checkbox.id = "todo-item-" + index;
      checkbox.checked = task.completed;
      checkbox.addEventListener("change", () => {
        this.toggleCompleted(index);
      });

      const taskName = document.createElement("span");
      taskName.contentEditable = "true";
      taskName.id = "nametaskName" + index;
      taskName.textContent = task.name;
      if (task.completed) {
        taskName.className = "completed";
      }

      const searchValue = document.querySelector(
        ".search-box input[type='text']"
      ).value;
      if (searchValue) {
        const regex = new RegExp(searchValue, "ig");
        taskName.innerHTML = taskName.textContent.replace(
          regex,
          (match) => `<mark>${match}</mark>`
        );
      } else {
        taskName.innerText = taskName.textContent;
      }

      const dateSpan = document.createElement("span");
      dateSpan.className = "date";
      const dateInput = document.createElement("input");
      dateInput.type = "date";
      dateInput.id = "dateInput" + index;
      dateInput.value = task.date;
      dateSpan.appendChild(dateInput);

      const deleteButton = document.createElement("span");
      deleteButton.className = "material-symbols-outlined delete_btn";
      deleteButton.textContent = " delete ";
      deleteButton.addEventListener("click", () => {
        this.removeTask(index);
      });

      li.appendChild(checkbox);
      li.appendChild(taskName);
      li.appendChild(dateSpan);
      li.appendChild(deleteButton);

      ul.appendChild(li);

      taskName.addEventListener("focusout", (li) => {
        let newDate = document.getElementById("dateInput" + index).value;
        let newTaskName = document.getElementById(
          "nametaskName" + index
        ).innerText;

        this.editTask(index, newTaskName, newDate);
      });

      dateInput.addEventListener("focusout", (li) => {
        let newDate = document.getElementById("dateInput" + index).value;
        let newTaskName = document.getElementById(
          "nametaskName" + index
        ).innerText;

        this.editTask(index, newTaskName, newDate);
      });

      todoDiv.appendChild(ul);
    }
  }

  saveButtonHandler() {
    const taskName = document.getElementById("newTask-name").value;

    if (taskName.trim() === "") {
      this.clearInputs();
      return alert("Please enter a task name");
    }

    let taskDate = document.getElementById("newTask-date").value;

    let task = { name: taskName, date: taskDate };
    this.addTask(task);
  }
}

const todo = new Todo();
