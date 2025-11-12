import { appState } from "../../app-state/app-state";
import "./start-screen.scss";

export function StartScreen() {
  return (
    <div className="start-screen">
      <button
        className="start-button"
        onClick={() => appState.startNewWorkout()}
      >
        Start
      </button>
    </div>
  );
}
