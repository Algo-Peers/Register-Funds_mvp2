export interface CampaignData {
  title: string;
  description: string;
  category: string;
  donationTarget: number;
  media: File[];
  documents: File[];
  schoolName?: string;
  location?: string;
}

export interface ChatMessage {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

export interface CampaignChatProps {
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
  placeholder?: string;
}

export interface CampaignPreviewProps {
  campaignData: CampaignData;
  onEdit?: () => void;
  onSaveDraft?: () => void;
  onLaunch?: () => void;
}

export interface LayoutProps {
  children?: React.ReactNode;
  showSidebar?: boolean;
  showHeader?: boolean;
}

export interface CreateCampaignStep {
  id: number;
  title: string;
  component: React.ComponentType<any>;
  isCompleted: boolean;
}

export type ViewMode = 'chat-with-preview' | 'chat-only' | 'preview-only' | 'full-form';

export interface CreateCampaignProps {
  initialStep?: number;
  initialViewMode?: ViewMode;
}