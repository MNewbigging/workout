import { appState } from "../app-state/app-state";
import "./app.scss";
import { useUpdater } from "./hooks/use-updater";

export function App() {
  return (
    <div className="ui-root">
      <button
        className="start-button"
        onClick={() => appState.startNewWorkout()}
      >
        Start
      </button>
    </div>
  );
}
