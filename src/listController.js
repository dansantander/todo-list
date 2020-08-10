import checkDataStorage from './storageInfo';
import Project from './classes/project';
import ProjectList from './classes/project_list';

const addProject = () => {
  console.log(3);
  const dataInfo = checkDataStorage();
  console.log(dataInfo);
  const projectName = document.getElementById('form-project-name');
  const projectNew = new Project(projectName.value);
  ProjectList.addProjectsList(projectNew);
  localStorage.setItem('myTodo', JSON.stringify(dataInfo));
};

export default (addProject);
