import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import projectListObject from './storageInfo';
import domManipulation from './render/dom';

domManipulation.renderProject(projectListObject);
domManipulation.setButtonListeners();

if (document.getElementsByClassName('project-button')[0]) {
  document.getElementsByClassName('project-button')[0].click();
} else {
  document.getElementById('add-project').click();
}
