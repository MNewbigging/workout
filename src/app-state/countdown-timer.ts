export class CountdownTimer {
  time: number;

  constructor(private startTime: number) {
    this.time = startTime;
  }

  get seconds() {
    return Math.ceil(this.time);
  }

  reset() {
    this.time = this.startTime;
  }

  isFinished() {
    return this.time <= 0;
  }

  update(dt: number) {
    this.time -= dt;
  }
}
