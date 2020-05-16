const form = document.querySelector('#task-form');

const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');


//load all event listeners
loadEventListeners();

function loadEventListeners() {
    //add task
    form.addEventListener('submit', addTask);
    //remove task
    taskList.addEventListener('click', removeTask);
    //clear task
    clearBtn.addEventListener('click', clearTasks);
    //filter
    filter.addEventListener('keyup', filterTasks);


}

function addTask(e) {

    if (taskInput.value === '') {
        alert('Add A Task');
    }


    //domload

    document.addEventListener('DOMContentLoaded', getTasks);

    //create an element
    const li = document.createElement('li');
    //add a class

    li.className = 'collection-item';

    //create textNode

    li.appendChild(document.createTextNode(taskInput.value));

    //create link

    const link = document.createElement('a');
    //add css

    link.className = 'delete-item secondary-content';

    //add icon

    link.innerHTML = "<i class='fa fa-remove'></i>";
    li.appendChild(link);

    taskList.appendChild(li);
    //clear task
    taskInput.value = '';

    //store in local storage

    storeTaskInLocalStorage(taskInput.value);
    e.preventDefault();



}

//geyt task from LS

function getTasks() {
    let tasks;

    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function (task) {

        const li = document.createElement('li');
        //add a class

        li.className = 'collection-item';

        //create textNode

        li.appendChild(document.createTextNode(tasks));

        //create link

        const link = document.createElement('a');
        //add css

        link.className = 'delete-item secondary-content';

        //add icon

        link.innerHTML = "<i class='fa fa-remove'></i>";
        li.appendChild(link);

        taskList.appendChild(li);


    });
}

function storeTaskInLocalStorage(task) {

    let tasks;

    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
//remove tasks
function removeTask(e) {

    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are you sure?')) {
            e.target.parentElement.parentElement.remove();
        }
        //remove tasks from localstorage
        removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }

}

//removefrom localstorage

function removeTaskFromLocalStorage(taskItem) {
    console.log(taskItem);
}
///clear task
function clearTasks() {
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);

    }

    clearFromLocalStorage();

}
//clear from Local storage

function clearFromLocalStorage() {
    localStorage.clear();

}

//filter task

function filterTasks(e) {

    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(

        function (task) {
            const item = task.firstChild.textContent;

            if (item.toLowerCase().indexOf(text) != -1) {
                task.style.display = 'block';

            } else {
                task.style.display = 'none';
            }

        }
    );

    console.log(text);

}