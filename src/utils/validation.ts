import { MAX_CAR_NAME_LENGTH } from '../constants/config';

export const normalizeName = (raw: string): string => raw.trim();

export type NameValidation = { ok: true; value: string } | { ok: false; message: string };

export const validateCarName = (raw: string): NameValidation => {
  const value = normalizeName(raw);
  if (!value.length) {
    return { ok: false, message: 'Name is required' };
  }
  if (value.length > MAX_CAR_NAME_LENGTH) {
    return { ok: false, message: `Name must be at most ${MAX_CAR_NAME_LENGTH} characters` };
  }
  return { ok: true, value };
};
