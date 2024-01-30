export interface VideoPlayer {
  playVideo(): void;
  pauseVideo(): void;
  muteVideo(): void;
  unMuteVideo(): void;

  isPlaying: boolean;
}
