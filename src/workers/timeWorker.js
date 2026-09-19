let isRunning = false;
let timeoutId = null;

self.onmessage = function (event) {
  if (isRunning) return;

  isRunning = true;

  const state = event.data;
  const { activeTask, secondsRemaining } = state;

  if (!activeTask) {
    isRunning = false;
    return;
  }

  const endDate = activeTask.startDate + secondsRemaining * 1000;

  function tick() {
    const now = Date.now();
    const countDownSeconds = Math.ceil((endDate - now) / 1000);

    self.postMessage(countDownSeconds);

    if (countDownSeconds <= 0) {
      isRunning = false;
      if (timeoutId) clearTimeout(timeoutId);
      return;
    }

    timeoutId = setTimeout(tick, 1000);
  }

  tick();
};
