const input = document.querySelector('#input');
const inputContainer = document.querySelector('#input-container');
const error = document.querySelector('#error-message');
const addBtn = document.querySelector('#plus-btn');
const taskList = document.querySelector('#task-list');
const tasksAmount = document.querySelector('#tasks-amount');
const taskListDone = document.querySelector('#task-list-done');
const doneTasksAmount = document.querySelector('#done-tasks-amount');

const taskListArr = JSON.parse(localStorage.getItem('tasks')) || [
  { id: 1, task: 'To study React fundamentals' },
  { id: 2, task: 'To study React fundamentals' },
  { id: 3, task: 'To study React fundamentals' },
  { id: 4, task: 'To study React fundamentals' },
];
const doneTaskArr = JSON.parse(localStorage.getItem('doneTasks')) || [{ id: 5, task: 'To study React fundamentals' }];

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

const onDelete = (e) => {
  const deleteBtn = e.target.closest('#deleteBtn');

  if (deleteBtn) {
    const taskId = Number(deleteBtn.getAttribute('key'));

    taskListArr.map((task) => {
      if (taskId === task.id) {
        const idxToDelete = taskListArr.indexOf(task);

        taskListArr.splice(idxToDelete, 1);
        localStorage.setItem('tasks', JSON.stringify(taskListArr));
        updateMarkup(taskListArr);
      }
    });
  }
};

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

const doneTask = (e) => {
  const checkBtn = e.target.closest('#check');

  if (checkBtn) {
    const taskId = Number(checkBtn.getAttribute('key'));

    taskListArr.map((task) => {
      if (taskId === task.id) {
        doneTaskArr.push(task);
        localStorage.setItem('doneTasks', JSON.stringify(doneTaskArr));
        updateMarkupDoneTask(doneTaskArr);

        const idxToDelete = taskListArr.indexOf(task);

        taskListArr.splice(idxToDelete, 1);
        localStorage.setItem('tasks', JSON.stringify(taskListArr));
        updateMarkup(taskListArr);
      }
    });
  }
};

const reversal = (e) => {
  const doneTask = e.target.closest('#task-item-done');

  if (doneTask) {
    const taskId = Number(doneTask.getAttribute('key'));

    doneTaskArr.map((task) => {
      if (taskId === task.id) {
        taskListArr.push(task);
        localStorage.setItem('tasks', JSON.stringify(taskListArr));
        updateMarkup(taskListArr);

        const idxToDelete = doneTaskArr.indexOf(task);

        doneTaskArr.splice(idxToDelete, 1);
        localStorage.setItem('doneTasks', JSON.stringify(doneTaskArr));
        updateMarkupDoneTask(doneTaskArr);
      }
    });
  }
};

addBtn.addEventListener('click', (e) => {
  e.preventDefault();

  if (!input.value.length) {
    error.textContent = 'Enter a value';
  } else {
    const newTask = { id: Date.now(), task: input.value };

    taskListArr.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(taskListArr));
    updateMarkup(taskListArr);

    input.value = '';
  }
});
taskList.addEventListener('click', onDelete);
taskList.addEventListener('click', doneTask);
taskListDone.addEventListener('click', reversal);

input.addEventListener('input', (e) => {
  if (e.target.value) {
    error.textContent = '';
  }
});

updateMarkupDoneTask(doneTaskArr);
updateMarkup(taskListArr);
