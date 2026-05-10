export const computeDriveDurationMs = (distance: number, velocity: number): number => {
  if (velocity <= 0) {
    return 0;
  }
  return Math.round(distance / velocity);
};
