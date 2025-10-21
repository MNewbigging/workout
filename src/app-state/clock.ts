export class Clock {
  private lastTime = 0;
  private running = true;

  start() {
    this.lastTime = performance.now();
    this.running = true;
  }

  stop() {
    this.running = false;
  }

  // Delta is between last time this was called and now
  getDeltaTime() {
    let diff = 0;

    if (!this.running) return 0;

    const newTime = performance.now();

    diff = (newTime - this.lastTime) / 1000;

    this.lastTime = newTime;

    return diff;
  }
}
