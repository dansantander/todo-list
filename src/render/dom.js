import addProject from '../listController';
import checkDataStorage from '../storageInfo';

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

  const renderProject = (projects) => {
    const proj = document.getElementById('projects');
    proj.innerHTML = '';

    projects.projectList.forEach((project) => {
      const li = document.createElement('li');
      li.innerHTML = project.projectName;
      li.classList.add('project-button');
      proj.appendChild(li);
      li.addEventListener('click', () => {
        renderProjectTitle(project.projectName);
        renderTodo(project.list);
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
    console.log(1);
    
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
      console.log(2);
      addProject();
      hideForm();
      // renderProject(checkDataStorage());
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