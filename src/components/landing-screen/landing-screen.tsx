import { appState } from "../../app-state/app-state";
import "./landing-screen.scss";

export function LandingScreen() {
  return (
    <button className="start-button" onClick={() => appState.startNewWorkout()}>
      Start
    </button>
  );
}
