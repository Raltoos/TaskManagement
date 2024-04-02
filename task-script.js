const taskReady = document.querySelector('.ready');
const initTask = taskReady.querySelector('.card-column');
const dialog = document.querySelector('dialog');
const form = document.querySelector('form');

const addButton = document.querySelector('.addTask');

var dragSrcEl = null;
const readyTaskCol = document.querySelector('.ready .card-column');

let items;

function handleDragStart(e) {
  this.style.opacity = '0.1';
  this.style.border = '3px dashed #c4cad3';

  dragSrcEl = this;
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', this.innerHTML);
}
function handleDragOver(e) {
  if (e.preventDefault) {
    e.preventDefault();
  }
  e.dataTransfer.dropEffect = 'move';

  return false;
}
function handleDragEnter(e) {
  this.classList.add('card-hover');
}
function handleDragLeave(e) {
  this.classList.remove('card-hover');
}
function handleDrop(e) {
  e.preventDefault();
  e.stopPropagation();
  // var targetColumn = e.target.closest('.card-column');

  // if (targetColumn) {
  //   var addTaskText = targetColumn.querySelector('.addTask');
  //   targetColumn.insertBefore(dragSrcEl, addTaskText||null);
  // }

  // if (dragSrcEl != this) {
  //   dragSrcEl.innerHTML = this.innerHTML;
  //   this.innerHTML = e.dataTransfer.getData('text/html');
  // }
  var targetColumn = e.target.closest('.card-column');
  var addTaskText = targetColumn.querySelector('.addTask');

  // Check if the drop target is the 'addTask' element
  if (addTaskText == e.target) {
    targetColumn.insertBefore(dragSrcEl, addTaskText);
   }
  else {
    // If not, insert the task before the target element
    // targetColumn.insertBefore(dragSrcEl, e.target);
    if (dragSrcEl !== this) {
      dragSrcEl.innerHTML = this.innerHTML;
      this.innerHTML = e.dataTransfer.getData('text/html');
    }
  }
}
function handleDragEnd(e) {
  this.style.opacity = '1';
  this.style.border = 0;

  reCheck();
  items.forEach(function (item) {
    item.classList.remove('card-hover');
  });
}

function reCheck() {
  items = document.querySelectorAll('.card');
  let addAreas = document.querySelectorAll('.addTask');
  items.forEach(function (item) {
    item.addEventListener('dragstart', handleDragStart, false);
    item.addEventListener('dragenter', handleDragEnter, false);
    item.addEventListener('dragover', handleDragOver, false);
    item.addEventListener('dragleave', handleDragLeave, false);
    item.addEventListener('drop', handleDrop, false);
    item.addEventListener('dragend', handleDragEnd, false);
  });
  addAreas.forEach(function (addArea) {
    // addArea.addEventListener('dragstart', handleDragStart, false);
    // addArea.addEventListener('dragenter', handleDragEnter, false);
    addArea.addEventListener('dragover', handleDragOver, false);
    // addArea.addEventListener('dragleave', handleDragLeave, false);
    addArea.addEventListener('drop', handleDrop, false);
    // addArea.addEventListener('dragend', handleDragEnd, false);
  });
}

function createTask(heading, description) {
  const card = document.createElement('div');
  card.className = 'card';
  card.setAttribute('draggable', 'true');

  const taskHeading = document.createElement('h4');
  const taskDescription = document.createElement('p');

  taskHeading.textContent = heading;
  taskDescription.textContent = description;

  card.appendChild(taskHeading);
  card.appendChild(taskDescription);

  const addText = initTask.querySelector('.addTask');
  initTask.insertBefore(card, addText);
  reCheck();
}

addButton.addEventListener('click', () => {
  dialog.showModal();
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  var name = document.getElementById('taskName');
  var desc = document.getElementById('taskDescription');
  createTask(name.value, desc.value);
  dialog.close();
});

reCheck();