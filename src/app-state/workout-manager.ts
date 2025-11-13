import { SecondCountdownTimer } from "./second-countdown-timer";
import { Exercise } from "./types";
import { updater } from "./workout-updater";

export enum WorkoutStatus {
  Intro,
  Exercising,
  Resting,
  Finished,
}

/**
 * - tracking current / next exercise
 * - counting down timers
 * - update loop every second
 * - updating components
 * - timer animations
 */

export class WorkoutManager {
  status = WorkoutStatus.Intro;

  currentExercise?: Exercise;
  nextExercise?: Exercise;

  currentTimer?: SecondCountdownTimer;

  // If these are changed, must also update progress-bars.scss anim times
  private readonly introLength = 10; // seconds
  private readonly exerciseLength = 4; // seconds
  private readonly restLength = 2; // seconds

  private wakeLock?: any;

  constructor(private workout: Exercise[]) {}

  async start() {
    // Setup timer for intro
    this.currentTimer = new SecondCountdownTimer(
      this.introLength,
      this.onTimerEnd
    );

    // Prep first exercise to show during intro countdown
    this.nextExercise = this.workout[0];
    updater.fire("started-workout");

    // Screen stuff
    this.wakeLock = await this.getWakeLock();
    document.body.addEventListener(
      "fullscreenerror",
      this.onRequestFullscreenError
    );
    this.requestFullscreen();

    // Begin
    this.currentTimer.start();
  }

  pause() {
    if (this.status === WorkoutStatus.Finished) return;
    this.currentTimer?.pause();
    this.wakeLock?.release();
    this.exitFullscreen();
  }

  async resume() {
    this.wakeLock = await this.getWakeLock();
    this.requestFullscreen();
    this.currentTimer?.resume();
  }

  private async getWakeLock(): Promise<WakeLockSentinel | undefined> {
    const anyNav: any = navigator;
    if ("wakeLock" in navigator) {
      const wakeLock = await anyNav["wakeLock"].request("screen");
      return wakeLock;
    }

    return undefined;
  }

  private requestFullscreen() {
    //document.body.requestFullscreen();
  }

  private exitFullscreen() {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  }

  private onRequestFullscreenError = () => {
    // Try again in a second
    setTimeout(() => {
      // It might have been paused since
      if (!this.currentTimer?.paused) this.requestFullscreen();
    }, 1000);
  };

  private onTimerEnd = () => {
    switch (this.status) {
      case WorkoutStatus.Intro:
      case WorkoutStatus.Resting:
        this.finishRestTimer();
        break;
      case WorkoutStatus.Exercising:
        this.finishExerciseTimer();
        break;
    }
  };

  private finishRestTimer() {
    this.setNextExercise();
    this.status = WorkoutStatus.Exercising;
    this.currentTimer = new SecondCountdownTimer(
      this.exerciseLength,
      this.onTimerEnd
    );
    this.currentTimer.start();
  }

  private finishExerciseTimer() {
    // Was this the last exercise?
    if (!this.workout.length) {
      this.onFinish();
    } else {
      this.status = WorkoutStatus.Resting;
      this.currentTimer = new SecondCountdownTimer(
        this.restLength,
        this.onTimerEnd
      );
      this.currentTimer.start();
    }
  }

  private setNextExercise() {
    this.currentExercise = this.workout.shift();
    // Current might be the last exercise...
    if (this.workout.length) {
      this.nextExercise = this.workout[0];
    }
  }

  private onFinish() {
    this.status = WorkoutStatus.Finished;
    this.currentTimer = undefined;
    const audio = new Audio("/audio/confirmation_002.ogg");
    audio.play();
    updater.fire("finished-workout");
  }
}
