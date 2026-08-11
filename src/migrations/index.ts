import * as migration_20260811_084805_baseline from './20260811_084805_baseline';

export const migrations = [
  {
    up: migration_20260811_084805_baseline.up,
    down: migration_20260811_084805_baseline.down,
    name: '20260811_084805_baseline'
  },
];
