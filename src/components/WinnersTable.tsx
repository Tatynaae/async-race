import type { WinnerTableRow } from '../types/models';
import { WINNERS_PAGE_SIZE } from '../constants/config';
import { CarIcon } from './CarIcon';
import './WinnersView.css';

type WinnersTableProps = {
  rows: WinnerTableRow[];
  page: number;
};

export const WinnersTable = ({ rows, page }: WinnersTableProps) => {
  return (
    <div className="winners__table-wrapper">
      <table className="winners__table">
        <thead>
          <tr>
            <th>№</th>
            <th>Car</th>
            <th>Name</th>
            <th>Wins</th>
            <th>Best time (s)</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={row.id}>
              <td>{(page - 1) * WINNERS_PAGE_SIZE + idx + 1}</td>
              <td>
                <CarIcon color={row.color} />
              </td>
              <td>{row.name}</td>
              <td>{row.wins}</td>
              <td>{row.time.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
