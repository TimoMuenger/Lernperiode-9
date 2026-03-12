var taskInput = document.getElementById('taskInput');
var addButton = document.getElementById('addButton');
var taskList = document.getElementById('taskList');
var Tasks = [];
function addTask() {
    var taskText = taskInput.value.trim();
    if (taskText !== '') {
        var newTask = {
            id: Date.now(),
            text: taskText
        };
        Tasks.push(newTask);
        taskInput.value = '';
        renderTasks();
    }
}
function deleteTask(id) {
    Tasks = Tasks.filter(function (Task) { return Task.id !== id; });
    renderTasks();
}
function renderTasks() {
    taskList.innerHTML = '';
    Tasks.forEach(function (Task) {
        var li = document.createElement('li');
        li.textContent = Task.text;
        var deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Löschen';
        deleteBtn.className = 'delete-btn';
        deleteBtn.onclick = function () { return deleteTask(Task.id); };
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}
addButton.addEventListener('click', addTask);
