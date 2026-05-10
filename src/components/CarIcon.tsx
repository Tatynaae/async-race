type CarIconProps = {
  color: string;
  label: string;
};

export const CarIcon = ({ color, label }: CarIconProps) => (
  <svg
    className="car-icon"
    width="96"
    height="48"
    viewBox="0 0 96 48"
    role="img"
    aria-label={label}
  >
    <rect x="6" y="18" width="72" height="18" rx="6" fill={color} />
    <rect x="58" y="10" width="26" height="14" rx="4" fill={color} />
    <circle cx="22" cy="36" r="7" fill="#111827" />
    <circle cx="70" cy="36" r="7" fill="#111827" />
    <circle cx="22" cy="36" r="3" fill="#e5e7eb" />
    <circle cx="70" cy="36" r="3" fill="#e5e7eb" />
  </svg>
);
