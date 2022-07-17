import './style.scss';
import data from './data';
import { AppView } from './components/view/appView';

const app = new AppView();
app.drawCards(data);
