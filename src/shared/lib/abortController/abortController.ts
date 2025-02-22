export const abortController = () => {
  let controller = new AbortController();

  const getControllerSignal = () => controller.signal;

  const abort = () => controller.abort();

  const reinit = () => {
    controller = new AbortController();
  };

  const setupController = () => {
    abort();
    reinit();
  };

  return {
    getControllerSignal,
    abort,
    reinit,
    setupController,
  };
};
