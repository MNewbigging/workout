import { ReactElement } from "react";
import { appState } from "../app-state/app-state";
import "./app.scss";
import { useUpdater } from "./hooks/use-updater";
import { LandingScreen } from "./landing-screen/landing-screen";
import { WorkoutScreen } from "./workout-screen/workout-screen";

export function App() {
  useUpdater("started-workout");

  let screen: ReactElement | null = null;

  if (!appState.workoutManager) {
    screen = <LandingScreen />;
  } else {
    screen = <WorkoutScreen workoutManager={appState.workoutManager} />;
  }

  return <div className="ui-root">{screen}</div>;
}
