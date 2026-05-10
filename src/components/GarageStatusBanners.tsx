import './GarageView.css';

type GarageStatusBannersProps = {
  banner: string | null;
  formError: string | null;
  status: 'idle' | 'loading' | 'error';
};

export const GarageStatusBanners = ({ banner, formError, status }: GarageStatusBannersProps) => (
  <>
    {banner ? <div className="garage__banner">{banner}</div> : null}
    {formError ? <div className="garage__error">{formError}</div> : null}
    {status === 'error' ? (
      <div className="garage__error">Unable to reach the garage API.</div>
    ) : null}
  </>
);
