function editDate(input) {
  let date = new Date(input.value);
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  month = month < 10 ? "0" + month : month;
  day = day < 10 ? "0" + day : day;

  input.type = "date";
  input.value = year + "-" + month + "-" + day;
}

class Todo {
  constructor() {
    this.tasks = Array();
  }

  addTask(task) {
    task.completed = false;
    this.tasks.push(task);
    this.draw();
  }

  removeTask(taskIndex) {
    this.tasks.splice(taskIndex, 1);
    this.draw();
  }

  editTask(taskIndex, taskName, taskDate) {
    this.tasks[taskIndex].name = taskName;
    this.tasks[taskIndex].date = taskDate;
    this.tasks[taskIndex].completed = this.tasks[taskIndex].completed;
    this.draw();
  }

  toggleCompleted(taskIndex) {
    this.tasks[taskIndex].completed = !this.tasks[taskIndex].completed;
    this.draw();
  }

  draw() {
    const todoDiv = document.getElementById("todo");
    todoDiv.innerHTML = "";

    const ul = document.createElement("ul");

    this.tasks.forEach((task, index) => {
      const li = document.createElement("li");

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.name = "todo-item";
      checkbox.id = "todo-item-" + index;
      checkbox.checked = task.completed;
      checkbox.addEventListener("change", () => {
        this.toggleCompleted(index);
      });

      const label = document.createElement("label");
      label.htmlFor = "todo-item-" + index;
      label.textContent = task.name;
      if (task.completed) {
        label.className = "completed";
      }

      const dateSpan = document.createElement("span");
      dateSpan.className = "date";
      const dateInput = document.createElement("input");
      dateInput.type = "text";
      dateInput.value = task.date;
      // dateInput.setAttribute("onclick", `editDate(this)`);
      dateSpan.appendChild(dateInput);

      const deleteButton = document.createElement("span");
      deleteButton.className = "material-symbols-outlined delete_btn";
      deleteButton.textContent = " delete ";
      deleteButton.addEventListener("click", () => {
        this.removeTask(index);
      });

      li.appendChild(checkbox);
      li.appendChild(label);
      li.appendChild(dateSpan);
      li.appendChild(deleteButton);

      ul.appendChild(li);

      todoDiv.appendChild(ul);
    });
  }

  saveButtonHandler() {
    const taskName = document.getElementById("newTask-name").value;
    const taskDate = document.getElementById("newTask-date").value;

    let task = { name: taskName, date: taskDate };
    this.addTask(task);
  }
}

const todo = new Todo();
todo.addTask({ name: "Task 1", date: "2021-01-01" });
todo.addTask({ name: "Task 2", date: "2021-01-02" });

const saveButton = document.getElementById("saveButton");
saveButton.addEventListener("click", () => {
  todo.saveButtonHandler();
});
