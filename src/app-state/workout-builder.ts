import { deadBug } from "./exercises";
import { Exercise, ExerciseCategory } from "./types";

export function BuildWorkout() {
  // Starts with 3 warmups
  const exercises: Exercise[] = [];

  deadBug.category = ExerciseCategory.Hold;

  // Leaves 12 slots to fill; 4 each of upper, core and lower

  return exercises;
}
