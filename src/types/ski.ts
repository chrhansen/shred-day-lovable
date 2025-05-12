
export interface SkiDay {
  id?: string;
  date: Date;
  resort: string;
  ski: string;
  activity: string;
}

export interface SkiStats {
  totalDays: number;
  uniqueResorts: number;
  mostUsedSki: string;
}

export interface DraftDay {
  id: string;
  date: Date;
  resort: string;
  photoCount: number;
  status: "pending" | "accepted" | "rejected";
  photos?: string[]; // URLs to photos
}

export interface SkiPhoto {
  id: string;
  url: string;
  date: Date;
  resort: string;
  status: "pending" | "accepted" | "rejected";
}
