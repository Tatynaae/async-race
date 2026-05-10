import type { Car } from '../types/models';
import { CAR_NAME_PREFIXES, CAR_NAME_SUFFIXES } from '../constants/randomCarParts';
import { randomHexColor } from './randomColor';

const pick = <T>(items: readonly T[]): T => items[Math.floor(Math.random() * items.length)];

export const buildRandomCarPayload = (): Pick<Car, 'name' | 'color'> => ({
  name: `${pick(CAR_NAME_PREFIXES)} ${pick(CAR_NAME_SUFFIXES)}`,
  color: randomHexColor(),
});
