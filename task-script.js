const taskReady = document.querySelector('.ready');
const initTask = taskReady.querySelector('.card-column');
const dialog1 = document.querySelector('.dialog1');
const dialog2 = document.querySelector('.dialog2');
const form1 = document.querySelector('.form1');
const form2 = document.querySelector('.form2');

const addButton = document.querySelector('.addTask');
// const addNoteButton = document.querySelector('.card-head img');

var dragSrcEl = null;
const readyTaskCol = document.querySelector('.ready .card-column');

let items;
let notes;

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

  notes = document.querySelectorAll('.card-note-list .new');
  notes.forEach(li => {
    const div = li.querySelector('div');
    div.classList.add('click');

    function handleClick() {
      div.classList.toggle('click');
    }

    li.addEventListener('click', handleClick);
    li.classList.remove('new');
  });
}

function createTask(heading, description) {
  const card = document.createElement('div');
  card.className = 'card';
  card.setAttribute('draggable', 'true');

  const cardHeadDiv = document.createElement("div");
  cardHeadDiv.className = "card-head";

  const taskHeading = document.createElement('h4');
  taskHeading.textContent = heading;
  const img = document.createElement("img");
  img.setAttribute("src", "add-post.png");

  img.addEventListener('click', (e) => {
    parentCard = e.target.parentNode.parentNode;
    dialog2.showModal();
  });

  cardHeadDiv.appendChild(taskHeading);
  cardHeadDiv.appendChild(img);

  const taskDescription = document.createElement('p');
  taskDescription.textContent = description;

  const ul = document.createElement("ul");
  ul.className = "card-note-list";

  // Append elements to cardDiv
  card.appendChild(cardHeadDiv);
  card.appendChild(taskDescription);
  card.appendChild(ul);

  const addText = initTask.querySelector('.addTask');
  initTask.insertBefore(card, addText);
  reCheck();
}

addButton.addEventListener('click', () => {
  dialog1.showModal();
});

form1.addEventListener('submit', (e) => {
  e.preventDefault();
  var name = document.getElementById('taskName');
  var desc = document.getElementById('taskDescription');
  createTask(name.value, desc.value);
  dialog1.close();
});

function createNote(card, title, note) {
  const noteElement = document.createElement('li');

  // const list = document.createElement('ul');
  const listTitle = document.createElement('h4');
  listTitle.textContent = title;

  const para = document.createElement('div');
  para.textContent = note;

  noteElement.appendChild(listTitle);
  noteElement.appendChild(para);
  noteElement.classList.add("new");

  card.querySelector('.card-note-list').appendChild(noteElement);
  reCheck();
}

let parentCard = undefined;

form2.addEventListener('submit', (e) => {
  e.preventDefault();
  var name = document.getElementById('noteTitle');
  var desc = document.getElementById('noteDescription');
  createNote(parentCard, name.value, desc.value);
  dialog2.close();
});

reCheck();

