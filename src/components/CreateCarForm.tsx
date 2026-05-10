import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setCreateForm } from '../store/slices/uiSlice';
import { createGarageCar } from '../store/thunks/garageThunks';
import { validateCarName } from '../utils/validation';
import './GarageView.css';

type CreateCarFormProps = {
  garageLocked: boolean;
  onFormError: (message: string | null) => void;
};

export const CreateCarForm = ({ garageLocked, onFormError }: CreateCarFormProps) => {
  const dispatch = useAppDispatch();
  const { createName, createColor } = useAppSelector((s) => s.ui);

  const onCreate = () => {
    const result = validateCarName(createName);
    if (!result.ok) {
      onFormError(result.message);
      return;
    }
    onFormError(null);
    dispatch(createGarageCar({ name: result.value, color: createColor })).catch(() => undefined);
  };

  return (
    <div className="garage__fieldset">
      <h2>Create car</h2>
      <div className="garage__inputs">
        <input
          value={createName}
          disabled={garageLocked}
          onChange={(e) => dispatch(setCreateForm({ name: e.target.value, color: createColor }))}
          placeholder="Car name"
        />
        <input
          type="color"
          value={createColor}
          disabled={garageLocked}
          onChange={(e) => dispatch(setCreateForm({ name: createName, color: e.target.value }))}
        />
        <button type="button" disabled={garageLocked} onClick={onCreate}>
          Create
        </button>
      </div>
    </div>
  );
};
