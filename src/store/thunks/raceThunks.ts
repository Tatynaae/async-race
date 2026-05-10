import { driveEngine, startEngine, stopEngine } from '../../api/engineApi';
import { RETURN_ANIMATION_MS } from '../../constants/config';
import type { Car } from '../../types/models';
import { computeDriveDurationMs } from '../../utils/raceTiming';
import { upsertWinnerScore } from '../../utils/winnerScore';
import type { AppDispatch, RootState } from '../store';
import {
  markCarFinished,
  markCarIdle,
  markCarRacing,
  markCarReturning,
  markCarStarting,
  resetAllMotions,
  setBanner,
  setPageRaceActive,
} from '../slices/raceSlice';

const wait = (ms: number) =>
  new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms);
  });

const handleDriveFailure = async (dispatch: AppDispatch, id: number) => {
  dispatch(markCarReturning({ id, durationMs: RETURN_ANIMATION_MS }));
  try {
    await stopEngine(id);
  } catch {
    // ignore server failures during recovery
  }
  await wait(RETURN_ANIMATION_MS);
  dispatch(markCarIdle(id));
};

export const startCarDrive =
  (id: number) => async (dispatch: AppDispatch, getState: () => RootState) => {
    if (getState().race.pageRaceActive) {
      return;
    }
    dispatch(markCarStarting(id));
    try {
      const started = await startEngine(id);
      const durationMs = computeDriveDurationMs(started.distance, started.velocity);
      dispatch(markCarRacing({ id, durationMs }));
      await driveEngine(id);
      dispatch(markCarFinished(id));
    } catch {
      await handleDriveFailure(dispatch, id);
    }
  };

export const stopCarDrive = (id: number) => async (dispatch: AppDispatch) => {
  try {
    await stopEngine(id);
  } catch {
    // still reset UI locally
  }
  dispatch(markCarReturning({ id, durationMs: RETURN_ANIMATION_MS }));
  await wait(RETURN_ANIMATION_MS);
  dispatch(markCarIdle(id));
};

type WinnerSnapshot = { carId: number | null; name: string | null; timeSec: number };

const createWinnerSnapshot = (): WinnerSnapshot => ({
  carId: null,
  name: null,
  timeSec: 0,
});

export const startPageRace = (cars: Car[]) => async (dispatch: AppDispatch) => {
  if (!cars.length) {
    return;
  }
  dispatch(setPageRaceActive(true));
  dispatch(setBanner(null));
  const snapshot = createWinnerSnapshot();
  const runCar = async (car: Car) => {
    dispatch(markCarStarting(car.id));
    try {
      const started = await startEngine(car.id);
      const durationMs = computeDriveDurationMs(started.distance, started.velocity);
      dispatch(markCarRacing({ id: car.id, durationMs }));
      const startedAt = performance.now();
      await driveEngine(car.id);
      const timeSec = (performance.now() - startedAt) / 1000;
      dispatch(markCarFinished(car.id));
      if (snapshot.carId === null) {
        snapshot.carId = car.id;
        snapshot.name = car.name;
        snapshot.timeSec = timeSec;
      }
    } catch {
      await handleDriveFailure(dispatch, car.id);
    }
  };
  await Promise.all(cars.map(runCar));
  if (snapshot.name && snapshot.carId !== null) {
    dispatch(setBanner(`Winner: ${snapshot.name}`));
    await upsertWinnerScore(snapshot.carId, snapshot.timeSec);
  }
  dispatch(setPageRaceActive(false));
};

export const resetPageRace = (carIds: number[]) => async (dispatch: AppDispatch) => {
  dispatch(setPageRaceActive(false));
  dispatch(setBanner(null));
  await Promise.all(carIds.map((id) => stopEngine(id).catch(() => undefined)));
  dispatch(resetAllMotions(carIds));
};
