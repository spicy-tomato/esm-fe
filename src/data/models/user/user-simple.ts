export type UserSimple = {
  id: string;
  displayId: string | null;
  fullName: string;
  email: string;
  createdAt: Date;
  isMale: boolean;
  invigilatorId: string | null;
};
