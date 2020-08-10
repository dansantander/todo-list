import Project from './classes/project';
import Todo from './classes/todo';
import ProjectList from './classes/project_list';
// import projectList from './classes/project_list';

function createDefaultProject() {
  const today = new Date();
  // eslint-disable-next-line prefer-template
  const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

  const array = [];
  const projectNew = new Project('Default Project');
  array.push(projectNew);
  const activity = new Todo('default', 'write your description', date, 1);
  projectNew.addList(activity);
  localStorage.setItem('myTodo', JSON.stringify(array));
}

function checkDataStorage() {
  // localStorage.clear('myTodo');
  const projectList = new ProjectList();
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
    projectList.addProjectsList(projectNew);
  });

  return projectList;
}

// export default checkDataStorage;
export { checkDataStorage, createDefaultProject };