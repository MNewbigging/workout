import { WorkoutManager, WorkoutStatus } from "../../app-state/workout-manager";
import { useUpdater } from "../hooks/use-updater";
import { ProgressBars } from "../progress-bars/progress-bars";
import { Timer } from "../timer/timer";
import "./workout-screen.scss";

interface WorkoutScreenProps {
  workoutManager: WorkoutManager;
}

export function WorkoutScreen({ workoutManager }: WorkoutScreenProps) {
  useUpdater("second-passed");

  const { status, currentExercise, currentTimer, nextExercise } =
    workoutManager;

  const showUpcoming =
    status === WorkoutStatus.Intro || status === WorkoutStatus.Resting;

  const nowOrNextText = showUpcoming ? "Next" : "Now";

  const showExercise = showUpcoming ? nextExercise : currentExercise;

  return (
    <>
      <ProgressBars workoutManager={workoutManager} />
      <div className="workout-screen">
        <div className="now-or-next">{nowOrNextText}:</div>
        <div className="exercise-name">{showExercise?.name}</div>
        <Timer workoutManager={workoutManager} />
      </div>
    </>
  );
}
