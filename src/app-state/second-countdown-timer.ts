import { updater } from "./workout-updater";

export class SecondCountdownTimer {
  secondsLeft: number;

  private intervalId = 0;

  constructor(private startSeconds: number, private onEnd: () => void) {
    this.secondsLeft = this.startSeconds;
  }

  isFinished() {
    return this.secondsLeft < 0;
  }

  start() {
    updater.fire("timer-started");
    this.intervalId = setInterval(this.tick, 1000); // calls tick every second
  }

  resume() {
    //
  }

  stop() {
    clearInterval(this.intervalId);
  }

  private tick = () => {
    this.secondsLeft--;

    if (this.isFinished()) {
      this.stop();
      this.onEnd();
    }

    updater.fire("second-passed");
  };
}
