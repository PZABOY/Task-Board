"use strict";

// ========== GLOBAL VARIABLES ==========
let todoList = [];
const taskTextBox = document.getElementById("taskTextBox");
const timeTextBox = document.getElementById("timeTextBox");


// ========== MAIN FLOW FUNCTIONS ==========
function addTodo() {
    if (!validateForm()) return;
    pushTodo();
    saveTodo();
    displayTodoList();
    clearForm();
}

function loadData() {
    loadTodo();
    displayTodoList();
}


// ========== DATA HANDLING FUNCTIONS ==========
function pushTodo() {
    const task = taskTextBox.value;
    const time = timeTextBox.value;

    const todo = { task, time };
    if (isValid(todo)) {
        todoList.push(todo);
    }
}

function isValid(todo) {
    return isValidDate(todo.time);
}

function isValidDate(dateString) {
    const selectedDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (isNaN(selectedDate.getTime())) {
        alert("Forgat the date Bro...");
        return false;
    }

    if (selectedDate < today) {
        alert("Oi Oi, you don't have the Dolorian in the garage!");
        return false;
    }

    return true;
}

function validateForm() {
    const task = taskTextBox.value.trim();
    const time = timeTextBox.value.trim();

    if (task === "" || time === "") {
        alert("Both fields are required, my friend!");
        return false;
    }

    return true;
}


// ========== DISPLAY & UI FUNCTIONS ==========
function displayTodoList() {
    const containerDiv = document.getElementById("containerDiv");

    let html = "";
    for (let i = 0; i < todoList.length; i++) {
        const card = `
          <div class="card">  
            <span onclick="deleteTodo(${i})"> 🅇 </span>
            <div class="task">${todoList[i].task}</div> 
            <div class="time">${todoList[i].time.replace("T", " ")} </div> 
          </div>
        `;
        html += card;
    }
    containerDiv.innerHTML = html;
}

function clearForm() {
    taskTextBox.value = "";
    timeTextBox.value = "";
    taskTextBox.focus();
}


// ========== DATA STORAGE FUNCTIONS ==========
function saveTodo() {
    const json = JSON.stringify(todoList);
    localStorage.setItem("Todo", json);
}

function loadTodo() {
    const json = localStorage.getItem("Todo");
    if (json) {
        todoList = JSON.parse(json);
    }
}


// ========== DELETE FUNCTION ==========
function deleteTodo(index) {
    const isConfirmed = confirm("Are you sure you want to delete this todo?");
    if (!isConfirmed) return;

    todoList.splice(index, 1);
    saveTodo();
    displayTodoList();
}
