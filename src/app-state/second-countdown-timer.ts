import { getUrl } from "./workout-manager";
import { updater } from "./workout-updater";

export class SecondCountdownTimer {
  secondsLeft: number;
  paused = false;

  private intervalId = 0;
  private tickAudio: HTMLAudioElement;
  private glassAudio: HTMLAudioElement;
  private stopAudio: HTMLAudioElement;

  constructor(private startSeconds: number, private onEnd: () => void) {
    this.secondsLeft = this.startSeconds;
    this.tickAudio = new Audio(getUrl("/audio/tick_001.ogg"));
    this.glassAudio = new Audio(getUrl("/audio/glass_005.ogg"));
    this.stopAudio = new Audio(getUrl("/audio/glass_004.ogg"));
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
    this.stopAudio.play();
  }

  private tick = () => {
    this.secondsLeft--;

    if (this.secondsLeft >= 0) {
      if (this.secondsLeft <= 3) this.glassAudio.play();
      else this.tickAudio.play();
    }

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
