export type AppView = 'garage' | 'winners';

export type WinnerSortField = 'id' | 'wins' | 'time';

export type SortOrder = 'ASC' | 'DESC';

export type Car = {
  id: number;
  name: string;
  color: string;
};

export type Winner = {
  id: number;
  wins: number;
  time: number;
};

export type WinnerTableRow = Winner & {
  name: string;
  color: string;
};

export type EngineStartedResponse = {
  velocity: number;
  distance: number;
};

export type EngineDriveResponse = {
  success: boolean;
};
