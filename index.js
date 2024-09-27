const input = document.querySelector('#input');
const addBtn = document.querySelector('#plus-btn');
const taskList = document.querySelector('#task-list');
const tasksAmount = document.querySelector('#tasks-amount');
const doneTasksAmount = document.querySelector('#done-tasks-amount');
const check = document.querySelector('#check');
// const deleteBtn = document.querySelector('#deleteBtn');

const taskListArr = [
  { id: 1, task: 'To study React fundamentals' },
  { id: 2, task: 'To study React fundamentals' },
  { id: 3, task: 'To study React fundamentals' },
  { id: 4, task: 'To study React fundamentals' },
];
const doneTask = [{ id: 4, task: 'To study React fundamentals' }];

const existTasks = localStorage.getItem('tasks');

if (!existTasks) {
  localStorage.setItem('tasks', JSON.stringify(taskListArr));
}
const parsedTasks = JSON.parse(existTasks);

const updateMarkup = (tasks) => {
  const markup = tasks
    .map(
      (taskItem) => `<li class="task-item" key='${taskItem.id}'>
          <p>${taskItem.task}</p>
          <div class="icon-container">
            <button class="task-btn" id="check">
              <svg class="icon-check"><use href="./sprite.svg#icon-check"></use></svg>
            </button>

            <button class="task-btn" id="deleteBtn" key='${taskItem.id}'>
              <svg class="icon-trash"><use href="./sprite.svg#icon-trash"></use></svg>
            </button>
          </div>
        </li>`
    )
    .join('');

  taskList.innerHTML = markup;
  tasksAmount.textContent = tasks.length;
};

updateMarkup(parsedTasks);

doneTasksAmount.textContent = doneTask.length;

addBtn.addEventListener('click', () => {
  const newTask = { id: Date.now(), task: input.value };

  parsedTasks.push(newTask);
  localStorage.setItem('tasks', JSON.stringify(parsedTasks));
  updateMarkup(parsedTasks);

  input.value = '';
});

const onDelete = (e) => {
  const deleteBtn = e.target.closest('#deleteBtn');

  if (deleteBtn) {
    const task = e.target.closest('.task-item').key;
    console.log(task);
  }
};

taskList.addEventListener('click', onDelete);
