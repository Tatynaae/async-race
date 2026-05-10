import type { ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setUpdateForm } from '../store/slices/uiSlice';
import { clearSelectedCar, updateGarageCar } from '../store/thunks/garageThunks';
import { validateCarName } from '../utils/validation';
import './GarageView.css';

type UpdateCarInputsProps = {
  garageLocked: boolean;
  updateSelectedId: number | null;
  updateName: string;
  updateColor: string;
};

const UpdateCarInputs = ({
  garageLocked,
  updateSelectedId,
  updateName,
  updateColor,
}: UpdateCarInputsProps) => {
  const dispatch = useAppDispatch();
  const disabled = garageLocked || updateSelectedId === null;

  const onName = (e: ChangeEvent<HTMLInputElement>) =>
    dispatch(
      setUpdateForm({
        id: updateSelectedId,
        name: e.target.value,
        color: updateColor,
      }),
    );

  const onColor = (e: ChangeEvent<HTMLInputElement>) =>
    dispatch(
      setUpdateForm({
        id: updateSelectedId,
        name: updateName,
        color: e.target.value,
      }),
    );

  return (
    <>
      <input value={updateName} disabled={disabled} onChange={onName} placeholder="New name" />
      <input type="color" value={updateColor} disabled={disabled} onChange={onColor} />
    </>
  );
};

type UpdateCarFormProps = {
  garageLocked: boolean;
  onFormError: (message: string | null) => void;
};

export const UpdateCarForm = ({ garageLocked, onFormError }: UpdateCarFormProps) => {
  const dispatch = useAppDispatch();
  const { updateSelectedId, updateName, updateColor } = useAppSelector((s) => s.ui);

  const onUpdate = () => {
    if (updateSelectedId === null) {
      onFormError('Select a car to update');
      return;
    }
    const result = validateCarName(updateName);
    if (!result.ok) {
      onFormError(result.message);
      return;
    }
    onFormError(null);
    dispatch(
      updateGarageCar({ id: updateSelectedId, name: result.value, color: updateColor }),
    ).catch(() => undefined);
  };

  return (
    <div className="garage__fieldset">
      <h2>Update car</h2>
      <div className="garage__inputs">
        <UpdateCarInputs
          garageLocked={garageLocked}
          updateSelectedId={updateSelectedId}
          updateName={updateName}
          updateColor={updateColor}
        />
        <button type="button" disabled={garageLocked} onClick={onUpdate}>
          Update
        </button>
        <button type="button" disabled={garageLocked} onClick={() => dispatch(clearSelectedCar())}>
          Cancel update
        </button>
      </div>
    </div>
  );
};
