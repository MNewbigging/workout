export type WorkoutEvent =
  | "started-workout"
  | "second-passed"
  | "timer-started"
  | "finished-workout"
  | "return-to-landing-page";

type EventCallback = () => void;

class WorkoutUpdater {
  private callbacks = new Map<WorkoutEvent, Set<EventCallback>>();

  on(event: WorkoutEvent, callback: EventCallback) {
    const callbacks = this.callbacks.get(event) ?? new Set<EventCallback>();
    callbacks.add(callback);
    this.callbacks.set(event, callbacks);
  }

  off(event: WorkoutEvent, callback: EventCallback) {
    const callbacks = this.callbacks.get(event);
    if (!callbacks) return;

    callbacks.delete(callback);

    if (!callbacks.size) {
      this.callbacks.delete(event);
    } else {
      this.callbacks.set(event, callbacks);
    }
  }

  fire(event: WorkoutEvent) {
    const callbacks = this.callbacks.get(event);
    if (!callbacks) return;
    callbacks.forEach((cb) => cb());
  }
}

export const updater = new WorkoutUpdater();
