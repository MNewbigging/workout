import { appState } from "../../app-state/app-state";
import { Button } from "../button/button";
import "./finished-screen.scss";

export function FinishedScreen() {
  return (
    <div className="finished-screen">
      <div className="text">Well done!</div>
      <Button text="Finish" onPress={() => appState.finishWorkout()} />
    </div>
  );
}
