import { CreateCarForm } from './CreateCarForm';
import { UpdateCarForm } from './UpdateCarForm';
import './GarageView.css';

type GarageFormsProps = {
  garageLocked: boolean;
  onFormError: (message: string | null) => void;
};

export const GarageForms = ({ garageLocked, onFormError }: GarageFormsProps) => (
  <div className="garage__panel">
    <CreateCarForm garageLocked={garageLocked} onFormError={onFormError} />
    <UpdateCarForm garageLocked={garageLocked} onFormError={onFormError} />
  </div>
);
