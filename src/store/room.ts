import createStorageSignal from '@/hooks/createStorageSignal';

export const [roomContainerWidth, setRoomContainerWidth] = createStorageSignal('roomContainerWidth', 320 as number, {
  serialize: false,
  to: (rawValue) => {
    const converted = Number(rawValue);
    if (Number.isFinite(converted)) return converted;

    return 320;
  },
});
