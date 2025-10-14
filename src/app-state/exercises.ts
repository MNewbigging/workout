import { Exercise, ExerciseCategory, ExerciseTarget } from "./types";

export const exercises: Exercise[] = [
  // Warmups
  {
    name: "Dead Bug",
    category: ExerciseCategory.Warmup,
    target: ExerciseTarget.Core,
  },
  {
    name: "Glute Bridge",
    category: ExerciseCategory.Warmup,
    target: ExerciseTarget.Core,
  },
  {
    name: "Cat Cow",
    category: ExerciseCategory.Warmup,
    target: ExerciseTarget.Upper,
  },
  // Holds
  {
    name: "Plank",
    category: ExerciseCategory.Hold,
    target: ExerciseTarget.Core,
  },
  {
    name: "Superman",
    category: ExerciseCategory.Hold,
    target: ExerciseTarget.Core,
  },
  {
    name: "V Pose",
    category: ExerciseCategory.Hold,
    target: ExerciseTarget.Core,
  },
  // Repetitions
  {
    name: "Push Up",
    category: ExerciseCategory.Repetition,
    target: ExerciseTarget.Upper,
  },
  {
    name: "Walk Out Push Up",
    category: ExerciseCategory.Repetition,
    target: ExerciseTarget.Upper,
  },
  {
    name: "Plank Walk",
    category: ExerciseCategory.Repetition,
    target: ExerciseTarget.Upper,
  },
  {
    name: "Plank Shoulder Tap",
    category: ExerciseCategory.Repetition,
    target: ExerciseTarget.Upper,
  },
  {
    name: "Prone Pull Up",
    category: ExerciseCategory.Repetition,
    target: ExerciseTarget.Upper,
  },
  {
    name: "Crunch",
    category: ExerciseCategory.Repetition,
    target: ExerciseTarget.Core,
  },
  {
    name: "Flutter Kicks",
    category: ExerciseCategory.Repetition,
    target: ExerciseTarget.Core,
  },
  {
    name: "V-Ups",
    category: ExerciseCategory.Repetition,
    target: ExerciseTarget.Core,
  },
  {
    name: "Lunge",
    category: ExerciseCategory.Repetition,
    target: ExerciseTarget.Lower,
  },
  {
    name: "Pendulum Lunge",
    category: ExerciseCategory.Repetition,
    target: ExerciseTarget.Lower,
  },
  {
    name: "Squat",
    category: ExerciseCategory.Repetition,
    target: ExerciseTarget.Lower,
  },
  {
    name: "Side Squat",
    category: ExerciseCategory.Repetition,
    target: ExerciseTarget.Lower,
  },
  {
    name: "Glute Marches",
    category: ExerciseCategory.Repetition,
    target: ExerciseTarget.Lower,
  },
];

export function getExerciseByName(name: string): Exercise {
  return exercises.find((exercise) => exercise.name === name)!;
}

export function getExercisesByTarget(target: ExerciseTarget) {
  return exercises.filter((exercise) => exercise.target === target);
}
