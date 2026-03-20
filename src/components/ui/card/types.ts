export interface CardProps {
  id?: number;
  userId?: number;
  title: string;
  description?: string;
  category?: string;
  price: number;
  address?: string;
  bannerImageUrl: string;
  rating: number;
  reviewCount: number;
  createdAt?: string;
  updatedAt?: string;
  className?: string;
}

export type ReservationStatus =
  | "pending"
  | "confirmed"
  | "declined"
  | "canceled"
  | "completed";

export interface MyReservationItem {
  activity: {
    id: number;
    title: string;
    bannerImageUrl: string;
  };
  scheduleId: number;
  id: number;
  // nickname: string;
  teamId: string;
  userId: number;
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

export interface MyActivity {
  id: number;
  userId: number;
  title: string;
  description: string;
  category: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
  subImages?: MySubImage[];
  schedules?: MySchedule[];
}

export interface MySubImage {
  id: number;
  imageUrl: string;
}

export interface MySchedule {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
}
