import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import * as storageInfo from './storageInfo';
import domManipulation from './render/dom';


if (!localStorage.getItem('myTodo')) {
  storageInfo.createDefaultProject();
}

const fullList = storageInfo.checkDataStorage();

domManipulation.renderProject(fullList);
document.getElementsByClassName('project-button')[0].click();
domManipulation.setButtonListeners();