let loadingState = false;

export function isLoading() { return loadingState }
export function setLoading(state) { loadingState = state; }