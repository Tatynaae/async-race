import type { AppDispatch, RootState } from '../store';
import { garageFailed, garageLoaded, garageLoading, patchCar } from '../slices/garageSlice';
import { clearUpdateForm, setGaragePage, setUpdateForm } from '../slices/uiSlice';
import { createCar, deleteCar, fetchGaragePage, updateCar } from '../../api/garageApi';
import { deleteWinner } from '../../api/winnersApi';
import { GARAGE_PAGE_SIZE, RANDOM_BATCH_SIZE } from '../../constants/config';
import type { Car } from '../../types/models';
import { buildRandomCarPayload } from '../../utils/randomCar';
import { validateCarName } from '../../utils/validation';

export const loadGarage = () => async (dispatch: AppDispatch, getState: () => RootState) => {
  const {
    ui: { garagePage },
  } = getState();
  dispatch(garageLoading());
  try {
    const { cars, total } = await fetchGaragePage(garagePage, GARAGE_PAGE_SIZE);
    dispatch(garageLoaded({ cars, total }));
  } catch {
    dispatch(garageFailed());
  }
};

export const createGarageCar =
  (payload: Pick<Car, 'name' | 'color'>) => async (dispatch: AppDispatch) => {
    const validation = validateCarName(payload.name);
    if (!validation.ok) {
      return;
    }
    try {
      await createCar({ name: validation.value, color: payload.color });
      await dispatch(loadGarage());
    } catch {
      dispatch(garageFailed());
    }
  };

export const updateGarageCar = (car: Car) => async (dispatch: AppDispatch) => {
  const validation = validateCarName(car.name);
  if (!validation.ok) {
    return;
  }
  try {
    const saved = await updateCar({ ...car, name: validation.value });
    dispatch(patchCar(saved));
  } catch {
    dispatch(garageFailed());
  }
};

export const deleteGarageCar =
  (id: number) => async (dispatch: AppDispatch, getState: () => RootState) => {
    const {
      garage: { total },
      ui: { garagePage },
    } = getState();
    try {
      await deleteWinner(id);
      await deleteCar(id);
    } catch {
      dispatch(garageFailed());
      return;
    }
    const nextTotal = Math.max(0, total - 1);
    const lastPage = Math.max(1, Math.ceil(nextTotal / GARAGE_PAGE_SIZE) || 1);
    if (garagePage > lastPage) {
      dispatch(setGaragePage(lastPage));
    }
    await dispatch(loadGarage());
  };

export const generateRandomCars = () => async (dispatch: AppDispatch) => {
  const tasks = Array.from({ length: RANDOM_BATCH_SIZE }, () => createCar(buildRandomCarPayload()));
  try {
    await Promise.all(tasks);
    await dispatch(loadGarage());
  } catch {
    dispatch(garageFailed());
  }
};

export const selectCarForEdit = (car: Car) => (dispatch: AppDispatch) => {
  dispatch(
    setUpdateForm({
      id: car.id,
      name: car.name,
      color: car.color,
    }),
  );
};

export const clearSelectedCar = () => (dispatch: AppDispatch) => {
  dispatch(clearUpdateForm());
};
