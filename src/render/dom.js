import { addProject, removeProject } from '../listController';
// import addProject from '../listController';
import projectListObject from '../storageInfo';

const domManipulation = (() => {
  const renderTodo = (todos) => {
    const clear = document.getElementById('todos');
    clear.innerHTML = '';
    const todoContainer = document.getElementById('todos');
    todos.forEach((todo) => {
      const li = document.createElement('li');
      todoContainer.appendChild(li);

      const singleTodo = document.createElement('div');
      const todoTitle = document.createElement('h3');
      todoTitle.innerHTML = todo.title;
      const todoDescription = document.createElement('p');
      todoDescription.innerHTML = todo.description;
      const todoDate = document.createElement('p');
      todoDate.innerHTML = todo.dueDate;
      const todoPriority = document.createElement('p');
      todoPriority.innerHTML = todo.priority;
      const todoDone = document.createElement('p');
      todoDone.innerHTML = todo.done;

      li.appendChild(singleTodo);
      singleTodo.append(todoTitle, todoDescription, todoDate, todoPriority, todoDone);
    });
  };

  const renderProjectTitle = (titleProject) => {
    const title = document.getElementById('project-header');
    title.innerHTML = titleProject;
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
      // li.appendChild(deleteProject);
      proj.appendChild(li);
      projectName.addEventListener('click', () => {
        renderProjectTitle(project.projectName);
        renderTodo(project.list);
      });

      deleteProject.addEventListener('click', () => {
        removeProject(projectListObject.projectList.indexOf(project));
        renderProject();
      });

      deleteProject.addEventListener('mouseover', () => {
        deleteProject.classList = 'fas fa-times-circle';
      });
      deleteProject.addEventListener('mouseout', () => {
        deleteProject.classList = 'far fa-times-circle';
      });
    });
  };

  const hideForm = () => {
    const projectAddForm = document.getElementById('form-project');
    projectAddForm.remove();
    const projectButton = document.getElementById('add-project');
    projectButton.classList.remove('d-none');
    projectButton.classList.add('d-inline');
  };

  const renderFormProject = () => {
    const projectButton = document.getElementById('add-project');
    projectButton.classList.remove('d-inline');
    projectButton.classList.add('d-none');
    const listProjects = document.getElementById('projects');
    const div = document.createElement('div');
    div.setAttribute('id', 'form-project');
    const input = document.createElement('input');
    input.setAttribute('id', 'form-project-name');
    const button = document.createElement('button');
    const buttonCancel = document.createElement('button');
    button.innerHTML = 'Add';

    button.addEventListener('click', () => {
      const projectName = document.getElementById('form-project-name');
      addProject(projectName.value);
      hideForm();
      renderProject();
    });

    input.addEventListener('keypress', (e) => {
      const projectName = document.getElementById('form-project-name');
      if (e.code === 'Enter') {
        addProject(projectName.value);
        hideForm();
        renderProject();
      }
    });

    buttonCancel.innerHTML = 'Cancel';
    buttonCancel.addEventListener('click', hideForm);
    div.appendChild(input);
    div.appendChild(button);
    div.appendChild(buttonCancel);
    listProjects.appendChild(div);
    input.focus();
  };

  const setButtonListeners = () => {
    const projectButton = document.getElementById('add-project');
    projectButton.addEventListener('click', renderFormProject);
  };

  return {
    renderProject,
    renderFormProject,
    setButtonListeners,
    hideForm,
  };
})();

export default domManipulation;