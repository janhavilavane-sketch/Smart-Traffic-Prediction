
export enum TrafficStatus {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High'
}

export interface Route {
  id: string;
  name: string;
  status: TrafficStatus;
  duration: string;
  distance: string;
  reasoning: string;
  alternative?: boolean;
}

export interface TrafficDataPoint {
  time: string;
  congestion: number;
  predicted: number;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface LocationState {
  source: string;
  destination: string;
  weather?: string;
  isEmergency?: boolean;
}
