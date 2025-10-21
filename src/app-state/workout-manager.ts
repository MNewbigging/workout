import { Exercise } from "./types";
import { updater } from "./workout-updater";

export enum WorkoutStatus {
  Intro,
  Active,
  Resting,
  Paused,
  Finished,
}

export class WorkoutManager {
  introTimer: number; // seconds
  currentExercise?: Exercise;
  nextExercise?: Exercise;
  exerciseTimer: number;
  restTimer: number;
  status = WorkoutStatus.Intro;

  private readonly introLength = 1; // seconds
  private readonly exerciseLength = 40; // seconds
  private readonly restLength = 20; // seconds

  private clockId = 0;
  private prePauseStatus?: WorkoutStatus;

  constructor(private workout: Exercise[]) {
    this.introTimer = this.introLength;
    this.exerciseTimer = this.exerciseLength;
    this.restTimer = this.restLength;
  }

  start() {
    // Prep first exercise to show during intro countdown
    this.nextExercise = this.workout[0];
    updater.fire("started-workout");

    this.clockId = setInterval(this.onSecondPassed, 1000);
  }

  pause() {
    if (this.status === WorkoutStatus.Finished) return;

    clearInterval(this.clockId);
    this.prePauseStatus = this.status;
    this.status = WorkoutStatus.Paused;
  }

  resume() {
    if (this.prePauseStatus !== undefined) this.status = this.prePauseStatus;
    this.clockId = setInterval(this.onSecondPassed, 1000);
  }

  private onSecondPassed = () => {
    switch (this.status) {
      case WorkoutStatus.Intro:
        this.handleIntroSecond();
        break;
      case WorkoutStatus.Active:
        this.handleActiveSecond();
        break;
      case WorkoutStatus.Resting:
        this.handleRestingSecond();
        break;
    }

    // Fire a single ui update event every second after all logic has taken place
    updater.fire("second-passed");
  };

  private handleIntroSecond() {
    this.introTimer--;

    if (this.introTimer < 0) {
      this.setNextExercise();
      this.status = WorkoutStatus.Active;
    }
  }

  private handleActiveSecond() {
    this.exerciseTimer--;

    if (this.exerciseTimer < 0) {
      // Don't bother with rest stage when finishing the last workout
      if (!this.workout.length) {
        this.status = WorkoutStatus.Finished;
        updater.fire("finished-workout");
        clearInterval(this.clockId); // stop the clock
      } else {
        this.status = WorkoutStatus.Resting;
      }
    }
  }

  private handleRestingSecond() {
    this.restTimer--;

    if (this.restTimer < 0) {
      this.setNextExercise();
      this.status = WorkoutStatus.Active;
    }
  }

  private setNextExercise() {
    this.currentExercise = this.workout.shift();
    // Current might be the last exercise...
    if (this.workout.length) {
      this.nextExercise = this.workout[0];
    }

    this.exerciseTimer = this.exerciseLength;
    this.restTimer = this.restLength;
  }
}
