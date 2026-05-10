import { useMemo } from 'react';
import type { Car } from '../types/models';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getCarMotion } from '../utils/raceSelectors';
import { getCarMotionStyle, getCarRowUiState } from './carRowModel';
import { CarRowControls } from './CarRowControls';
import { CarIcon } from './CarIcon';
import './CarRow.css';

type CarRowProps = {
  car: Car;
  garageLocked: boolean;
};

export const CarRow = ({ car, garageLocked }: CarRowProps) => {
  const dispatch = useAppDispatch();
  const motion = useAppSelector((state) => getCarMotion(state.race.cars, car.id));
  const pageRaceActive = useAppSelector((state) => state.race.pageRaceActive);
  const style = useMemo(() => getCarMotionStyle(motion), [motion]);
  const ui = useMemo(
    () => getCarRowUiState(garageLocked, pageRaceActive, motion),
    [garageLocked, motion, pageRaceActive],
  );

  return (
    <div className="car-row">
      <CarRowControls car={car} ui={ui} dispatch={dispatch} />
      <div className="car-row__title">{car.name}</div>
      <div className="car-row__track">
        <div className={ui.carClassName} style={style}>
          <CarIcon color={car.color} label={car.name} />
        </div>
      </div>
    </div>
  );
};
