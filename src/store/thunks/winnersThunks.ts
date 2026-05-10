import type { AppDispatch, RootState } from '../store';
import { winnersFailed, winnersLoaded, winnersLoading } from '../slices/winnersSlice';
import { fetchCar } from '../../api/garageApi';
import { fetchWinnersPage } from '../../api/winnersApi';
import { WINNERS_PAGE_SIZE } from '../../constants/config';
import type { Winner, WinnerTableRow } from '../../types/models';

const enrichRows = async (page: Winner[]): Promise<WinnerTableRow[]> => {
  const pairs = await Promise.all(
    page.map(async (winner) => {
      const car = await fetchCar(winner.id);
      const name = car?.name ?? `Car #${winner.id}`;
      const color = car?.color ?? '#999999';
      return { ...winner, name, color };
    }),
  );
  return pairs;
};

export const loadWinners = () => async (dispatch: AppDispatch, getState: () => RootState) => {
  const {
    ui: { winnersPage, winnersSort, winnersOrder },
  } = getState();
  dispatch(winnersLoading());
  try {
    const { winners, total } = await fetchWinnersPage(
      winnersPage,
      WINNERS_PAGE_SIZE,
      winnersSort,
      winnersOrder,
    );
    const rows = await enrichRows(winners);
    dispatch(winnersLoaded({ rows, total }));
  } catch {
    dispatch(winnersFailed());
  }
};
