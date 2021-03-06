import Project from './classes/project';
// import ProjectList from './classes/project_list';
import projectListObject from './storageInfo';
import Todo from './classes/todo';

const localStorageUpdate = (dataInfo) => {
  localStorage.setItem('ProjectListObject', JSON.stringify(dataInfo));
};

const addProject = (value) => {
  const dataInfo = projectListObject;
  const projectNew = new Project(value);
  dataInfo.addProjectsList(projectNew);
  localStorageUpdate(dataInfo);
};

const removeProject = (index) => {
  const dataInfo = projectListObject;
  dataInfo.removeProjectsList(index);
  localStorageUpdate(dataInfo);
};

const addTodo = (title, description, dueDate, priority, projectIndex) => {
  const activity = new Todo(title, description, dueDate, priority);
  projectListObject.projectList[projectIndex].addList(activity);
  localStorageUpdate(projectListObject);
};

const removeTodo = (todoIndex, projectIndex) => {
  projectListObject.projectList[projectIndex].removeList(todoIndex);
  localStorageUpdate(projectListObject);
};

const changeTodo = (todoIndex, projectIndex, todoObject) => {
  projectListObject.projectList[projectIndex].list[todoIndex].title = todoObject.title;
  projectListObject.projectList[projectIndex].list[todoIndex].description = todoObject.description;
  projectListObject.projectList[projectIndex].list[todoIndex].dueDate = todoObject.dueDate;
  projectListObject.projectList[projectIndex].list[todoIndex].priority = todoObject.priority;
  localStorageUpdate(projectListObject);
};


const toggleTodo = (todoIndex, projectIndex) => {
  projectListObject.projectList[projectIndex].list[todoIndex].markAsDone();
  localStorageUpdate(projectListObject);
};


export {
  addProject, removeProject, addTodo, removeTodo, toggleTodo, changeTodo,
};
