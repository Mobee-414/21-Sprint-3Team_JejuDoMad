export interface ActivityRequest {
  title: string;
  category: string;
  description: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  subImageUrls: string[];
  schedules: {
    date: string;
    startTime: string;
    endTime: string;
  }[];
}
