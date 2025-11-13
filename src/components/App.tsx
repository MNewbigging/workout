import { ReactElement } from "react";
import { appState } from "../app-state/app-state";
import "./app.scss";
import { useUpdater } from "./hooks/use-updater";
import { StartScreen } from "./start-screen/start-screen";
import { WorkoutScreen } from "./workout-screen/workout-screen";
import { WorkoutStatus } from "../app-state/workout-manager";
import { FinishedScreen } from "./finished-screen/finished-screen";

export function App() {
  useUpdater("started-workout", "finished-workout", "return-to-landing-page");

  function onTouch() {
    const { workoutManager } = appState;

    if (!workoutManager) return;

    if (workoutManager.currentTimer?.paused) {
      workoutManager.resume();
    } else {
      workoutManager.pause();
    }
  }

  let screen: ReactElement | null = null;

  if (!appState.workoutManager) {
    screen = <StartScreen />;
  } else if (appState.workoutManager.status === WorkoutStatus.Finished) {
    screen = <FinishedScreen />;
  } else {
    screen = <WorkoutScreen workoutManager={appState.workoutManager} />;
  }

  return (
    <div className="ui-root" onTouchStart={() => onTouch()}>
      {screen}
    </div>
  );
}
