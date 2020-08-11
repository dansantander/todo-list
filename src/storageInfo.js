import Project from './classes/project';
import Todo from './classes/todo';
import ProjectList from './classes/project_list';

const projectList = new ProjectList();

function createDefaultProject() {
  const projectListDefault = new ProjectList();
  const today = new Date();
  const date = `${today.getFullYear()} - ${today.getMonth() + 1}-${today.getDate()}`;
  const projectNew = new Project('Default Project');
  const activity = new Todo('default', 'write your description', date, 'Low');
  projectNew.addList(activity);
  projectListDefault.addProjectsList(projectNew);
  localStorage.setItem('ProjectListObject', JSON.stringify(projectListDefault));
}

function checkDataStorage() {
  // localStorage.clear('ProjectListObject');
  const myLocalTodo = JSON.parse((localStorage.getItem('ProjectListObject')));
  myLocalTodo.projectList.forEach((project) => {
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
// localStorage.clear('ProjectListObject');
if (!localStorage.getItem('ProjectListObject')) {
  createDefaultProject();
}

checkDataStorage();

// export default checkDataStorage;
export default projectList;
