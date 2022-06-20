const maxDublinArea = 24;

const dublinAreaBlockList = [7, 8, 10, 11, 12, 13, 17, 20, 22, 24];

export const DublinLocations = Array.from(
  { length: maxDublinArea },
  (_, index) => index + 1
)
  .filter((area) => !dublinAreaBlockList.includes(area))
  .map((area) => `dublin-${area}-dublin`);
