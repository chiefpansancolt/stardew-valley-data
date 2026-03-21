export interface Festival {
  name: string;
  startDay: number;
  endDay: number;
  image: string;
  calendarIcon: string;
}

export interface SeasonData {
  id: 'spring' | 'summer' | 'fall' | 'winter';
  name: string;
  totalDays: number;
  image: string;
  festivals: Festival[];
  bookseller: number[];
}
