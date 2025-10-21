import { WorkoutManager, WorkoutStatus } from "../../app-state/workout-manager";
import { useUpdater } from "../hooks/use-updater";
import { RingTimer } from "./ring-timer/ring-timer";
import "./workout-screen.scss";

interface WorkoutScreenProps {
  workoutManager: WorkoutManager;
}

export function WorkoutScreen({ workoutManager }: WorkoutScreenProps) {
  useUpdater("second-passed");

  const {
    status,
    currentExercise,
    nextExercise,
    introTimer,
    exerciseTimer,
    restTimer,
  } = workoutManager;

  const showUpcoming =
    status === WorkoutStatus.Intro || status === WorkoutStatus.Resting;

  const nowOrNextText = showUpcoming ? "Next" : "Now";

  const showExercise = showUpcoming ? nextExercise : currentExercise;

  let showTimer = exerciseTimer;
  if (status === WorkoutStatus.Intro) showTimer = introTimer;
  else if (status === WorkoutStatus.Resting) showTimer = restTimer;

  return (
    <div className="workout-screen">
      <RingTimer />
      <div className="now-or-next">{nowOrNextText}:</div>
      <div className="exercise-name">{showExercise?.name}</div>
      <div className="timer">{showTimer}</div>
    </div>
  );
}
