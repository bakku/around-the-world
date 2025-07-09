export function doTimes(
  intervalMs: number,
  fn: () => void,
  times: number,
): Promise<void> {
  return new Promise((resolve) => {
    let n = 0;

    const intervalId = setInterval(() => {
      fn();

      if (n >= times) {
        clearInterval(intervalId);
        resolve();
      } else {
        n++;
      }
    }, intervalMs);
  });
}

export function wait(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
