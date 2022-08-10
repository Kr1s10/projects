import { useRef } from 'react';
import { carStartPosition, StatusEngine } from '../../types/constants';
import { TWinner } from '../../types/interfaces';
import EngineServise from '../../utils/EngineServise';
import getDistanceBtwnElements from '../helpers/Animation';

function useEngine(id:number) {
  const car = useRef(null);
  const flag = useRef(null);
  const animId = useRef(0);

  function animation(
    el: HTMLElement,
    distance: number,
    time: number,
  ) {
    let start: number | null = null;
    const carDiv = el;

    const measure = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = (timestamp - start) / time;
      const passed = Math.round(progress * distance);

      carDiv.style.transform = `translateX(${Math.min(passed, distance)}px)`;

      if (passed < distance) {
        animId.current = requestAnimationFrame(measure);
      }
    };

    animId.current = requestAnimationFrame(measure);
  }

  const startEngine = async (setWinner: React.Dispatch<React.SetStateAction<TWinner[]>>) => {
    const { velocity, distance } = await EngineServise.engine(id, StatusEngine.started);
    const time = Math.round(distance / velocity);
    const htmlDistance = Math.floor(getDistanceBtwnElements(car.current!, flag.current!) + 80);
    animation(car.current!, htmlDistance, time);
    const { success } = await EngineServise.engine(id, StatusEngine.drive);
    if (!success) {
      cancelAnimationFrame(animId.current);
    } else {
      const winner = {
        id,
        winsTime: time,
      };
      setWinner((prev) => [...prev, winner]);
    }
  };

  const stopEngine = async () => {
    await EngineServise.engine(id, StatusEngine.stopped);
    cancelAnimationFrame(animId.current);
    if (car.current) {
      (car.current! as HTMLElement).style.transform = carStartPosition;
    }
  };

  return {
    car, flag, stopEngine, startEngine,
  };
}

export default useEngine;
