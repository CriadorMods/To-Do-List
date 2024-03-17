
document.addEventListener('DOMContentLoaded', function() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    const taskList = document.getElementById('taskList');
    const taskInput = document.getElementById('taskInput');
    const dueDateInput = document.getElementById('dueDateInput');
    const searchInput = document.getElementById('searchInput');
    const filterSelect = document.getElementById('filterSelect');
    const addTaskBtn = document.getElementById('addTaskBtn');

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach(function(task, index) {
            const taskItem = document.createElement('div');
            taskItem.classList.add('task-item');
            taskItem.innerHTML = `
                <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask(${index})">
                <span>${task.text}</span>
                <span>Due: ${task.dueDate}</span>
                <button class="delete-btn">Delete</button>
            `;
            taskList.appendChild(taskItem);
            
            const deleteBtn = taskItem.querySelector('.delete-btn');
            deleteBtn.addEventListener('click', function() {
                deleteTask(index);
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    renderTasks();

    function addTask() {
        const text = taskInput.value.trim();
        const dueDate = dueDateInput.value;
        if (text !== '') {
            const newTask = {
                text: text,
                completed: false,
                dueDate: dueDate
            };
            tasks.push(newTask);
            taskInput.value = '';
            dueDateInput.value = '';
            renderTasks();
        } else {
            alert('Please fill in all fields.');
        }
    }
    

    function deleteTask(index) {
        tasks.splice(index, 1);
        renderTasks();
    }

    function toggleTask(index) {
        tasks[index].completed = !tasks[index].completed;
        renderTasks();
    }

    function searchTasks() {
        const searchText = searchInput.value.toLowerCase();
        const filteredTasks = tasks.filter(task => task.text.toLowerCase().includes(searchText));
        renderFilteredTasks(filteredTasks);
    }

    function filterTasksByCategory() {
       
    }

    function filterTasksByPriority() {
        
    }

    function filterTasksByDueDate() {
        
    }

    function renderFilteredTasks(filteredTasks) {
        taskList.innerHTML = '';
        filteredTasks.forEach(function(task, index) {
            const taskItem = document.createElement('div');
            taskItem.classList.add('task-item');
            taskItem.innerHTML = `
                <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask(${index})">
                <span>${task.text}</span>
                <span>Due: ${task.dueDate}</span>
                <button class="delete-btn">Delete</button>
            `;
            taskList.appendChild(taskItem);
            
            const deleteBtn = taskItem.querySelector('.delete-btn');
            deleteBtn.addEventListener('click', function() {
                deleteTask(index);
            });
        });
    }

    searchInput.addEventListener('input', searchTasks);
    filterSelect.addEventListener('change', function() {
        const filterOption = this.value;
        switch (filterOption) {
            case 'category':
                filterTasksByCategory();
                break;
            case 'priority':
                filterTasksByPriority();
                break;
            case 'dueDate':
                filterTasksByDueDate();
                break;
            default:
                renderTasks();
        }
    });

    addTaskBtn.addEventListener('click', addTask);
});


const storedColor = localStorage.getItem('backgroundColor');

if (storedColor) {
if (storedColor.startsWith('linear-gradient')) {
    document.body.style.background = storedColor;
} else {
    document.body.style.backgroundColor = storedColor;
}
}
