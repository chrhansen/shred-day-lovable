export interface SkiDay {
  id?: string;
  date: Date;
  resort: string;
  ski: string;
  activity: string;
  photoCount?: number; // Number of photos for this ski day
  photos?: string[]; // Photo URLs
  notes?: string;
  shared_at?: Date | null; // Timestamp when sharing was enabled
  user?: {
    username: string;
    avatar_url?: string | null;
    display_name: string;
  };
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

export interface TextDraftDay {
  id: string;
  date: Date;
  resort: string;
  originalText: string;
  action: "merge" | "duplicate" | "skip";
  status: "pending" | "processed";
}

export interface SkiPhoto {
  id: string;
  url: string;
  date: Date;
  resort: string;
  status: "pending" | "accepted" | "rejected";
  isStripped?: boolean; // Flag for photos with stripped EXIF data
}
