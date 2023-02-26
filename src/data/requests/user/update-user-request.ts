export type UpdateUserRequest = {
  email: string;
  invigilatorId: string | null;
  fullName: string;
  isMale: boolean;
  departmentId: string;
};
