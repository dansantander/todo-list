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

  const renderProject = (projects) => {
    const proj = document.getElementById('projects');

    projects.forEach((project) => {
      const li = document.createElement('li');
      li.innerHTML = project.projectName;
      proj.appendChild(li);
      li.addEventListener('click', () => {
        renderTodo(project.list);
      });
    });
  };

  return {
    renderProject,
    renderTodo,
  };
})();

export default domManipulation;