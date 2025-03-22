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

  const isCanceledError = (e: unknown) =>
    typeof e === 'object' && e !== null && (e as Error).name === 'CanceledError';

  return {
    getControllerSignal,
    abort,
    reinit,
    setupController,
    isCanceledError,
  };
};
