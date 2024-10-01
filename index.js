const input = document.querySelector('#input');
const inputContainer = document.querySelector('#input-container');
const error = document.querySelector('#error-message');
const addBtn = document.querySelector('#plus-btn');
const taskList = document.querySelector('#task-list');
const tasksAmount = document.querySelector('#tasks-amount');
const taskListDone = document.querySelector('#task-list-done');
const doneTasksAmount = document.querySelector('#done-tasks-amount');

const taskListArr = [
  { id: 1, task: 'To study React fundamentals' },
  { id: 2, task: 'To study React fundamentals' },
  { id: 3, task: 'To study React fundamentals' },
  { id: 4, task: 'To study React fundamentals' },
];
const doneTaskArr = [{ id: 5, task: 'To study React fundamentals' }];

const existTasks = localStorage.getItem('tasks');
if (!existTasks) {
  localStorage.setItem('tasks', JSON.stringify(taskListArr));
}
const parsedTasks = JSON.parse(existTasks);

const updateMarkup = (tasks) => {
  const markup = tasks
    .map(
      (taskItem) => `<li class="task-item" key='${taskItem.id}'>
          <p>${taskItem.task.length > 33 ? taskItem.task.slice(0, 33) + '...' : taskItem.task}</p>
          <div class="icon-container">
            <button class="task-btn" id="check" key='${taskItem.id}'>
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

addBtn.addEventListener('click', (e) => {
  e.preventDefault();

  if (!input.value.length) {
    error.textContent = 'Enter a value';
  } else {
    const newTask = { id: Date.now(), task: input.value };

    parsedTasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(parsedTasks));
    updateMarkup(parsedTasks);

    input.value = '';
  }
});

input.addEventListener('input', (e) => {
  if (e.target.value) {
    error.textContent = '';
  }
});

const onDelete = (e) => {
  const deleteBtn = e.target.closest('#deleteBtn');

  if (deleteBtn) {
    const taskId = Number(deleteBtn.getAttribute('key'));

    parsedTasks.map((task) => {
      if (taskId === task.id) {
        const idxToDelete = parsedTasks.indexOf(task);

        parsedTasks.splice(idxToDelete, 1);
        localStorage.setItem('tasks', JSON.stringify(parsedTasks));
        updateMarkup(parsedTasks);
      }
    });
  }
};
taskList.addEventListener('click', onDelete);

//
//

//

//

const doneTasks = localStorage.getItem('doneTasks');

if (!doneTasks) {
  localStorage.setItem('doneTasks', JSON.stringify(doneTaskArr));
}
const parsedDoneTasks = JSON.parse(doneTasks);

const updateMarkupDoneTask = (doneTasks) => {
  const markup = doneTasks
    .map(
      (taskItem) => `<li class="task-item-done" id="task-item-done" key='${taskItem.id}'>
          ${taskItem.task}
        </li>`
    )
    .join('');

  taskListDone.innerHTML = markup;
  doneTasksAmount.textContent = doneTasks.length;
};

updateMarkupDoneTask(parsedDoneTasks);

const doneTask = (e) => {
  const checkBtn = e.target.closest('#check');

  if (checkBtn) {
    const taskId = Number(checkBtn.getAttribute('key'));

    parsedTasks.map((task) => {
      if (taskId === task.id) {
        parsedDoneTasks.push(task);
        localStorage.setItem('doneTasks', JSON.stringify(parsedDoneTasks));
        updateMarkupDoneTask(parsedDoneTasks);

        const idxToDelete = parsedTasks.indexOf(task);

        parsedTasks.splice(idxToDelete, 1);
        localStorage.setItem('tasks', JSON.stringify(parsedTasks));
        updateMarkup(parsedTasks);
      }
    });
  }
};

taskList.addEventListener('click', doneTask);

const reversal = (e) => {
  const doneTask = e.target.closest('#task-item-done');

  if (doneTask) {
    const taskId = Number(doneTask.getAttribute('key'));

    parsedDoneTasks.map((task) => {
      if (taskId === task.id) {
        parsedTasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(parsedTasks));
        updateMarkup(parsedTasks);

        const idxToDelete = parsedDoneTasks.indexOf(task);

        parsedDoneTasks.splice(idxToDelete, 1);
        localStorage.setItem('doneTasks', JSON.stringify(parsedDoneTasks));
        updateMarkupDoneTask(parsedDoneTasks);
      }
    });
  }
};

taskListDone.addEventListener('click', reversal);
