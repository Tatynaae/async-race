import { useMemo, type CSSProperties } from 'react';
import type { Car } from '../types/models';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getCarMotion } from '../utils/raceSelectors';
import { getCarMotionStyle, getCarRowUiState } from './carRowModel';
import { TRACK_END_PERCENT } from '../constants/config';
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
      <div
        className="car-row__track"
        style={{ '--track-travel': TRACK_END_PERCENT / 100 } as CSSProperties}
      >
        <span className="car-row__name">{car.name}</span>
        <div className={ui.carClassName} style={style}>
          <div className="car-row__car-inner">
            <CarIcon color={car.color} />
          </div>
        </div>
      </div>
    </div>
  );
};
