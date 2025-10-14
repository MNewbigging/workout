import { appState } from "../app-state/app-state";
import "./app.scss";

export function App() {
  appState.prepWorkout();

  return <div>App</div>;
}
