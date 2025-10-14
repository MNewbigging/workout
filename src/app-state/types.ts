export enum ExerciseCategory {
  Warmup,
  Hold,
  Repetition,
}

export enum ExerciseTarget {
  Upper,
  Core,
  Lower,
}

export interface Exercise {
  name: string;
  category: ExerciseCategory;
  target: ExerciseTarget;
}

export interface Workout {
  exercises: Exercise[];
}
