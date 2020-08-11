import Project from './classes/project';
// import ProjectList from './classes/project_list';
import projectListObject from './storageInfo';

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

export { addProject, removeProject };
