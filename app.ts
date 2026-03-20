interface Task {
    id: number;
    text: string;
}   

const taskInput = document.getElementById('taskInput') as HTMLInputElement;
const addButton = document.getElementById('addButton') as HTMLButtonElement;
const taskList = document.getElementById('taskList') as HTMLUListElement;

let Tasks: Task[] = [];

const API_URL = 'http://localhost:3000/tasks';

// Promise gibt den Wert erst später zurück
async function loadTasks(): Promise<void> {
    const response = await fetch(API_URL);
    Tasks = await response.json();
    renderTasks();
}

async function addTask(): Promise<void> {
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: taskText })
        });
        
        const newTask = await response.json();
        Tasks.push(newTask);
        
        taskInput.value = '';
        renderTasks();
    }
}

async function deleteTask(id: number): Promise<void> {
    await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    });
    
    Tasks = Tasks.filter(task => task.id !== id);
    renderTasks();
}

function renderTasks(): void {
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
taskInput.addEventListener('keypress', (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
        addTask();
    }
});

loadTasks();