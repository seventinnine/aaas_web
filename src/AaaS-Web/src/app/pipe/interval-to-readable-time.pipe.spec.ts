import { IntervalToReadableTimePipe } from './interval-to-readable-time.pipe';

describe('IntervalToReadableTimePipe', () => {
  it('create an instance', () => {
    const pipe = new IntervalToReadableTimePipe();
    expect(pipe).toBeTruthy();
  });
});
