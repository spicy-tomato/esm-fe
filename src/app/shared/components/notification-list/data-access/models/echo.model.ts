export const messageEvent = ['.notification-created'] as const;
export type MessageEvent = typeof messageEvent[number];

export type EchoMessage = {
  id: number;
  data: {
    content: string;
  };
  type: number;
  createdAt: string;
  updatedAt: string;
  readAt: Date | null;
  sender: string;
};
