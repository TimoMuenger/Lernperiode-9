var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const taskInput = document.getElementById('taskInput');
const addButton = document.getElementById('addButton');
const taskList = document.getElementById('taskList');
let Tasks = [];
const API_URL = 'http://localhost:3000/tasks';
// Promise gibt den Wert erst später zurück
function loadTasks() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(API_URL);
        Tasks = yield response.json();
        renderTasks();
    });
}
function addTask() {
    return __awaiter(this, void 0, void 0, function* () {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            const response = yield fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: taskText })
            });
            const newTask = yield response.json();
            Tasks.push(newTask);
            taskInput.value = '';
            renderTasks();
        }
    });
}
function deleteTask(id) {
    return __awaiter(this, void 0, void 0, function* () {
        yield fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        Tasks = Tasks.filter(task => task.id !== id);
        renderTasks();
    });
}
function renderTasks() {
    taskList.innerHTML = '';
    Tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task.text;
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Löschen';
        deleteBtn.className = 'delete-btn';
        deleteBtn.onclick = () => deleteTask(task.id);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}
addButton.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        addTask();
    }
});
loadTasks();
