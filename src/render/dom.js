import {
  addProject, removeProject, addTodo, removeTodo,
} from '../listController';

// import addProject from '../listController';
import projectListObject from '../storageInfo';

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

  const renderTodo = (todos) => {
    const clear = document.getElementById('todos');
    clear.innerHTML = '';
    const todoContainer = document.getElementById('todos');
    todos.forEach((todo) => {
      const li = document.createElement('li');
      todoContainer.appendChild(li);

      const deleteTodo = document.createElement('i');
      deleteTodo.classList.add('far', 'fa-times-circle');

      const singleTodo = document.createElement('div');
      const todoTitle = document.createElement('h3');
      todoTitle.innerHTML = todo.title;
      const todoInfo = document.createElement('div');
      const todoDescription = document.createElement('p');
      todoDescription.innerHTML = todo.description;
      const todoDate = document.createElement('p');
      todoDate.innerHTML = todo.dueDate;
      const todoPriority = document.createElement('p');
      todoPriority.innerHTML = todo.priority;
      const todoDone = document.createElement('p');
      todoDone.innerHTML = todo.done;
      todoInfo.append(todoDescription, todoDate, todoPriority);

      li.appendChild(singleTodo);
      singleTodo.append(todoDone, todoTitle, todoInfo, deleteTodo);

      todoTitle.addEventListener('click', () => {
        todoInfo.classList.toggle('d-none');
      });

      deleteTodo.addEventListener('click', () => {
        const projectIndex = document.getElementById('project-index').innerHTML;
        const todoIndex = projectListObject.projectList[projectIndex].list.indexOf(todo);
        removeTodo(todoIndex, projectIndex);
        renderTodo(projectListObject.projectList[projectIndex].list);
        showTodoButton();
        showProjectButton();
      });

      deleteTodo.addEventListener('mouseover', () => {
        deleteTodo.classList = 'fas fa-times-circle';
      });
      deleteTodo.addEventListener('mouseout', () => {
        deleteTodo.classList = 'far fa-times-circle';
      });
    });
  };

  const renderProjectHeader = (titleProject, index) => {
    const title = document.getElementById('project-header');
    title.innerHTML = titleProject;
    document.getElementById('project-index').innerHTML = index;
  };

  const hideTodoForm = () => {
    const todoAddForm = document.getElementById('form-todo');
    todoAddForm.remove();
    showTodoButton();
    showProjectButton();
  };

  const hideProjectForm = () => {
    if (document.getElementById('form-project')) {
      const projectAddForm = document.getElementById('form-project');
      projectAddForm.remove();
    }
    showTodoButton();
    showProjectButton();
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
      li.classList.add('d-flex', 'justify-content-between');
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
        removeProject(projectListObject.projectList.indexOf(project));
        renderProject();
        showTodoButton();
        showProjectButton();
      });

      deleteProject.addEventListener('mouseover', () => {
        deleteProject.classList = 'fas fa-times-circle';
      });
      deleteProject.addEventListener('mouseout', () => {
        deleteProject.classList = 'far fa-times-circle';
      });
    });
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

  const renderFormProject = () => {
    hideFormButton();
    hideTodoButton();
    const listProjects = document.getElementById('projects');
    const div = document.createElement('div');
    div.setAttribute('id', 'form-project');
    const input = document.createElement('input');
    input.setAttribute('id', 'form-project-name');
    const button = document.createElement('button');
    const buttonCancel = document.createElement('button');
    const errorMessage = document.createElement('span');
    errorMessage.classList.add('d-none');
    errorMessage.innerHTML = 'This field must not be empty';
    button.innerHTML = 'Add';

    button.addEventListener('click', () => {
      const projectName = document.getElementById('form-project-name');
      if (projectName.value.trim() === '') {
        errorMessage.classList.remove('d-none');
      } else {
        addProject(projectName.value);
        hideProjectForm();
        renderProject();
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
        }
      }
    });

    buttonCancel.innerHTML = 'Cancel';
    buttonCancel.addEventListener('click', hideProjectForm);
    div.append(input, button, buttonCancel, errorMessage);
    listProjects.appendChild(div);
    input.focus();
  };

  const renderFormTodo = () => {
    hideFormButton();
    hideTodoButton();
    const listProjects = document.getElementById('todos');
    const div = document.createElement('div');
    div.setAttribute('id', 'form-todo');

    const labelTitle = document.createElement('label');
    labelTitle.innerHTML = 'Title: ';
    const inputTitle = document.createElement('input');
    inputTitle.setAttribute('id', 'form-todo-title');
    const labelDescription = document.createElement('label');
    labelDescription.innerHTML = 'Description: ';
    const inputDescription = document.createElement('input');
    inputDescription.setAttribute('id', 'form-todo-description');
    const labelDueDate = document.createElement('label');
    labelDueDate.innerHTML = 'Due Date: ';
    const inputDueDate = document.createElement('input');
    inputDueDate.setAttribute('id', 'form-todo-due-date');
    inputDueDate.setAttribute('type', 'date');

    const labelPriority = document.createElement('label');
    labelPriority.innerHTML = 'Priority: ';
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

    button.addEventListener('click', () => {
      const title = inputTitle.value;
      const description = inputDescription.value;
      const dueDate = inputDueDate.value;

      const priority = selectPriority.value;
      const projectIndex = document.getElementById('project-index').innerHTML;

      addTodo(title, description, dueDate, priority, projectIndex);
      hideTodoForm();
      renderTodo(projectListObject.projectList[projectIndex].list);
    });

    buttonCancel.innerHTML = 'Cancel';
    buttonCancel.addEventListener('click', hideTodoForm);
    div.append(labelTitle, inputTitle, labelDescription, inputDescription,
      labelDueDate, inputDueDate, labelPriority, selectPriority, button, buttonCancel);
    listProjects.appendChild(div);
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