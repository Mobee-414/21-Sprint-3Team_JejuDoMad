export const MIN_GUEST_COUNT = 1;
export const MAX_GUEST_COUNT = 50;

export const isMinGuestCount = (guestCount: number) => {
  return guestCount <= MIN_GUEST_COUNT;
};

export const isMaxGuestCount = (guestCount: number) => {
  return guestCount >= MAX_GUEST_COUNT;
};

export const getNextGuestCount = (guestCount: number) => {
  return Math.min(guestCount + 1, MAX_GUEST_COUNT);
};

export const getPrevGuestCount = (guestCount: number) => {
  return Math.max(guestCount - 1, MIN_GUEST_COUNT);
};
