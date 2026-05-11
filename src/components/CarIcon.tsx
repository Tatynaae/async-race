import { Car } from 'lucide-react';
import './CarIcon.css';

type CarIconProps = {
  color: string;
};

export const CarIcon = ({ color }: CarIconProps) => (
  <div className="car-icon">
    <Car
      className="car-icon__shape"
      size={48}
      fill={color}
      stroke="none"
      strokeWidth={0}
      aria-hidden
    />
  </div>
);
