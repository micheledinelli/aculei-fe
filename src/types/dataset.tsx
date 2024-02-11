interface AnimalCounts {
  [animal: string]: number;
}

interface CameraCounts {
  [camera: string]: number;
}

interface MoonPhaseCounts {
  [phase: string]: number;
}

interface SeasonCounts {
  [season: string]: number;
}

interface Temperature {
  max: number;
  min: number;
}

interface DatasetInfo {
  animals: AnimalCounts;
  cameras: CameraCounts;
  moon_phases: MoonPhaseCounts;
  seasons: SeasonCounts;
  temperature: Temperature;
  total_records: number;
}
