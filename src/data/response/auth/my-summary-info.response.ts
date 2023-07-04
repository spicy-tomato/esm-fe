import { Role } from 'src/data/models/user';

export type MySummaryInfoResponse = {
  id: string;
  fullName?: string;
  isMale?: boolean;
  department?: {
    id: string;
    faculty: {
      id: string;
      displayId: string;
      name: string;
    } | null;
  };
  faculty: {
    id: string;
    displayId: string;
    name: string;
  } | null;
  roles: (typeof Role)[keyof typeof Role][];
  phoneNumber?: string;
};
