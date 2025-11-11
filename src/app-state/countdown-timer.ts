export class CountdownTimer {
  time: number;

  constructor(private startTime: number) {
    this.time = startTime;
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
