class ListTemplate {
    constructor(description, completed, index) {
      this.description = description;
      this.completed = completed;
      this.index = index;
    }
  }

const form = document.querySelector('.list-con');
const clearAll = document.getElementById('Completedbtn');

const todoContent = document.getElementById('listItem');
const todoTask = document.getElementById('input');

const localGet = () => {
    const storage = JSON.parse(localStorage.getItem('listStorage')) || [];
    return storage;
  };

  
const displayList = () => {
  todoContent.replaceChildren();
  localGet().forEach((item, id) => {
    let isCompleted;
    if (item.completed === true) {
      isCompleted = 'checked';
    } else {
      isCompleted = '';
    }
    todoContent.innerHTML += `
        <div class="toDoItem">
        <input class='item' id='check-${id}', "completed")' type='checkbox' ${item.Checked ? 'true' : 'false'} onChange='updateList(${id}, "completed")' ${isCompleted}>
        <input onkeyup='updateList(${id})' type="text" class='findInput' id='input-${id}' value='${item.description}' />
        <i onclick='removeList(${item.index})' id='delete-${item.index}'>🗑️</i>
        </div>
        `;
  });
};

const addList = (description, completed, index) => {
  const listAdded = new ListTemplate(description, completed, index);
  const x = localGet();
  x.push(listAdded);
  localStorage.setItem('listStorage', JSON.stringify(x));
  todoTask.value = '';

  displayList();
};

const reAssignIndex = (filteredArray) => {
  filteredArray.forEach((item, i) => {
    item.index = i + 1;
  });
};

window.removeList = (id) => {
  const filteredArray = localGet().filter((item) => {
    if (item.index !== id) {
      return item;
    }
    return '';
  });
  reAssignIndex(filteredArray);
  localStorage.setItem('listStorage', JSON.stringify(filteredArray));

  displayList();
};

window.updateList = (id) => {
  const updateInput = document.querySelector(`#input-${id}`).value;
  const updateArray = localGet().map((item) => {
    if (item.index - 1 === id) {
      item.description = updateInput;

      if (item.completed === true) {
        item.completed = false;
      } else {
        item.completed = true;
      }
    }
    return item;
  });

  localStorage.setItem('listStorage', JSON.stringify(updateArray));
};


const clearCompleted = () => {
    let inCompleted = localGet().filter((item) => {
      if (!item.completed) {
        return item;
      }
      return null;
    });
  
    inCompleted = inCompleted.map((item, id) => {
      item.index = id + 1;
      return item;
    });
    localStorage.setItem('listStorage', JSON.stringify(inCompleted));
    window.location.reload();
  };

window.addEventListener('load', () => {
  displayList();
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  addList(todoTask.value, false, localGet().length + 1);
  displayList();
});

clearAll.addEventListener('click', () => {
  clearCompleted();
  displayList();
});