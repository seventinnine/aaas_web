// https://stackoverflow.com/questions/42136098/array-groupby-in-typescript

export const groupBy = <T, K extends keyof any>(list: T[], getKey: (item: T) => K) =>
  list.reduce((previous, currentItem) => {
    const group = getKey(currentItem);
    if (!previous[group]) previous[group] = [];
    previous[group].push(currentItem);
    return previous;
}, {} as Record<K, T[]>);

function getMinSec(executionInterval?: number) {
  if (!executionInterval) return 0;
  const hrs = getHours(executionInterval);
  return executionInterval - (hrs * 1000 * 3600);
}

export function getHours(executionInterval?: number) {
  if (!executionInterval) return 0;
  return Math.trunc((executionInterval / 1000 / 3600));
}
export function getMinutes(executionInterval?: number) {
  if (!executionInterval) return 0;
  const minSecMs = getMinSec(executionInterval);
  return Math.trunc(minSecMs / 1000 / 60);
}
export function getSeconds(executionInterval?: number) {
  if (!executionInterval) return 0;
  const minSecMs = getMinSec(executionInterval);
  const minutes = getMinutes(executionInterval);
  return  Math.trunc((minSecMs - (minutes * 1000 * 60)) / 1000);
}

export function toExecutionInterval(
  executionInterval1?: number,
  executionInterval2?: number,
  executionInterval3?: number
) {
  if (executionInterval1 === undefined || executionInterval2 === undefined || executionInterval3 === undefined) return 0;
  //         hours                   min                          sec                 to ms
  return ((((executionInterval1 * 60) + executionInterval2) * 60) + executionInterval3) * 1000;
}

export function removeUndefinedAndNull(obj: any) {
  return Object.keys(obj).forEach(key => (obj[key] === undefined || obj[key] === null) ? delete obj[key] : {});
}