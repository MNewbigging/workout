import { Exercise } from "./types";
import { updater } from "./ui-updater";

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

  private readonly introLength = 3; // seconds
  private readonly exerciseLength = 40; // seconds
  private readonly restLength = 20; // seconds

  private status = WorkoutStatus.Intro;
  private clockId = 0;

  constructor(private workout: Exercise[]) {
    this.introTimer = this.introLength;
    this.exerciseTimer = this.exerciseLength;
    this.restTimer = this.restLength;
  }

  start() {
    // Prep first exercise to show during intro countdown
    this.nextExercise = this.workout[0];
    updater.fire("start");

    this.clockId = setInterval(this.onSecondPassed, 1000);
  }

  pause() {
    clearInterval(this.clockId);
    this.status = WorkoutStatus.Paused;
    // todo should I fire ui update event here??
  }

  resume() {
    this.clockId = setInterval(this.onSecondPassed, 1000);
    // todo fire ui update event?
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

    if (this.introTimer === 0) {
      this.setNextExercise();
      this.status = WorkoutStatus.Active;
    }
  }

  private handleActiveSecond() {
    this.exerciseTimer--;

    if (this.exerciseTimer === 0) {
      // Don't bother with rest stage when finishing the last workout
      if (!this.workout.length) {
        this.status = WorkoutStatus.Finished;
      } else {
        this.status = WorkoutStatus.Resting;
      }
    }
  }

  private handleRestingSecond() {
    this.restTimer--;

    if (this.restTimer === 0) {
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

// ui update events: do I just need a second-passed event?
