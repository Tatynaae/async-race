import type { CSSProperties } from 'react';
import type { CarMotion } from '../store/slices/raceSlice';

export const getCarMotionStyle = (motion: CarMotion): CSSProperties => {
  if (motion.phase === 'racing') {
    return {
      animationDuration: `${motion.durationMs}ms`,
      transform: 'translateX(0)',
    };
  }
  const transition =
    motion.phase === 'returning' ? `transform ${motion.durationMs}ms linear` : 'none';
  return {
    transform: `translateX(${motion.offsetPercent}%)`,
    transition,
  };
};

export const getCarRowUiState = (
  garageLocked: boolean,
  pageRaceActive: boolean,
  motion: CarMotion,
) => {
  const carClassName =
    motion.phase === 'racing' ? 'car-row__car car-row__car--race' : 'car-row__car';
  const atStart = motion.phase === 'idle' && motion.offsetPercent === 0;
  const startDisabled =
    garageLocked ||
    pageRaceActive ||
    motion.phase === 'starting' ||
    motion.phase === 'racing' ||
    motion.phase === 'finished';
  const stopDisabled = garageLocked || pageRaceActive || atStart || motion.phase === 'starting';
  const controlsDisabled = garageLocked || pageRaceActive || motion.phase === 'returning';
  return { carClassName, startDisabled, stopDisabled, controlsDisabled };
};
