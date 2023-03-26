export type GetAvailableInvigilatorsInShiftGroupResponseItem = Record<
  string,
  {
    id: string;
    fullName: string;
    invigilatorId: string | null;
    isPriority: boolean;
    phoneNumber: string;
    facultyName: string;
  }[]
>;
