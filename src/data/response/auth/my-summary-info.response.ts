export type MySummaryInfoResponse = {
  id: string;
  fullName?: string;
  userName: string;
  email?: string;
  isMale?: boolean;
  createdAt?: string;
  teacherId?: string;
  department?: {
    id: string;
    displayId: string;
    name: string;
    faculty?: {
      id: string;
      displayId: string;
      name: string;
    };
  };
  faculty?: {
    id: string;
    displayId: string;
    name: string;
  };
  roles: string[];
  phoneNumber?: string;
};
