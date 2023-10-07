document.getElementById('addTaskButton').addEventListener('click', addTask);

document.getElementById('addTaskButton').addEventListener('click', addTask);

function handleTaskListClick(event) {
  const target = event.target;
  if (target.classList.contains('edit-button')) {
    editTask(target.dataset.taskId);
  } else if (target.classList.contains('delete-button')) {
    deleteTask(target.dataset.taskId);
  }
}

document.getElementById('taskList').addEventListener('click', handleTaskListClick);



function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
  
    chrome.storage.sync.get(null, function(data) {
      for (const key in data) {
        const task = data[key];
        const li = document.createElement('li');
        li.innerHTML = `<span>${task.title} - ${task.name} (${task.status})</span>
                  <button class="edit-button" data-task-id="${key}">Edit</button>
                  <button class="delete-button" data-task-id="${key}">Delete</button>`;
        taskList.appendChild(li);
      }
    });
  }

  function addTask() {
    const taskTitle = document.getElementById('taskTitle').value;
    const taskName = document.getElementById('taskName').value;
    const taskStatus = document.getElementById('taskStatus').value;
  
    if (!taskTitle || !taskName || !taskStatus) {
      alert('Please enter valid task information.');
      return;
    }
  
    const task = {
      title: taskTitle,
      name: taskName,
      status: taskStatus
    };
  
    const taskId = Date.now().toString();
    console.log({ [taskId]: task });
    chrome.storage.sync.set({ [taskId]: task }, function() {
      renderTasks();
    });
  
    document.getElementById('taskTitle').value = '';
    document.getElementById('taskName').value = '';
  }
  
  function editTask(taskId) {
    const newTaskName = prompt('Enter the new task name:');
    if (newTaskName === null) return;
  
    chrome.storage.sync.get(taskId, function(data) {
      const task = data[taskId];
      task.name = newTaskName;
      chrome.storage.sync.set({ [taskId]: task }, function() {
        renderTasks();
      });
    });
  }
  
  function deleteTask(taskId) {
    chrome.storage.sync.remove(taskId, function() {
      renderTasks();
    });
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    renderTasks();
  });

  
//   edit
// ... existing code ...

let editingTaskId = null;

function editTask(taskId) {
  editingTaskId = taskId;

  chrome.storage.sync.get(taskId, function(data) {
    const task = data[taskId];
    document.getElementById('taskTitle').value = task.title;
    document.getElementById('taskName').value = task.name;
    document.getElementById('taskStatus').value = task.status;

    document.getElementById('addTaskButton').style.display = 'none';
    document.getElementById('updateTaskButton').style.display = 'block';
  });
}

function updateTask() {
  const taskTitle = document.getElementById('taskTitle').value;
  const taskName = document.getElementById('taskName').value;
  const taskStatus = document.getElementById('taskStatus').value;

  if (!taskTitle || !taskName || !taskStatus) {
    alert('Please enter valid task information.');
    return;
  }

  const updatedTask = {
    title: taskTitle,
    name: taskName,
    status: taskStatus
  };

  chrome.storage.sync.set({ [editingTaskId]: updatedTask }, function() {
    renderTasks();
    cancelEdit();
  });
}

function cancelEdit() {
  editingTaskId = null;
  document.getElementById('taskTitle').value = '';
  document.getElementById('taskName').value = '';
  document.getElementById('taskStatus').value = 'Not Started';
  document.getElementById('addTaskButton').style.display = 'block';
  document.getElementById('updateTaskButton').style.display = 'none';
}

document.getElementById('addTaskButton').addEventListener('click', addTask);
document.getElementById('updateTaskButton').addEventListener('click', updateTask);

// ... rest of the code ...

function handleTaskListClick(event) {
    const target = event.target;
    if (target.classList.contains('edit-button')) {
      editTask(target.dataset.taskId);
    } else if (target.classList.contains('delete-button')) {
      deleteTask(target.dataset.taskId);
    }
  }
  
  