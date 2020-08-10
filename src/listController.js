import Project from './classes/project';
import ProjectList from './classes/project_list';
import projectListInfo from './storageInfo';

const addProject = () => {
  const dataInfo = new ProjectList(projectListInfo);
  const projectName = document.getElementById('form-project-name');
  const projectNew = new Project(projectName.value);
  dataInfo.addProjectsList(projectNew);
  localStorage.setItem('myTodo', JSON.stringify(dataInfo));
};

export default (addProject);
