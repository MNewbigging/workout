import { Clock } from "./clock";
import { CountdownTimer } from "./countdown-timer";
import { Exercise } from "./types";
import { updater } from "./workout-updater";

export enum WorkoutStatus {
  Intro,
  Exercising,
  Resting,
  Paused,
  Finished,
}

export class WorkoutManager {
  currentExercise?: Exercise;
  nextExercise?: Exercise;

  currentTimer?: CountdownTimer;

  status = WorkoutStatus.Intro;

  private readonly introLength = 3; // seconds
  private readonly exerciseLength = 40; // seconds
  private readonly restLength = 20; // seconds

  private clock = new Clock();
  private lastUpdateSeconds = 0;

  private prePauseStatus?: WorkoutStatus;
  private updateId = 0;

  constructor(private workout: Exercise[]) {}

  start() {
    // Setup timer for intro
    this.currentTimer = new CountdownTimer(this.introLength);

    // Prep first exercise to show during intro countdown
    this.nextExercise = this.workout[0];
    updater.fire("started-workout");

    this.clock.start();
    this.update();
  }

  pause() {
    if (this.status === WorkoutStatus.Finished) return;

    this.clock.stop();
    cancelAnimationFrame(this.updateId);
    this.prePauseStatus = this.status;
    this.status = WorkoutStatus.Paused;
  }

  resume() {
    if (this.prePauseStatus !== undefined) this.status = this.prePauseStatus;
    this.clock.start();
    this.update();
  }

  update = () => {
    this.updateId = requestAnimationFrame(this.update);

    const dt = this.clock.getDeltaTime();

    this.currentTimer?.update(dt);

    if (this.currentTimer?.isFinished()) {
      this.onTimerEnd();
    }

    // Update UI every second
    if (this.lastUpdateSeconds < this.clock.elapsedSeconds) {
      this.lastUpdateSeconds = this.clock.elapsedSeconds;
      updater.fire("second-passed");
    }
  };

  private onTimerEnd() {
    switch (this.status) {
      case WorkoutStatus.Intro:
      case WorkoutStatus.Resting:
        this.finishRestTimer();
        break;
      case WorkoutStatus.Exercising:
        this.finishExerciseTimer();
        break;
    }
  }

  private finishRestTimer() {
    this.setNextExercise();
    this.status = WorkoutStatus.Exercising;
    this.currentTimer = new CountdownTimer(this.exerciseLength);
  }

  private finishExerciseTimer() {
    // Was this the last exercise?
    if (!this.workout.length) {
      this.status = WorkoutStatus.Finished;
      updater.fire("finished-workout");
      this.currentTimer = undefined;
    } else {
      this.status = WorkoutStatus.Resting;
      this.currentTimer = new CountdownTimer(this.restLength);
    }
  }

  private setNextExercise() {
    this.currentExercise = this.workout.shift();
    // Current might be the last exercise...
    if (this.workout.length) {
      this.nextExercise = this.workout[0];
    }

    // this.exerciseTimer = this.exerciseLength;
    // this.restTimer = this.restLength;
  }
}
