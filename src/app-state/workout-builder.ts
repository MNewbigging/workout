import { getExerciseByName, getExercisesByTarget } from "./exercises";
import { Exercise, ExerciseTarget } from "./types";

export function buildWorkout() {
  const catCow = getExerciseByName("Cat Cow");
  const deadBug = getExerciseByName("Dead Bug");
  const gluteBridge = getExerciseByName("Glute Bridge");

  const workout: Exercise[] = [catCow, deadBug, gluteBridge];

  return workout;

  // Leaves 12 slots to fill; 4 each of upper, core and lower
  const uppers = getExercisesByTarget(ExerciseTarget.Upper);
  const cores = getExercisesByTarget(ExerciseTarget.Core);
  const lowers = getExercisesByTarget(ExerciseTarget.Lower);

  for (let i = 0; i < 4; i++) {
    // Pick an upper
    const upperRnd = Math.floor(Math.random() * uppers.length);
    const upper = uppers.splice(upperRnd, 1)[0];
    workout.push(upper);

    // Pick a core
    const coreRnd = Math.floor(Math.random() * cores.length);
    const core = cores.splice(coreRnd, 1)[0]; // remove from array so no dupes show up
    workout.push(core);

    // Pick a lower
    const lowerRnd = Math.floor(Math.random() * lowers.length);
    const lower = lowers.splice(lowerRnd, 1)[0];
    workout.push(lower);
  }

  return workout;
}
