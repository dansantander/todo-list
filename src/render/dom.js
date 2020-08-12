import {
  addProject, removeProject, addTodo, removeTodo, toggleTodo, changeTodo,
} from '../listController';

// import addProject from '../listController';
import projectListObject from '../storageInfo';
import Todo from '../classes/todo';

const domManipulation = (() => {
  const showProjectButton = () => {
    const projectButton = document.getElementById('add-project');
    projectButton.classList.remove('d-none');
    projectButton.classList.add('d-inline');
  };

  const showTodoButton = () => {
    const todoButton = document.getElementById('add-todo');
    todoButton.classList.remove('d-none');
    todoButton.classList.add('d-inline');
  };

  const hideProjectForm = () => {
    if (document.getElementById('form-project')) {
      const projectAddForm = document.getElementById('form-project');
      projectAddForm.remove();
    }
    showTodoButton();
    showProjectButton();
  };

  const hideFormButton = () => {
    const projectButton = document.getElementById('add-project');
    projectButton.classList.remove('d-inline');
    projectButton.classList.add('d-none');
  };

  const hideTodoButton = () => {
    const todoButton = document.getElementById('add-todo');
    todoButton.classList.remove('d-inline');
    todoButton.classList.add('d-none');
  };

  const hideTodoForm = () => {
    const todoAddForm = document.getElementById('form-todo');
    todoAddForm.remove();
    showTodoButton();
    showProjectButton();
  };

  const renderEditFormTodo = (indexTodo, indexProject) => {
    hideProjectForm();
    hideFormButton();
    hideTodoButton();
    if (document.getElementById('form-todo')) {
      document.getElementById('form-todo').remove();
    }

    const liContainers = document.getElementById('todos').childNodes;
    for (let i = 0; i < liContainers.length; i += 1) {
      if (i === indexTodo) {
        liContainers[i].lastChild.classList.add('d-none');
      }
    }

    const activity = projectListObject.projectList[indexProject].list[indexTodo];

    const formContainer = document.createElement('div');
    formContainer.setAttribute('id', 'form-todo');

    const labelTitle = document.createElement('label');
    labelTitle.innerHTML = 'Title';

    const inputTitle = document.createElement('input');
    inputTitle.value = activity.title;
    inputTitle.setAttribute('id', 'form-todo-title');

    const labelDescription = document.createElement('label');
    labelDescription.innerHTML = 'Description ';

    const inputDescription = document.createElement('input');
    inputDescription.setAttribute('id', 'form-todo-description');

    inputDescription.value = activity.description;
    const labelDueDate = document.createElement('label');

    labelDueDate.innerHTML = 'Due Date ';
    const inputDueDate = document.createElement('input');

    inputDueDate.setAttribute('id', 'form-todo-due-date');
    inputDueDate.setAttribute('type', 'date');
    inputDueDate.value = activity.dueDate;

    const labelPriority = document.createElement('label');
    labelPriority.innerHTML = 'Priority ';

    const selectPriority = document.createElement('select');
    selectPriority.classList.add('select');
    selectPriority.setAttribute('id', 'select');

    const option1 = document.createElement('option');
    option1.innerHTML = 'Low';

    const option2 = document.createElement('option');
    option2.innerHTML = 'Medium';

    const option3 = document.createElement('option');
    option3.innerHTML = 'High';

    selectPriority.append(option1, option2, option3);
    selectPriority.value = activity.priority;

    const button = document.createElement('button');
    const buttonCancel = document.createElement('button');
    button.innerHTML = 'Change';
    button.classList.add('form-btn', 'left-button');
    buttonCancel.classList.add('form-btn', 'right-button');

    button.addEventListener('click', () => {
      const title = inputTitle.value;
      const description = inputDescription.value;
      const dueDate = inputDueDate.value;

      const priority = selectPriority.value;
      const todoObject = new Todo(title, description, dueDate, priority);
      changeTodo(indexTodo, indexProject, todoObject);
      hideTodoForm();
      // eslint-disable-next-line no-use-before-define
      renderTodo(projectListObject.projectList[indexProject].list);
      const allTodo = document.getElementById('todos');
      allTodo.children[indexTodo].firstChild.firstChild.children[1].click();
    });

    buttonCancel.innerHTML = 'Cancel';

    const titleContainer = document.createElement('div');
    titleContainer.classList.add('title-container');
    titleContainer.append(labelTitle, inputTitle);

    const descriptionContainer = document.createElement('div');
    descriptionContainer.classList.add('description-container');
    descriptionContainer.append(labelDescription, inputDescription);

    const dateContainer = document.createElement('div');
    dateContainer.classList.add('date-container');
    dateContainer.append(labelDueDate, inputDueDate);

    const priorityContainer = document.createElement('div');
    priorityContainer.classList.add('priority-container');
    priorityContainer.append(labelPriority, selectPriority);

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('priority-container');
    buttonContainer.append(button, buttonCancel);

    buttonCancel.addEventListener('click', () => {
      hideTodoForm();
      liContainers[indexTodo].lastChild.classList.remove('d-none');
    });

    formContainer.append(titleContainer, descriptionContainer,
      dateContainer, priorityContainer, buttonContainer);
    liContainers[indexTodo].appendChild(formContainer);
    inputTitle.focus();
  };

  const renderTodo = (todos) => {
    const clear = document.getElementById('todos');
    clear.innerHTML = '';
    const todoContainer = document.getElementById('todos');
    todoContainer.classList.add('todos');
    todos.forEach((todo) => {
      const li = document.createElement('li');
      todoContainer.appendChild(li);

      const todoIcons = document.createElement('div');


      const deleteTodo = document.createElement('i');
      deleteTodo.classList.add('px-1', 'far', 'fa-times-circle');

      const editTodo = document.createElement('i');
      editTodo.classList.add('px-1', 'far', 'fa-edit');

      todoIcons.append(editTodo, deleteTodo);

      const singleTodo = document.createElement('div');
      singleTodo.classList.add('d-flex', 'align-items-center', 'justify-content-between');

      const titleContainer = document.createElement('div');
      titleContainer.classList.add('title-container', 'd-flex', 'align-items-center');

      const todoTitle = document.createElement('h3');
      todoTitle.innerHTML = todo.title;

      const todoInfo = document.createElement('div');
      todoInfo.classList.add('d-none');

      const containerDescription = document.createElement('div');
      containerDescription.classList.add('mb-4');
      const labelInfoDescription = document.createElement('h5');
      labelInfoDescription.innerHTML = 'Description&nbsp;';
      const todoDescription = document.createElement('span');
      todoDescription.innerHTML = todo.description;

      containerDescription.append(labelInfoDescription, todoDescription);

      const containerDueDate = document.createElement('div');
      containerDueDate.classList.add('mb-4');
      const labelInfoDueDate = document.createElement('h5');
      labelInfoDueDate.innerHTML = 'Due Date&nbsp;';
      const todoDate = document.createElement('span');
      todoDate.innerHTML = todo.dueDate;

      containerDueDate.append(labelInfoDueDate, todoDate);

      const containerPriority = document.createElement('div');
      const labelInfoPriority = document.createElement('h5');
      labelInfoPriority.innerHTML = 'Priority&nbsp;';
      const todoPriority = document.createElement('span');
      todoPriority.innerHTML = todo.priority;

      containerPriority.append(labelInfoPriority, todoPriority);

      const todoDone = document.createElement('input');
      todoDone.setAttribute('type', 'checkbox');
      todoDone.classList.add('mr-3');
      todoDone.checked = todo.done;
      todoInfo.append(containerDescription, containerDueDate, containerPriority);

      li.appendChild(singleTodo);
      li.append(todoInfo);
      titleContainer.append(todoDone, todoTitle);
      singleTodo.append(titleContainer, todoIcons);

      todoTitle.addEventListener('click', () => {
        todoInfo.classList.toggle('d-none');
      });

      todoDone.addEventListener('click', () => {
        const projectIndex = document.getElementById('project-index').innerHTML;
        const todoIndex = projectListObject.projectList[projectIndex].list.indexOf(todo);
        toggleTodo(todoIndex, projectIndex);
      });

      deleteTodo.addEventListener('click', () => {
        const projectIndex = document.getElementById('project-index').innerHTML;
        const todoIndex = projectListObject.projectList[projectIndex].list.indexOf(todo);
        removeTodo(todoIndex, projectIndex);
        renderTodo(projectListObject.projectList[projectIndex].list);
        showTodoButton();
        showProjectButton();
      });

      editTodo.addEventListener('click', () => {
        const projectIndex = document.getElementById('project-index').innerHTML;
        const todoIndex = projectListObject.projectList[projectIndex].list.indexOf(todo);
        renderEditFormTodo(todoIndex, projectIndex);
      });

      editTodo.addEventListener('mouseover', () => {
        editTodo.classList = 'px-1 fas fa-edit';
      });
      editTodo.addEventListener('mouseout', () => {
        editTodo.classList = 'px-1 far fa-edit';
      });

      deleteTodo.addEventListener('mouseover', () => {
        deleteTodo.classList = 'px-1 fas fa-times-circle';
      });
      deleteTodo.addEventListener('mouseout', () => {
        deleteTodo.classList = 'px-1 far fa-times-circle';
      });
    });
  };

  const renderProjectHeader = (titleProject, index) => {
    const title = document.getElementById('project-header');
    title.innerHTML = titleProject;
    document.getElementById('project-index').innerHTML = index;
  };

  const renderProject = () => {
    const proj = document.getElementById('projects');
    proj.innerHTML = '';
    projectListObject.projectList.forEach((project) => {
      const li = document.createElement('li');
      const deleteProject = document.createElement('i');
      const projectName = document.createElement('div');
      deleteProject.classList.add('far', 'fa-times-circle');
      projectName.innerHTML = project.projectName;
      projectName.classList.add('project-button');
      li.classList.add('d-flex', 'justify-content-between', 'px-3', 'py-3');
      li.append(projectName, deleteProject);
      proj.appendChild(li);
      projectName.addEventListener('click', () => {
        renderProjectHeader(project.projectName, projectListObject.projectList.indexOf(project));
        renderTodo(project.list);
        showTodoButton();
        showProjectButton();
        hideProjectForm();
      });

      deleteProject.addEventListener('click', () => {
        const removeIndex = projectListObject.projectList.indexOf(project);
        removeProject(removeIndex);
        renderProject();
        showTodoButton();
        showProjectButton();
        if (String(removeIndex) === document.getElementById('project-index').innerHTML) {
          const projects = document.getElementsByClassName('project-button');
          projects[projects.length - 1].click();
        }
      });

      deleteProject.addEventListener('mouseover', () => {
        deleteProject.classList = 'fas fa-times-circle';
      });
      deleteProject.addEventListener('mouseout', () => {
        deleteProject.classList = 'far fa-times-circle';
      });
    });
  };

  const renderFormProject = () => {
    hideFormButton();
    hideTodoButton();
    const listProjects = document.getElementById('projects');
    const div = document.createElement('div');
    div.setAttribute('id', 'form-project');
    div.classList = 'px-2';
    const input = document.createElement('input');
    input.setAttribute('id', 'form-project-name');
    input.classList = 'align-self-center w-100 px-1';
    const button = document.createElement('button');
    const buttonCancel = document.createElement('button');
    const errorMessage = document.createElement('span');
    errorMessage.classList.add('d-none');
    errorMessage.innerHTML = 'This field must not be empty';
    button.innerHTML = 'Add';
    button.classList.add('left-button');
    buttonCancel.classList.add('right-button');

    button.addEventListener('click', () => {
      const projectName = document.getElementById('form-project-name');
      if (projectName.value.trim() === '') {
        errorMessage.classList.remove('d-none');
      } else {
        addProject(projectName.value);
        hideProjectForm();
        renderProject();
        const projects = document.getElementsByClassName('project-button');
        projects[projects.length - 1].click();
      }
    });

    input.addEventListener('keypress', (e) => {
      if (e.code === 'Enter' || e.code === 'NumpadEnter') {
        const projectName = document.getElementById('form-project-name');
        if (projectName.value.trim() === '') {
          errorMessage.classList.remove('d-none');
        } else {
          addProject(projectName.value);
          hideProjectForm();
          renderProject();
          const projects = document.getElementsByClassName('project-button');
          projects[projects.length - 1].click();
        }
      }
    });

    buttonCancel.innerHTML = 'Cancel';
    buttonCancel.addEventListener('click', hideProjectForm);
    div.append(input, errorMessage, button, buttonCancel);
    listProjects.appendChild(div);
    input.focus();
  };

  const renderFormTodo = () => {
    hideFormButton();
    hideTodoButton();
    const listProjects = document.getElementById('todos');
    const formContainer = document.createElement('div');
    formContainer.setAttribute('id', 'form-todo');

    const labelTitle = document.createElement('label');
    labelTitle.innerHTML = 'Title';

    const inputTitle = document.createElement('input');
    inputTitle.setAttribute('id', 'form-todo-title');

    const labelDescription = document.createElement('label');
    labelDescription.innerHTML = 'Description ';

    const inputDescription = document.createElement('input');
    inputDescription.setAttribute('id', 'form-todo-description');

    const labelDueDate = document.createElement('label');
    labelDueDate.innerHTML = 'Due Date ';

    const inputDueDate = document.createElement('input');
    inputDueDate.setAttribute('id', 'form-todo-due-date');
    inputDueDate.setAttribute('type', 'date');

    const labelPriority = document.createElement('label');
    labelPriority.innerHTML = 'Priority ';

    const selectPriority = document.createElement('select');
    selectPriority.classList.add('select');
    selectPriority.setAttribute('id', 'select');

    const option1 = document.createElement('option');
    option1.innerHTML = 'Low';

    const option2 = document.createElement('option');
    option2.innerHTML = 'Medium';

    const option3 = document.createElement('option');
    option3.innerHTML = 'High';
    selectPriority.append(option1, option2, option3);

    const button = document.createElement('button');
    const buttonCancel = document.createElement('button');
    button.innerHTML = 'Add';
    buttonCancel.innerHTML = 'Cancel';
    button.classList.add('form-btn', 'left-button');
    buttonCancel.classList.add('form-btn', 'right-button');

    const titleContainer = document.createElement('div');
    titleContainer.classList.add('title-container');
    titleContainer.append(labelTitle, inputTitle);

    const descriptionContainer = document.createElement('div');
    descriptionContainer.classList.add('description-container');
    descriptionContainer.append(labelDescription, inputDescription);

    const dateContainer = document.createElement('div');
    dateContainer.classList.add('date-container');
    dateContainer.append(labelDueDate, inputDueDate);

    const priorityContainer = document.createElement('div');
    priorityContainer.classList.add('priority-container');
    priorityContainer.append(labelPriority, selectPriority);

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('priority-container');
    buttonContainer.append(button, buttonCancel);


    button.addEventListener('click', () => {
      const title = inputTitle.value;
      const description = inputDescription.value;
      const dueDate = inputDueDate.value;

      const priority = selectPriority.value;
      const projectIndex = document.getElementById('project-index').innerHTML;

      addTodo(title, description, dueDate, priority, projectIndex);
      hideTodoForm();
      renderTodo(projectListObject.projectList[projectIndex].list);
      const allTodo = document.getElementById('todos');
      allTodo.lastChild.lastChild.children[1].click();
    });

    buttonCancel.addEventListener('click', hideTodoForm);

    formContainer.append(titleContainer, descriptionContainer,
      dateContainer, priorityContainer, buttonContainer);

    listProjects.appendChild(formContainer);

    inputTitle.focus();
  };


  const setButtonListeners = () => {
    const projectButton = document.getElementById('add-project');
    projectButton.addEventListener('click', renderFormProject);
    const todoButton = document.getElementById('add-todo');
    todoButton.addEventListener('click', renderFormTodo);
  };

  return {
    renderProject,
    setButtonListeners,
  };
})();

export default domManipulation;