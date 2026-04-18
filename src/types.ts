export interface Point {
  x: number;
  y: number;
}

export enum GameState {
  IDLE = 'IDLE',
  PLAYING = 'PLAYING',
  GAME_OVER = 'GAME_OVER',
}

export interface Track {
  id: string;
  title: string;
  artist: string;
  url: string;
  duration: number; // in seconds
  coverUrl: string;
}
