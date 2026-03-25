export interface ActivityBasicDto {
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
}

export interface GetMyActivitiesResponse {
  cursorId: number | null;
  totalCount: number;
  activities: ActivityBasicDto[];
}

export interface Schedule {
  date: string;
  startTime: string;
  endTime: string;
}

export interface ActivityRequest {
  title: string;
  category: string;
  description: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  subImageUrls: string[];
  schedules: Schedule[];
}
