export type ReservationStatus =
  | "pending"
  | "confirmed"
  | "declined"
  | "canceled"
  | "completed";

export interface ReservationActivity {
  id: number;
  title: string;
  bannerImageUrl: string;
}

export interface MyReservationItem {
  id: number;
  teamId: string;
  userId: number;
  activity: ReservationActivity;
  scheduleId: number;
  status: ReservationStatus;
  reviewSubmitted: boolean;
  totalPrice: number;
  headCount: number;
  date: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
}