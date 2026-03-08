import { QueryBase } from '@/common/query-base';
import data from '@/data/weather.json';
import { Season, Weather } from '@/types';

const weatherData: Weather[] = data as Weather[];

/** Query builder for weather data. All filter methods return a new WeatherQuery for chaining. */
export class WeatherQuery extends QueryBase<Weather> {
  constructor(data: Weather[] = weatherData) {
    super(data);
  }

  bySeason(season: Season): WeatherQuery {
    return new WeatherQuery(this.data.filter((w) => w.seasons.includes(season)));
  }

  watersCrops(): WeatherQuery {
    return new WeatherQuery(this.data.filter((w) => w.watersCrops));
  }

  special(): WeatherQuery {
    return new WeatherQuery(this.data.filter((w) => w.special));
  }
}

/** Returns a WeatherQuery for all weather data. Pass `source` to wrap a pre-filtered array. */
export function weather(source: Weather[] = weatherData): WeatherQuery {
  return new WeatherQuery(source);
}
