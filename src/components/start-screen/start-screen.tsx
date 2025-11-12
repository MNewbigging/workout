import { appState } from "../../app-state/app-state";
import { Button } from "../button/button";
import "./start-screen.scss";

export function StartScreen() {
  return (
    <div className="start-screen">
      <Button text="Start" onPress={() => appState.startNewWorkout()} />
    </div>
  );
}
