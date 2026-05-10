import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setWinnersSort } from '../store/slices/uiSlice';
import type { SortOrder, WinnerSortField } from '../types/models';
import './WinnersView.css';

const sortArrow = (field: WinnerSortField, active: WinnerSortField, order: SortOrder) => {
  if (active !== field) {
    return '';
  }
  if (order === 'ASC') {
    return '↑';
  }
  return '↓';
};

const toggleOrder = (field: WinnerSortField, current: WinnerSortField, order: SortOrder) => {
  if (current !== field) {
    return 'DESC' as SortOrder;
  }
  return order === 'ASC' ? 'DESC' : 'ASC';
};

type WinnersToolbarProps = {
  garageLocked: boolean;
};

export const WinnersToolbar = ({ garageLocked }: WinnersToolbarProps) => {
  const dispatch = useAppDispatch();
  const { winnersSort, winnersOrder } = useAppSelector((s) => s.ui);

  const onSort = (field: WinnerSortField) => {
    const nextOrder = toggleOrder(field, winnersSort, winnersOrder);
    dispatch(setWinnersSort({ sort: field, order: nextOrder }));
  };

  return (
    <header className="winners__header">
      <h1>Winners</h1>
      <div className="winners__sort">
        <button type="button" disabled={garageLocked} onClick={() => onSort('wins')}>
          Wins {sortArrow('wins', winnersSort, winnersOrder)}
        </button>
        <button type="button" disabled={garageLocked} onClick={() => onSort('time')}>
          Best time {sortArrow('time', winnersSort, winnersOrder)}
        </button>
      </div>
    </header>
  );
};
