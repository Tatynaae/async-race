import { useCallback, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setGaragePage } from '../store/slices/uiSlice';
import { garageInteractionsLocked } from '../utils/raceSelectors';
import { GarageWorkbench } from './GarageWorkbench';
import { useGarageDataLoader } from './useGarageDataLoader';
import './GarageView.css';

export const GarageView = () => {
  useGarageDataLoader();
  const dispatch = useAppDispatch();
  const { cars, total, status } = useAppSelector((s) => s.garage);
  const { garagePage } = useAppSelector((s) => s.ui);
  const race = useAppSelector((s) => s.race);
  const [formError, setFormError] = useState<string | null>(null);
  const carIds = useMemo(() => cars.map((c) => c.id), [cars]);
  const garageLocked = garageInteractionsLocked(race.pageRaceActive, carIds, race.cars);
  const pageChange = useCallback(
    (next: number) => {
      dispatch(setGaragePage(next));
    },
    [dispatch],
  );

  return (
    <section className="garage">
      <GarageWorkbench
        total={total}
        banner={race.banner}
        formError={formError}
        status={status}
        garageLocked={garageLocked}
        garagePage={garagePage}
        pageRaceActive={race.pageRaceActive}
        carIds={carIds}
        cars={cars}
        onFormError={setFormError}
        onPageChange={pageChange}
      />
    </section>
  );
};
