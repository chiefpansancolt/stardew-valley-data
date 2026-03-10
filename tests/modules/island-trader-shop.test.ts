import { islandTrader, IslandTraderQuery } from '@/modules/island-trader-shop';
import { testQueryBaseContract } from '../helpers';

testQueryBaseContract('islandTrader', () => islandTrader());

describe('IslandTraderQuery filters', () => {
  it('daily() returns only day-specific items', () => {
    const daily = islandTrader().daily().get();
    expect(daily.length).toBeGreaterThan(0);
    for (const item of daily) {
      expect(item.day).toBeDefined();
    }
  });

  it('byDay() includes permanent + that day', () => {
    const monday = islandTrader().byDay('Monday').get();
    const permanentCount = islandTrader().permanent().count();
    expect(monday.length).toBeGreaterThanOrEqual(permanentCount);
  });
});

describe('IslandTraderQuery additional filters', () => {
  it('recipes() returns only recipe items', () => {
    const recipes = islandTrader().recipes().get();
    expect(recipes.length).toBeGreaterThan(0);
    for (const item of recipes) {
      expect(item.isRecipe).toBe(true);
    }
  });

  it('byTradeItem() filters by trade item ID', () => {
    const all = islandTrader().get();
    const firstWithTrade = all.find((i) => i.tradeItemId);
    if (firstWithTrade) {
      const filtered = islandTrader().byTradeItem(firstWithTrade.tradeItemId).get();
      expect(filtered.length).toBeGreaterThan(0);
      for (const item of filtered) {
        expect(item.tradeItemId).toBe(firstWithTrade.tradeItemId);
      }
    }
  });

  it('alwaysAvailable() returns items with no availability condition', () => {
    const available = islandTrader().alwaysAvailable().get();
    for (const item of available) {
      expect(item.availability).toBeUndefined();
    }
  });
});

describe('IslandTraderQuery sorts', () => {
  it('sortByTradeAmount asc has lowest first', () => {
    const sorted = islandTrader().sortByTradeAmount('asc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].tradeAmount).toBeLessThanOrEqual(sorted[i].tradeAmount);
    }
  });

  it('sortByTradeAmount desc has highest first', () => {
    const sorted = islandTrader().sortByTradeAmount('desc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].tradeAmount).toBeGreaterThanOrEqual(sorted[i].tradeAmount);
    }
  });

  it('sortByName asc sorts alphabetically', () => {
    const sorted = islandTrader().sortByName('asc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].name.localeCompare(sorted[i].name)).toBeLessThanOrEqual(0);
    }
  });

  it('sortByName desc sorts reverse alphabetically', () => {
    const sorted = islandTrader().sortByName('desc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].name.localeCompare(sorted[i].name)).toBeGreaterThanOrEqual(0);
    }
  });
});

describe('branch coverage', () => {
  it('constructor default', () => {
    expect(new IslandTraderQuery().count()).toBeGreaterThan(0);
  });

  it('sortByTradeAmount default order', () => {
    expect(islandTrader().sortByTradeAmount().count()).toBeGreaterThan(0);
  });

  it('sortByName default order', () => {
    expect(islandTrader().sortByName().count()).toBeGreaterThan(0);
  });
});
