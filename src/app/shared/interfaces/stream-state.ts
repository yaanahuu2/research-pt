export interface StreamState {
    playing: boolean;
    playerId: number | undefined;
    readableCurrentTime: string;
    readableDuration: string;
    duration: number | undefined;
    currentTime: number | undefined;
    canplay: boolean;
    error: boolean;
  }
