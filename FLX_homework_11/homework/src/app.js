let rootNode = document.getElementById('root');
// Your code goes here
let list = document.getElementById('list');
let input = document.getElementById('input');
let addBox = document.getElementById('plus');
let attention = rootNode.querySelector('p');
let counter = 0;
const itemLimit = 10;

addBox.addEventListener(`click`, (event) => {
    event.preventDefault();
    if (counter >= itemLimit || !input.value.trim()) {
        return;
    }
    createItem(input.value.trim());
    input.value = null;
    addBox.classList.add(`disabled`);
    if (counter >= itemLimit) {
        input.disabled = true;
        attention.style.visibility = `visible`;
    }
});

input.addEventListener(`input`, () => {
    if (input.value.trim()) {
        addBox.classList.remove(`disabled`);
    } else {
        addBox.classList.add(`disabled`);
    }
});

list.addEventListener(`click`, (event) => {
    if (event.target.innerText === `check_box_outline_blank`) {
        event.target.innerText = `check_box`;
    }
    if (event.target.innerText === `delete`) {
        event.target.parentElement.remove();
        counter--;
        input.disabled = false;
        attention.style.visibility = `hidden`;
    }
});

function createItem(data) {
    const listItem = document.createElement(`li`);
    const checkBoxIcon = document.createElement(`i`);
    const actionName = document.createElement(`span`);
    const deleteIcon = document.createElement(`i`);
    listItem.classList.add(`list-item`);
    listItem.classList.add(`draggable`);
    listItem.draggable = true;
    checkBoxIcon.classList.add(`material-icons`);
    deleteIcon.classList.add(`material-icons`);
    checkBoxIcon.innerText = `check_box_outline_blank`;
    deleteIcon.innerText = `delete`;
    actionName.innerText = data;
    listItem.appendChild(checkBoxIcon);
    listItem.appendChild(actionName);
    listItem.appendChild(deleteIcon);
    list.appendChild(listItem);
    counter++;
}

let dragSrcEl = null;

function handleDragOver(x) {
    let target = x.target;
    if (target.classList.contains('draggable')) {
        if (x.preventDefault) {
            x.preventDefault();
        }
        target.classList.add('move');
        x.dataTransfer.dropEffect = 'move';
    }
    return false;
}

function handleDragStart(x) {
    let target = x.target;
    if (target.classList.contains('draggable')) {
        dragSrcEl = target;
        x.dataTransfer.effectAllowed = 'move';
        x.dataTransfer.setData('text/html', target.outerHTML);
        target.classList.add('dragging');
    }
}



function handleDragLeave(x) {
    x.target.classList.remove('move');
}

function handleDrop(x) {
    let target = x.target;
    if (target.classList.contains('draggable')) {
        x.stopPropagation();
        if (dragSrcEl !== target) {
            target.parentNode.removeChild(dragSrcEl);
            let dropHTML = x.dataTransfer.getData('text/html');
            target.insertAdjacentHTML('beforebegin', dropHTML);
            let dropElem = target.previousSibling;
            dropElem.classList.remove('dragging');
        }
    }
    target.classList.remove('move');
    return false;
}

function handleDragEnd() {
    this.classList.remove('move');
}

function addDnDHandlers(elem) {
    elem.addEventListener('dragstart', handleDragStart, false);
    elem.addEventListener('dragover', handleDragOver, false);
    elem.addEventListener('dragleave', handleDragLeave, false);
    elem.addEventListener('drop', handleDrop, false);
    elem.addEventListener('dragend', handleDragEnd, false);
}

addDnDHandlers(list);