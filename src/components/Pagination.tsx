import './Pagination.css';

type PaginationProps = {
  page: number;
  totalItems: number;
  pageSize: number;
  disabled: boolean;
  label: string;
  onPageChange: (next: number) => void;
};

const totalPages = (total: number, size: number) => Math.max(1, Math.ceil(total / size));

export const Pagination = ({
  page,
  totalItems,
  pageSize,
  disabled,
  label,
  onPageChange,
}: PaginationProps) => {
  const pages = totalPages(totalItems, pageSize);
  const prev = () => onPageChange(Math.max(1, page - 1));
  const next = () => onPageChange(Math.min(pages, page + 1));
  return (
    <div className="pagination" aria-label={label}>
      <button type="button" disabled={disabled || page <= 1} onClick={prev}>
        Prev
      </button>
      <span className="pagination__meta">
        Page {page} / {pages}
      </span>
      <button type="button" disabled={disabled || page >= pages} onClick={next}>
        Next
      </button>
    </div>
  );
};
