import { weather, WeatherQuery } from '@/modules/weather';
import { testFilterImmutability, testQueryBaseContract } from '../helpers';

testQueryBaseContract('weather', () => weather());

describe('WeatherQuery filters', () => {
  it('bySeason() returns weather for that season', () => {
    const summer = weather().bySeason('summer').get();
    expect(summer.length).toBeGreaterThan(0);
    for (const w of summer) {
      expect(w.seasons).toContain('summer');
    }
  });

  it('watersCrops() returns only weather that waters crops', () => {
    const result = weather().watersCrops().get();
    expect(result.length).toBeGreaterThan(0);
    for (const w of result) {
      expect(w.watersCrops).toBe(true);
    }
  });

  it('special() returns only special weather', () => {
    const result = weather().special().get();
    for (const w of result) {
      expect(w.special).toBe(true);
    }
  });
});

testFilterImmutability(
  'bySeason',
  () => weather(),
  (q) => (q as WeatherQuery).bySeason('spring'),
);
testFilterImmutability(
  'watersCrops',
  () => weather(),
  (q) => (q as WeatherQuery).watersCrops(),
);

describe('branch coverage', () => {
  it('constructor default', () => {
    expect(new WeatherQuery().count()).toBeGreaterThan(0);
  });
});
