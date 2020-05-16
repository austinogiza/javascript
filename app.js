const form = document.querySelector('form');

form.addEventListener('submit', formSubmit);

function formSubmit(e) {

    const task = document.getElementById('task').value;

    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = []
    } else {
        tasks = JSON.stringify(localStorage.getItem('tasks'));
    }

    tasks.push(task)
    localStorage.setItem('tasks', JSON.stringify(tasks));
    alert('task saved');
    e.preventDefault();
}