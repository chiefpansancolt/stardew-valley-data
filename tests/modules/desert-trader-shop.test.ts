import { desertTrader, DesertTraderQuery } from '@/modules/desert-trader-shop';
import { testQueryBaseContract } from '../helpers';

describe('branch coverage', () => {
  it('constructor uses default data when called without args', () => {
    const query = new DesertTraderQuery();
    expect(query.count()).toBeGreaterThan(0);
  });

  it('sortByTradeAmount() uses default order (asc)', () => {
    const sorted = desertTrader().sortByTradeAmount().get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].tradeAmount).toBeLessThanOrEqual(sorted[i].tradeAmount);
    }
  });

  it('sortByName() uses default order (asc)', () => {
    const sorted = desertTrader().sortByName().get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].name.localeCompare(sorted[i].name)).toBeLessThanOrEqual(0);
    }
  });
});

testQueryBaseContract('desertTrader', () => desertTrader());

describe('DesertTraderQuery filters', () => {
  it('permanent() returns items with no day restriction', () => {
    const perma = desertTrader().permanent().get();
    expect(perma.length).toBeGreaterThan(0);
    for (const item of perma) {
      expect(item.day).toBeUndefined();
    }
  });

  it('daily() returns only day-specific items', () => {
    const daily = desertTrader().daily().get();
    expect(daily.length).toBeGreaterThan(0);
    for (const item of daily) {
      expect(item.day).toBeDefined();
    }
  });

  it('byDay() includes permanent + that day', () => {
    const monday = desertTrader().byDay('Monday').get();
    const permanentCount = desertTrader().permanent().count();
    expect(monday.length).toBeGreaterThanOrEqual(permanentCount);
  });
});

describe('DesertTraderQuery additional filters', () => {
  it('recipes() returns only recipe items', () => {
    const recipes = desertTrader().recipes().get();
    expect(recipes.length).toBeGreaterThan(0);
    for (const item of recipes) {
      expect(item.isRecipe).toBe(true);
    }
  });

  it('byTradeItem() filters by trade item ID', () => {
    const all = desertTrader().get();
    const firstWithTrade = all.find((i) => i.tradeItemId);
    if (firstWithTrade) {
      const filtered = desertTrader().byTradeItem(firstWithTrade.tradeItemId).get();
      expect(filtered.length).toBeGreaterThan(0);
      for (const item of filtered) {
        expect(item.tradeItemId).toBe(firstWithTrade.tradeItemId);
      }
    }
  });

  it('alwaysAvailable() returns items with no availability condition', () => {
    const available = desertTrader().alwaysAvailable().get();
    for (const item of available) {
      expect(item.availability).toBeUndefined();
    }
  });
});

describe('DesertTraderQuery sorts', () => {
  it('sortByTradeAmount asc has lowest first', () => {
    const sorted = desertTrader().sortByTradeAmount('asc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].tradeAmount).toBeLessThanOrEqual(sorted[i].tradeAmount);
    }
  });

  it('sortByTradeAmount desc has highest first', () => {
    const sorted = desertTrader().sortByTradeAmount('desc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].tradeAmount).toBeGreaterThanOrEqual(sorted[i].tradeAmount);
    }
  });

  it('sortByName asc sorts alphabetically', () => {
    const sorted = desertTrader().sortByName('asc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].name.localeCompare(sorted[i].name)).toBeLessThanOrEqual(0);
    }
  });

  it('sortByName desc sorts reverse alphabetically', () => {
    const sorted = desertTrader().sortByName('desc').get();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].name.localeCompare(sorted[i].name)).toBeGreaterThanOrEqual(0);
    }
  });
});
