import { Accessor, createSignal, onCleanup, onMount } from 'solid-js';

const createMediaSignal = (query: string): Accessor<boolean> => {
  const media = window.matchMedia(query);

  const [signal, setSignal] = createSignal(media.matches);

  const updateMedia = () => {
    const result = window.matchMedia(query).matches;

    if (signal() !== result) setSignal(result);
  };

  onMount(() => {
    media.addEventListener('change', updateMedia);
  });

  onCleanup(() => {
    media.removeEventListener('change', updateMedia);
  });

  return signal;
};

export default createMediaSignal;
