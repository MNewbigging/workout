import { buildWorkout } from "./workout-builder";

class AppState {
  prepWorkout() {
    const workout = buildWorkout();
    console.log("workout", workout);
  }
}

export const appState = new AppState();
