interface Task {
    id: number;
    text: string;
}

const taskInput = document.getElementById('taskInput') as HTMLInputElement;
const addButton = document.getElementById('addButton') as HTMLButtonElement;
const taskList = document.getElementById('taskList') as HTMLUListElement;

let Tasks: Task[] = [];


function addTask(): void {
    const taskText = taskInput.value.trim();

   
    if (taskText !== '') {
        const newTask: Task = {
            id: Date.now(), 
            text: taskText
        };

        Tasks.push(newTask);
        taskInput.value = ''; 
        renderTasks();       
    }
}

function deleteTask(id: number): void {
    Tasks = Tasks.filter(Task => Task.id !== id);
    renderTasks();
}

function renderTasks(): void {
    taskList.innerHTML = ''; 

    Tasks.forEach(Task => {
        const li = document.createElement('li');
        li.textContent = Task.text;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Löschen';
        deleteBtn.className = 'delete-btn';
        deleteBtn.onclick = () => deleteTask(Task.id);

        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}

addButton.addEventListener('click', addTask);
