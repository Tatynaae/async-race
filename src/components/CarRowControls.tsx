import type { Car } from '../types/models';
import type { AppDispatch } from '../store/store';
import { startCarDrive, stopCarDrive } from '../store/thunks/raceThunks';
import { deleteGarageCar, selectCarForEdit } from '../store/thunks/garageThunks';
import type { getCarRowUiState } from './carRowModel';

type RowUi = ReturnType<typeof getCarRowUiState>;

type CarRowControlsProps = {
  car: Car;
  ui: RowUi;
  dispatch: AppDispatch;
};

export const CarRowControls = ({ car, ui, dispatch }: CarRowControlsProps) => (
  <div className="car-row__controls">
    <div className="car-row__controls-col b">
      <button
        type="button"
        disabled={ui.controlsDisabled}
        onClick={() => dispatch(selectCarForEdit(car))}
      >
        Select
      </button>
      <button
        type="button"
        disabled={ui.controlsDisabled}
        onClick={() => dispatch(deleteGarageCar(car.id))}
      >
        Remove
      </button>
    </div>
    <div className="car-row__controls-col a">
      <button
        type="button"
        disabled={ui.startDisabled}
        onClick={() => dispatch(startCarDrive(car.id))}
      >
        A
      </button>
      <button
        type="button"
        disabled={ui.stopDisabled}
        onClick={() => dispatch(stopCarDrive(car.id))}
      >
        B
      </button>
    </div>
  </div>
);
