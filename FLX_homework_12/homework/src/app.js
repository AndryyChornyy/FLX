const rootNode = document.getElementById('root');
let todoList = [];

const methods = {
    add(sight) {
        const rndNum = Math.floor(Math.random() * Infinity);
        const id = 'task_' + rndNum;
        const item = {
            sight,
            id,
            isDone: false
        };

        todoList.push(item);
        localStorage.setItem('todoList', JSON.stringify(todoList));

        return todoList;
    },



    getId(x) {
        return this.getList().find(item => item.id === x);
    },

    getList() {
        return JSON.parse(localStorage.getItem('todoList'));
    },

    markNotDone() {
        return this.getList().filter(item => item.isDone === false);
    },

    markDone() {
        return this.getList().filter(item => item.isDone === true);
    },

    getSorted() {
        return this.markNotDone().concat(this.markDone());
    },

    setMakrDoneId(x) {
        const changelist = this.getList().map(item => {
            if (item.id === x) {
                item.isDone = true;
            }

            return item;
        });

        localStorage.setItem('todoList', JSON.stringify(changelist));

        return todoList;
    },

    exchangeDscr(x, sight) {
        const changelist = this.getList().map(item => {
            if (item.id === x) {
                item.sight = sight;
            }

            return item;
        });

        localStorage.setItem('todoList', JSON.stringify(changelist));

        return todoList;
    },

    delById(x) {
        const changelist = this.getList().filter(item => item.id !== x);

        localStorage.setItem('todoList', JSON.stringify(changelist));

        return todoList;
    }
};

const route = {
    upload() {
        const hash = window.location.hash;

        if (hash.endsWith('/add')) {
            this.addTask();
        } else if ((/\/modify\/task_\d+$/).test(hash)) {
            const id = hash.slice(hash.lastIndexOf('/') + 1);
            this.modifyTask(id);
        } else {
            this.mainPage();
        }
    },
    addTask() {
        document.title = 'Add new task';
        rootNode.innerHTML = '';
        rootNode.appendChild(templ.put());
    },
    modifyTask(x) {
        const item = methods.getId(x);
        document.title = `Modify ${item.sight}`;
        rootNode.innerHTML = '';
        rootNode.appendChild(templ.modify(item));
    },
    mainPage() {
        window.history.pushState('', '/', window.location.pathname);
        document.title = 'Main page';
        rootNode.innerHTML = '';
        rootNode.appendChild(templ.head(todoList));
    }
};

const templ = {
    head(todoList) {
        const headSec = document.createElement('section');
        headSec.id = 'main-section';

        const addButton = document.createElement('button');
        addButton.id = 'new-task';
        addButton.innerText = 'Add new task';

        const elh1 = document.createElement('h1');
        elh1.innerText = 'Simple TODO application';

        const litsEmpty = document.createElement('p');
        litsEmpty.classList.add('empty-todo');
        litsEmpty.innerText = 'TODO is empty';

        const listTD = document.createElement('ul');
        listTD.id = 'todo-list';

        addButton.onclick = () => {
            window.location.hash = '/add';
        };

        headSec.appendChild(elh1);
        headSec.appendChild(addButton);
        headSec.appendChild(listTD);
        headSec.appendChild(litsEmpty);

        if (todoList.length) {
            for (let post of todoList) {
                const liEl = document.createElement('li');
                liEl.id = post.id;

                const checkEl = document.createElement('button')
                checkEl.classList.add('box-undone');

                if (post._isDone) {
                    checkEl.className = 'box-done';
                } else {
                    checkEl.className = 'box-undone';
                }

                const taskText = document.createElement('button');
                taskText.classList.add('todo-text');
                taskText.innerText = post.sight;

                const delBtn = document.createElement('button');
                delBtn.classList.add('remove');

                checkEl.onclick = () => {
                    if (checkEl.className === 'box-undone') {
                        checkEl.className = 'box-done';
                        methods.setMakrDoneId(post.id);
                        listTD.appendChild(liEl);
                    }
                };

                taskText.onclick = () => {
                    window.location.hash = `/modify/${post.id}`;
                };

                delBtn.onclick = () => {
                    liEl.remove();
                    methods.delById(post.id);
                };

                liEl.appendChild(checkEl);
                liEl.appendChild(taskText);
                liEl.appendChild(delBtn);

                listTD.appendChild(liEl);
            }
        }

        return headSec;
    },

    put() {
        const head = document.createElement('section');
        head.id = 'add-section';

        const elh1 = document.createElement('h1');
        elh1.innerText = 'Add task';

        const btnSave = document.createElement('button');
        btnSave.classList.add('btnSave');
        btnSave.disabled = true;
        btnSave.innerText = 'Save changes';

        const fooEl = document.createElement('footer');

        const btnCancle = document.createElement('button');
        btnCancle.classList.add('btnCan');
        btnCancle.innerText = 'Cancel';

        const inputEl = document.createElement('input');
        inputEl.size = '40';
        inputEl.type = 'text';
        inputEl.placeholder = 'Task description';

        inputEl.onchange = inputEl.onkeyup = () => {
            const number = inputEl.value.trim();

            btnSave.disabled = !number;

            if (event.code === 'Enter' && number) {
                btnSave.click();
            }
        };

        btnCancle.onclick = () => {
            window.location.hash = '/main';
        };

        btnSave.onclick = () => {
            methods.add(inputEl.value.trim());
            window.location.hash = '/main';
        };

        fooEl.appendChild(btnCancle);
        fooEl.appendChild(btnSave);

        head.appendChild(elh1);
        head.appendChild(inputEl);
        head.appendChild(fooEl);

        return head;
    },

    modify(item) {
        const main = this.put();

        main.id = 'modify-section';
        main.querySelector('h1').textContent = 'Modify item';
        main.querySelector('input').value = item.sight;
        main.querySelector('.btnSave').onclick = () => {
            methods.exchangeDscr(item.id, main.querySelector('input').value.trim());
            window.location.hash = '/main';
        };

        return main;
    }
};



window.onload = window.onhashchange = () => {
    if (localStorage.getItem('todoList')) {
        todoList = methods.getSorted();
    }

    route.upload();
};