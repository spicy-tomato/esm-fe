export type CreateUserRequest = {
  email: string;
  invigilatorId: string | null;
  fullName: string;
  isMale: boolean;
};
