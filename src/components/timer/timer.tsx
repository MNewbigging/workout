import { CSSProperties } from "react";
import { WorkoutManager } from "../../app-state/workout-manager";
import "./timer.scss";
import { useUpdater } from "../hooks/use-updater";

interface TimerProps {
  workoutManager: WorkoutManager;
}

export function Timer({ workoutManager }: TimerProps) {
  useUpdater("paused-workout", "resumed-workout");

  const paused = workoutManager.currentTimer?.paused;
  const animStyle: CSSProperties = {
    animationPlayState: paused ? "paused" : "running",
    animationName: paused ? "" : "swell", // remove completely because we do a new second on resume
  };

  return (
    <div className="timer" style={animStyle}>
      {workoutManager.currentTimer?.secondsLeft}
    </div>
  );
}
