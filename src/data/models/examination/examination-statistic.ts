export type ExaminationStatistic = {
  id: string;
  displayId: string;
  name: string;
  startAt: string;
  endAt: string;
  timePercent: number;
  numberOfModules: number;
  numberOfModulesOver: number;
  numberOfShifts: number;
  numberOfShiftsOver: number;
  numberOfCandidates: number;
  numberOfInvigilators: number;
};
