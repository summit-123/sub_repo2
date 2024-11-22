export function calculateNextReview(
  quality: number,
  repetitions: number,
  previousInterval: number,
): { interval: number; repetitions: number } {
  if (quality < 2) {
    return { interval: 1, repetitions: 0 };
  }

  let interval: number;
  if (repetitions === 0) {
    interval = 1;
  } else if (repetitions === 1) {
    interval = 6;
  } else {
    interval = Math.round(previousInterval * 2.5);
  }

  return {
    interval,
    repetitions: repetitions + 1,
  };
}
