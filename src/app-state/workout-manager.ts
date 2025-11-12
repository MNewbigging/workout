import { SecondCountdownTimer } from "./second-countdown-timer";
import { Exercise } from "./types";
import { updater } from "./workout-updater";

export enum WorkoutStatus {
  Intro,
  Exercising,
  Resting,
  Paused, // Should this be here, or a separate bool? Would avoid prePauseStatus
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

  private readonly introLength = 3; // seconds
  private readonly exerciseLength = 4; // seconds
  private readonly restLength = 2; // seconds

  private prePauseStatus?: WorkoutStatus;

  constructor(private workout: Exercise[]) {}

  start() {
    // Setup timer for intro
    this.currentTimer = new SecondCountdownTimer(
      this.introLength,
      this.onTimerEnd
    );

    // Prep first exercise to show during intro countdown
    this.nextExercise = this.workout[0];
    updater.fire("started-workout");

    // Begin
    this.currentTimer.start();
  }

  pause() {
    if (this.status === WorkoutStatus.Finished) return;

    this.prePauseStatus = this.status;
    this.status = WorkoutStatus.Paused;
    this.currentTimer?.stop();
  }

  resume() {
    if (this.prePauseStatus !== undefined) this.status = this.prePauseStatus;
    this.currentTimer?.start();
  }

  private onTimerEnd = () => {
    console.log("on timer end");
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
      this.status = WorkoutStatus.Finished;
      this.currentTimer = undefined;
      updater.fire("finished-workout");
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
}
