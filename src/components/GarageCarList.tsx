import type { Car } from '../types/models';
import { CarRow } from './CarRow';

type GarageCarListProps = {
  cars: Car[];
  garageLocked: boolean;
};

export const GarageCarList = ({ cars, garageLocked }: GarageCarListProps) => (
  <div className="garage__list">
    {cars.map((car) => (
      <CarRow key={car.id} car={car} garageLocked={garageLocked} />
    ))}
  </div>
);
