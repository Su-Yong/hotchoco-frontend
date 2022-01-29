import atomWithDebouncedStorage from '@/utils/jotai/atomWithDebouncedStorage';

const roomListWidth = atomWithDebouncedStorage('room-list-width', 360);

export default roomListWidth;
