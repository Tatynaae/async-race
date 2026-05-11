import { useCallback, useEffect } from 'react';
import { WINNERS_PAGE_SIZE } from '../constants/config';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setWinnersPage } from '../store/slices/uiSlice';
import { loadWinners } from '../store/thunks/winnersThunks';
import { Pagination } from './Pagination';
import { WinnersTable } from './WinnersTable';
import { WinnersToolbar } from './WinnersToolbar';
import './WinnersView.css';

export const WinnersView = () => {
  const dispatch = useAppDispatch();
  const { rows, total, status } = useAppSelector((s) => s.winners);
  const { winnersPage, winnersSort, winnersOrder } = useAppSelector((s) => s.ui);
  const race = useAppSelector((s) => s.race);
  const garageLocked = race.pageRaceActive;

  useEffect(() => {
    dispatch(loadWinners()).catch(() => undefined);
  }, [dispatch, winnersPage, winnersSort, winnersOrder]);

  const pageChange = useCallback(
    (next: number) => {
      dispatch(setWinnersPage(next));
    },
    [dispatch],
  );

  return (
    <section className="winners">
      <WinnersToolbar garageLocked={garageLocked} />
      {status === 'error' && <div className="winners__error">Unable to reach the winners API.</div>}
      <WinnersTable rows={rows} page={winnersPage} />
      {!rows.length && (
        <div className="winners__empty">No winners yet. Finish a race in the garage.</div>
      )}
      <Pagination
        page={winnersPage}
        totalItems={total}
        pageSize={WINNERS_PAGE_SIZE}
        disabled={garageLocked}
        label="Winners pagination"
        onPageChange={pageChange}
      />
    </section>
  );
};
