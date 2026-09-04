// One-shot signal: the AppLoader fires this once its reveal transition has
// finished and the page is visible. Deferred landing motion (e.g. the physics
// hero's rain-in) waits on it so nothing animates behind the splash.
export const APP_READY_EVENT = "app:ready";

let ready = false;

// True once the loader's reveal has completed. Late subscribers (lazy chunks
// that mount after the event fired) read this instead of missing the event.
export const isAppReady = () => ready;

export const markAppReady = () => {
  if (ready) return;
  ready = true;
  window.dispatchEvent(new Event(APP_READY_EVENT));
};

// Run `cb` when the app is ready — immediately if it already is, else once on
// the event. Returns an unsubscribe for effect cleanup.
export const onAppReady = (cb) => {
  if (ready) {
    cb();
    return () => {};
  }
  const handler = () => cb();
  window.addEventListener(APP_READY_EVENT, handler, { once: true });
  return () => window.removeEventListener(APP_READY_EVENT, handler);
};
