const randomByte = (): number => Math.floor(Math.random() * 256);

export const randomHexColor = (): string => {
  const r = randomByte().toString(16).padStart(2, '0');
  const g = randomByte().toString(16).padStart(2, '0');
  const b = randomByte().toString(16).padStart(2, '0');
  return `#${r}${g}${b}`;
};
