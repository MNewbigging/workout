import { buildWorkout } from "./workout-builder";
import { getUrl, WorkoutManager } from "./workout-manager";
import { updater } from "./workout-updater";

class AppState {
  workoutManager?: WorkoutManager;

  startNewWorkout() {
    const audio = new Audio(getUrl("/audio/confirmation_001.ogg"));
    const workout = buildWorkout();
    this.workoutManager = new WorkoutManager(workout);
    this.workoutManager.start();
    try {
      audio.play();
    } catch (e) {
      console.error(e);
    }
  }

  finishWorkout() {
    this.workoutManager = undefined;
    const audio = new Audio(getUrl("/audio/confirmation_003.ogg"));
    audio.play();
    updater.fire("return-to-landing-page");
  }
}

export const appState = new AppState();
