export interface PerfectionCategory {
  /** Slug identifier, e.g. "produce-forage-shipped" */
  id: string;
  /** Display name shown in the Perfection Tracker */
  name: string;
  /** What must be done to complete this category */
  requirement: string;
  /** Number of items/goals/villagers etc. required */
  count: number;
  /** Unit label for count (e.g. "items", "goals", "villagers") */
  unit: string;
  /** Percentage weight toward overall perfection (all weights sum to 100) */
  weight: number;
}
