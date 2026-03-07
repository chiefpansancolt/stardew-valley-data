import data from '@/data/weather.json';
import { Season, Weather } from '@/types';

const weatherData: Weather[] = data as Weather[];

export class WeatherQuery {
  constructor(private data: Weather[] = weatherData) {}

  bySeason(season: Season): WeatherQuery {
    return new WeatherQuery(this.data.filter((w) => w.seasons.includes(season)));
  }

  watersCrops(): WeatherQuery {
    return new WeatherQuery(this.data.filter((w) => w.watersCrops));
  }

  special(): WeatherQuery {
    return new WeatherQuery(this.data.filter((w) => w.special));
  }

  get(): Weather[] {
    return this.data;
  }

  first(): Weather | undefined {
    return this.data[0];
  }

  find(id: string): Weather | undefined {
    return this.data.find((w) => w.id === id);
  }

  findByName(name: string): Weather | undefined {
    return this.data.find((w) => w.name.toLowerCase() === name.toLowerCase());
  }

  count(): number {
    return this.data.length;
  }
}

export function weather(source: Weather[] = weatherData): WeatherQuery {
  return new WeatherQuery(source);
}
