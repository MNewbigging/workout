import { updater } from "./workout-updater";

export class SecondCountdownTimer {
  secondsLeft: number;
  paused = false;

  private intervalId = 0;
  private tickAudio: HTMLAudioElement;

  constructor(private startSeconds: number, private onEnd: () => void) {
    this.secondsLeft = this.startSeconds;
    this.tickAudio = new Audio("/audio/glass_005.ogg");
    this.tickAudio.volume = 1;
  }

  isFinished() {
    return this.secondsLeft < 0;
  }

  start() {
    this.intervalId = setInterval(this.tick, 1000); // calls tick every second
    updater.fire("timer-started");
  }

  resume() {
    this.intervalId = setInterval(this.tick, 1000);
    this.paused = false;
    updater.fire("resumed-workout");
  }

  pause() {
    clearInterval(this.intervalId);
    this.paused = true;
    updater.fire("paused-workout");
  }

  stop() {
    clearInterval(this.intervalId);
  }

  private tick = () => {
    this.secondsLeft--;

    if (this.secondsLeft <= 3 && this.secondsLeft >= 0) {
      this.tickAudio.play();
    }

    if (this.isFinished()) {
      this.stop();
      this.onEnd();
    }

    updater.fire("second-passed");
  };
}
