import { useEffect, useReducer } from "react";
import { updater, WorkoutEvent } from "../../app-state/workout-updater";

export function useUpdater(...events: WorkoutEvent[]) {
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    // On first mount, subscribe to event
    events.forEach((event) => updater.on(event, forceUpdate));

    // On unmount
    return () => {
      // Unsubscribe from the event
      events.forEach((event) => updater.off(event, forceUpdate));
    };
  }, [...events]);
}
