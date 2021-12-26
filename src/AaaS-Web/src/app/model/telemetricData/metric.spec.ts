import { Metric } from './metric';

describe('Metric', () => {
  it('should create an instance', () => {
    expect(new Metric(0, new Date(), "", "", "", 0)).toBeTruthy();
  });
});
