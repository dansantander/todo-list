import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import checkData from './storageInfo';
import domManipulation from './render/dom';


domManipulation.renderProject(checkData());
document.getElementsByClassName('project-button')[0].click();
domManipulation.setButtonListeners();