//localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
import Project from './classes/project';
import Todo from './classes/todo';

function createDefaultProject() {
  const array = [];
  const projectNew = new Project('Default Project');
  array.push(projectNew);
  const activity = new Todo('default', 'write your description', Date.today, 1);
  projectNew.addList(activity);
  localStorage.setItem('myTodo', JSON.stringify(array));
}

function checkData() {
  localStorage.clear('myTodo');
  const array = [];
  if (!localStorage.getItem('myTodo')) {
    createDefaultProject();
  }
  if (localStorage.getItem('myTodo')) {
    const myLocalTodo = JSON.parse((localStorage.getItem('myTodo')));
    myLocalTodo.forEach((project) => {
      const { projectName } = project;
      const projectNew = new Project(projectName);
      project.list.forEach((todo) => {
        const {
          title, description, dueDate, priority, done,
        } = todo;
        const todoNew = new Todo(title, description, dueDate, priority);
        todoNew.done = done;
        projectNew.addList(todoNew);
      });
      array.push(projectNew);
    });
  }
  return array;
}

export default checkData;