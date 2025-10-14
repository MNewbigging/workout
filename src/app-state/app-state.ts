import { buildWorkout } from "./workout-builder";
import { WorkoutManager } from "./workout-manager";

class AppState {
  workoutManager?: WorkoutManager;

  startNewWorkout() {
    const workout = buildWorkout();
    this.workoutManager = new WorkoutManager(workout);
    this.workoutManager.start();
  }
}

export const appState = new AppState();
