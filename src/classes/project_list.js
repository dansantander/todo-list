class ProjectList {
  constructor() {
    this.projectList = [];
  }

  addProjectsList(project) {
    this.projectList.push(project);
  }

  removeProjectsList(index) {
    this.projectList.splice(index, 1);
  }
}

export default ProjectList;