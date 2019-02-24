let rootNode = document.getElementById('root');
// Your code goes here
let actionList = rootNode.querySelector('ul');
let input = rootNode.querySelector('form input');
let plus = rootNode.querySelector('form i');
let attention = rootNode.querySelector('p');
let itemCounter = 0;
const maxItems = 10;

plus.addEventListener(`click`, (event) => {
    event.preventDefault();
    if (itemCounter >= maxItems || !input.value.trim()) {
        return;
    }
    createItem(input.value.trim());
    input.value = null;
    plus.classList.add(`disabled`);
    if (itemCounter >= maxItems) {
        input.disabled = true;
        attention.style.visibility = `visible`;
    }
});

input.addEventListener(`input`, () => {
    if (input.value.trim()) {
        plus.classList.remove(`disabled`);
    } else {
        plus.classList.add(`disabled`);
    }
});

actionList.addEventListener(`click`, (event) => {
    if (event.target.innerText === `check_box_outline_blank`) {
        event.target.innerText = `check_box`;
    }
    if (event.target.innerText === `delete`) {
        event.target.parentElement.remove();
        itemCounter--;
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
    actionList.appendChild(listItem);
    itemCounter++;
}

let dragSrcEl = null;

function handleDragStart(e) {
    let target = e.target;
    if (target.classList.contains('draggable')) {
        dragSrcEl = target;
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', target.outerHTML);
        target.classList.add('dragging');
    }
}

function handleDragOver(e) {
    let target = e.target;
    if (target.classList.contains('draggable')) {
        if (e.preventDefault) {
            e.preventDefault();
        }
        target.classList.add('move');
        e.dataTransfer.dropEffect = 'move';
    }
    return false;
}

function handleDragLeave(e) {
    e.target.classList.remove('move');
}

function handleDrop(e) {
    let target = e.target;
    if (target.classList.contains('draggable')) {
        e.stopPropagation();
        if (dragSrcEl !== target) {
            target.parentNode.removeChild(dragSrcEl);
            let dropHTML = e.dataTransfer.getData('text/html');
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

addDnDHandlers(actionList);