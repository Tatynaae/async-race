import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { loadGarage } from '../store/thunks/garageThunks';

export const useGarageDataLoader = () => {
  const dispatch = useAppDispatch();
  const garagePage = useAppSelector((s) => s.ui.garagePage);

  useEffect(() => {
    dispatch(loadGarage()).catch(() => undefined);
  }, [dispatch, garagePage]);
};
