import checkData from './storageInfo';
import Project from './classes/project';

const addProject = () => {
  const dataInfo = checkData();
  const projectName = document.getElementById('form-project-name');
  const projectNew = new Project(projectName.value);
  dataInfo.push(projectNew);
  localStorage.setItem('myTodo', JSON.stringify(dataInfo));
};

export default (addProject);
