export interface MediaItem {
  url: string;
  name: string;
}

export interface CampaignData {
  title: string;
  description: string;
  category: string;
  donationTarget: number;
  media: MediaItem[];
  documents: File[];
  schoolName?: string;
  location?: string;
}

export interface CreateCampaignStep {
  id: number;
  title: string;
  description: string;
}

export interface CreateCampaignProps {
  initialStep?: number;
}
