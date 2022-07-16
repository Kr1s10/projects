import './style.scss';
import './components/view/slider/slider';
import data from './data';
import { Card } from './components/view/cards/cards';

const app = new Card();
app.draw(data);
