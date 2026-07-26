export interface StateAdapter<T = unknown> {
  exportState(): T;
  importState(state: T): void;
}

const adapters = new Map<string, StateAdapter>();
const pendingStates = new Map<string, unknown>();

export function registerStateAdapter(id: string, adapter: StateAdapter) {
  adapters.set(id, adapter);

  const pending = pendingStates.get(id);

  if (pending !== undefined) {
    adapter.importState(pending);
    pendingStates.delete(id);
  }
}

export function unregisterStateAdapter(id: string) {
  adapters.delete(id);
}

export function exportAdapters() {
  return Object.fromEntries(
    [...adapters].map(([id, adapter]) => [id, adapter.exportState()]),
  );
}

export function importAdapters(state: Record<string, unknown>) {
  Object.entries(state).forEach(([id, value]) => {
    const adapter = adapters.get(id);

    if (adapter) {
      adapter.importState(value);
    } else {
      pendingStates.set(id, value);
    }
  });
}