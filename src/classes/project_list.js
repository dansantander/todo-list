class ProjectList {
  constructor(list) {
    if (!list) {
      this.projectList = [];
    } else {
      this.projectList = list.projectList;
    }
  }

  addProjectsList(project) {
    this.projectList.push(project);
  }

  removeProjectsList(index) {
    this.projectList.splice(index, 1);
  }
}

export default ProjectList;