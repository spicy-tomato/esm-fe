export type GetAvailableInvigilatorsInShiftGroupVerifiedInvigilator = {
  id: string;
  fullName: string;
  invigilatorId: string | null;
  isPriority: boolean;
  phoneNumber: string;
  facultyName: string;
};

export type GetAvailableInvigilatorsInShiftGroupTemporaryInvigilator = {
  temporaryName: string;
  departmentId: string;
  isPriority: boolean;
};

export type GetAvailableInvigilatorsInShiftGroupResponseItem = Record<
  string,
  (
    | GetAvailableInvigilatorsInShiftGroupVerifiedInvigilator
    | GetAvailableInvigilatorsInShiftGroupTemporaryInvigilator
  )[]
>;
