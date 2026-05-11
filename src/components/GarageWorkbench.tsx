import { GARAGE_PAGE_SIZE } from '../constants/config';
import type { Car } from '../types/models';
import { GarageCarList } from './GarageCarList';
import { GarageForms } from './GarageForms';
import { GarageRaceActions } from './GarageRaceActions';
import { GarageStatusBanners } from './GarageStatusBanners';
import { Pagination } from './Pagination';
import './GarageView.css';

type GarageWorkbenchProps = {
  total: number;
  banner: string | null;
  formError: string | null;
  status: 'idle' | 'loading' | 'error';
  garageLocked: boolean;
  garagePage: number;
  pageRaceActive: boolean;
  carIds: number[];
  cars: Car[];
  onFormError: (message: string | null) => void;
  onPageChange: (next: number) => void;
};

export const GarageWorkbench = ({
  total,
  banner,
  formError,
  status,
  garageLocked,
  garagePage,
  pageRaceActive,
  carIds,
  cars,
  onFormError,
  onPageChange,
}: GarageWorkbenchProps) => (
  <>
    <header className="garage__header">
      <h1>Garage</h1>
      <p className="garage__meta">Cars in garage: {total}</p>
    </header>
    <GarageStatusBanners banner={banner} formError={formError} status={status} />
    <GarageForms garageLocked={garageLocked} onFormError={onFormError} />
    <GarageRaceActions
      garageLocked={garageLocked}
      pageRaceActive={pageRaceActive}
      carIds={carIds}
      cars={cars}
    />
    {!cars.length ? (
      <div className="garage__empty">No cars here yet. Create one to get started.</div>
    ) : null}
    <GarageCarList cars={cars} garageLocked={garageLocked} />
    <Pagination
      page={garagePage}
      totalItems={total}
      pageSize={GARAGE_PAGE_SIZE}
      disabled={garageLocked}
      label="Garage pagination"
      onPageChange={onPageChange}
    />
  </>
);
