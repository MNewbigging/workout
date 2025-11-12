import { WorkoutManager, WorkoutStatus } from "../../app-state/workout-manager";
import { useUpdater } from "../hooks/use-updater";
import "./progress-bars.scss";

/**
 * - pause/resume any progress bar animation in progress
 * - different lengths and colours
 *
 * - puts two bars either side of screen
 * - root is absolutely positioned; don't want to affect layout of other stuff
 *
 * - manages the bars and displays them
 * - listens for when timers start, then starts appropriate animation & colour
 */

interface ProgressBarsProps {
  workoutManager: WorkoutManager;
}

export function ProgressBars({ workoutManager }: ProgressBarsProps) {
  useUpdater("timer-started");

  const barClasses = ["bar"];

  // What timer just started?
  switch (workoutManager.status) {
    case WorkoutStatus.Intro:
      barClasses.push("intro");
      break;
    case WorkoutStatus.Resting:
      barClasses.push("rest");
      break;
    case WorkoutStatus.Paused:
      barClasses.push("pause");
      break;
    case WorkoutStatus.Exercising:
      barClasses.push("exercise");
      break;
  }

  return (
    <div key={workoutManager.status} className="progress-bars">
      <div className={"bar-trough"}>
        <div className={barClasses.join(" ")}></div>
      </div>
      <div className={"bar-trough"}>
        <div className={barClasses.join(" ")}></div>
      </div>
    </div>
  );
}
