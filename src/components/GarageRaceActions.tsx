import { useAppDispatch } from '../store/hooks';
import type { Car } from '../types/models';
import { generateRandomCars } from '../store/thunks/garageThunks';
import { resetPageRace, startPageRace } from '../store/thunks/raceThunks';
import './GarageView.css';

type GarageRaceActionsProps = {
  garageLocked: boolean;
  pageRaceActive: boolean;
  carIds: number[];
  cars: Car[];
};

export const GarageRaceActions = ({
  garageLocked,
  pageRaceActive,
  carIds,
  cars,
}: GarageRaceActionsProps) => {
  const dispatch = useAppDispatch();

  const start = () => dispatch(startPageRace(cars)).catch(() => undefined);
  const reset = () => dispatch(resetPageRace(carIds)).catch(() => undefined);
  const randomize = () => dispatch(generateRandomCars()).catch(() => undefined);

  return (
    <div className="garage__race">
      <button type="button" disabled={garageLocked || !cars.length} onClick={start}>
        Race
      </button>
      <button type="button" disabled={!carIds.length && !pageRaceActive} onClick={reset}>
        Reset
      </button>
      <button type="button" disabled={garageLocked} onClick={randomize}>
        Create 100 cars
      </button>
    </div>
  );
};
