import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import projectListObject from './storageInfo';
import domManipulation from './render/dom';

domManipulation.renderProject(projectListObject);
document.getElementsByClassName('project-button')[0].click();
domManipulation.setButtonListeners();