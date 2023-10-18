"use strict";

const inputTask = document.querySelector("#input-task");
const buttonAdd = document.querySelector("#btn-add");
const todoListContainer = document.querySelector("#todo-list");

// GET DATA FROM LOCAL STORAGE
const todoList = TodoList.data || [];

class Todo {
    constructor(todoList) {
        this.todoList = todoList;
    }
    addData(task, owner, isDone) {
        this.todoList.push({
            task: task,
            owner: owner,
            isDone: isDone,
        });
        TodoList.data = this.todoList;
        renderTask(this.todoList);
    }

    deleteTask(event, index) {
        event.stopPropagation();
        this.todoList.splice(index, 1);
        TodoList.data = this.todoList;
        renderTask(this.todoList);
    }

    // CHECK DONE TASK FUNCTION
    toggleDoneTask(index) {
        this.todoList[index].isDone =
            this.todoList[index].isDone == true ? false : true;
        TodoList.data = this.todoList;
        renderTask(todoList);
    }
}

// TẠO DỐI TƯỢNG
const todoListClass = new Todo(todoList);
renderTask();

// BUTTON ADD TASK ON CLICK
buttonAdd.addEventListener("click", function () {
    if (CurrentUser.data.length == 0) {
        alert("You must login first");
        return;
    }

    // check input is blank
    if (inputTask.value == "") {
        alert("Todo title can't blank");
    } else {
        // adding task
        todoListClass.addData(
            inputTask.value,
            CurrentUser.data.username,
            false
        );
        inputTask.value = "";
        alert("Adding task successful");
    }
});

// RENDER TASK FUNCTION
function renderTask() {
    let html = "";
    todoListClass.todoList.map((task, i) => {
        if (task.owner == CurrentUser.data.username) {
            html += `
            <li class="${
                task.isDone == true ? "checked" : ""
            }" onclick="todoListClass.toggleDoneTask(${i})">${
                task.task
            }<span class="close" onclick = "todoListClass.deleteTask(event, ${i})">×</span></li>
            `;
        }
    });
    todoListContainer.innerHTML = html;
}
