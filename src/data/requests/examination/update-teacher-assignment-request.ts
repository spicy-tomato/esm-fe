export type UpdateTeacherAssignmentRequest = Record<
  string,
  {
    departmentId: string | null;
    userId: string | null;
    temporaryInvigilatorName: string | null;
  }
>;
