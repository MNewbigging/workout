import { appState } from "../../app-state/app-state";
import "./finished-screen.scss";

export function FinishedScreen() {
  return (
    <div className="finished-screen">
      <div>Well done!</div>
      <button onClick={() => appState.finishWorkout()}>Finish</button>
    </div>
  );
}
