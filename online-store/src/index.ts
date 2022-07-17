import './style.scss';
import { Slider } from './components/view/slider/slider';
import data from './data';
import { Card } from './components/view/cards/cards';

const priceSlider = new Slider([0, 845], 'price');

const dateSlider = new Slider([2008, 2022], 'date');

const app = new Card();
app.draw(data);
