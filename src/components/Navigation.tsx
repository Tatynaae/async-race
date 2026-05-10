import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setActiveView } from '../store/slices/uiSlice';
import type { AppView } from '../types/models';
import './Navigation.css';

export const Navigation = () => {
  const dispatch = useAppDispatch();
  const view = useAppSelector((s) => s.ui.activeView);

  const go = (next: AppView) => {
    dispatch(setActiveView(next));
  };

  return (
    <nav className="nav" aria-label="Primary">
      <button
        type="button"
        className={view === 'garage' ? 'nav__btn nav__btn--active' : 'nav__btn'}
        onClick={() => go('garage')}
      >
        Garage
      </button>
      <button
        type="button"
        className={view === 'winners' ? 'nav__btn nav__btn--active' : 'nav__btn'}
        onClick={() => go('winners')}
      >
        Winners
      </button>
    </nav>
  );
};
