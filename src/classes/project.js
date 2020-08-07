class Project {
  constructor(name) {
    this.projectName = name;
    this.list = [];
  }

  addList(activity) {
    this.list.push(activity);
  }

  removeList(index) {
    this.list.splice(index, 1);
  }
}

export default Project;