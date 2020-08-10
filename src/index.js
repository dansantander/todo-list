import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import projectListInfo from './storageInfo';
import domManipulation from './render/dom';

domManipulation.renderProject(projectListInfo);
document.getElementsByClassName('project-button')[0].click();
domManipulation.setButtonListeners();