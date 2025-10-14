import { buildWorkout } from "./workout-builder";
import { WorkoutManager } from "./workout-manager";
import { updater } from "./workout-updater";

class AppState {
  workoutManager?: WorkoutManager;

  startNewWorkout() {
    const workout = buildWorkout();
    this.workoutManager = new WorkoutManager(workout);
    this.workoutManager.start();
  }

  finishWorkout() {
    this.workoutManager = undefined;
    updater.fire("return-to-landing-page");
  }
}

export const appState = new AppState();
