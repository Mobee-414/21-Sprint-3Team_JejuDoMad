export const formatPrice = (value: string | number): string => {
  if (!value) return "";
  const num = String(value).replace(/[^\d]/g, "");
  return num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const parsePriceToNumber = (value: string): number => {
  const numString = value.replace(/,/g, "");
  return numString ? Number(numString) : 0;
};
