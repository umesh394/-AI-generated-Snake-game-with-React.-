import { Track } from './types';

export const GRID_SIZE = 20;
export const INITIAL_SPEED = 150;
export const SPEED_INCREMENT = 1;
export const MIN_SPEED = 60;

export const DUMMY_TRACKS: Track[] = [
  {
    id: '1',
    title: 'Neon Pulsar',
    artist: 'AI Voyager',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    duration: 372,
    coverUrl: 'https://picsum.photos/seed/pulsar/400/400',
  },
  {
    id: '2',
    title: 'Cyber Drift',
    artist: 'Neural Beats',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    duration: 425,
    coverUrl: 'https://picsum.photos/seed/drift/400/400',
  },
  {
    id: '3',
    title: 'Synth Horizon',
    artist: 'Digital Echo',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    duration: 315,
    coverUrl: 'https://picsum.photos/seed/horizon/400/400',
  },
];
