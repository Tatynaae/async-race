import type { Car } from '../types/models';
import { buildUrl, readTotalCount } from './http';

export const fetchGaragePage = async (
  page: number,
  limit: number,
): Promise<{ cars: Car[]; total: number }> => {
  const url = buildUrl('/garage', { _page: page, _limit: limit });
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to load garage');
  }
  const cars = (await response.json()) as Car[];
  const total = readTotalCount(response.headers);
  return { cars, total };
};

export const fetchCar = async (id: number): Promise<Car | null> => {
  const response = await fetch(buildUrl(`/garage/${id}`));
  if (response.status === 404) {
    return null;
  }
  if (!response.ok) {
    throw new Error('Failed to load car');
  }
  return (await response.json()) as Car;
};

export const createCar = async (payload: Pick<Car, 'name' | 'color'>): Promise<Car> => {
  const response = await fetch(buildUrl('/garage'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error('Failed to create car');
  }
  return (await response.json()) as Car;
};

export const updateCar = async (car: Car): Promise<Car> => {
  const response = await fetch(buildUrl(`/garage/${car.id}`), {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: car.name, color: car.color }),
  });
  if (response.status === 404) {
    throw new Error('Car not found');
  }
  if (!response.ok) {
    throw new Error('Failed to update car');
  }
  return (await response.json()) as Car;
};

export const deleteCar = async (id: number): Promise<void> => {
  const response = await fetch(buildUrl(`/garage/${id}`), { method: 'DELETE' });
  if (response.status === 404) {
    return;
  }
  if (!response.ok) {
    throw new Error('Failed to delete car');
  }
};
