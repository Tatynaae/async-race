import type { CarMotion, CarMotionPhase } from '../store/slices/raceSlice';

export const isCarBusy = (phase: CarMotionPhase | undefined): boolean => {
  if (!phase) {
    return false;
  }
  return phase === 'starting' || phase === 'racing' || phase === 'returning';
};

export const getCarMotion = (map: Record<number, CarMotion>, id: number): CarMotion =>
  map[id] ?? { phase: 'idle', durationMs: 0, offsetPercent: 0 };

export const garageInteractionsLocked = (
  pageRaceActive: boolean,
  carIds: number[],
  carsRace: Record<number, CarMotion>,
): boolean => {
  if (pageRaceActive) {
    return true;
  }
  return carIds.some((id) => isCarBusy(getCarMotion(carsRace, id).phase));
};
