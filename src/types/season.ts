export interface Festival {
  name: string;
  startDay: number;
  endDay: number;
  image: string;
  /** Small icon shown on the in-game calendar for this event */
  calendarIcon: string;
}

export interface SeasonData {
  id: 'spring' | 'summer' | 'fall' | 'winter';
  name: string;
  totalDays: number;
  image: string;
  festivals: Festival[];
}
