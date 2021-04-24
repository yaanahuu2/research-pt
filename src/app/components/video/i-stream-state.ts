export interface StreamState {
    playing: boolean;
    playerId: number | undefined;
    subsToggle: boolean;
    commsToggle: boolean;
    duration: number | undefined;
    currentTime: number | undefined;
    language: number;
    canplay: boolean;
    waiting: boolean,
    error: boolean;
  }
