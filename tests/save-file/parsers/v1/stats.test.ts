import { parseStats } from '../../../../src/save-file/parsers/v1/stats';

describe('parseStats()', () => {
  it('parses all stat fields from player stats', () => {
    const player = {
      stats: {
        Values: {
          item: [
            { key: { string: 'daysPlayed' }, value: { unsignedInt: 56 } },
            { key: { string: 'stepsTaken' }, value: { unsignedInt: 5000 } },
            { key: { string: 'fishCaught' }, value: { unsignedInt: 30 } },
            { key: { string: 'itemsShipped' }, value: { unsignedInt: 200 } },
            { key: { string: 'itemsForaged' }, value: { unsignedInt: 50 } },
            { key: { string: 'itemsCrafted' }, value: { unsignedInt: 40 } },
            { key: { string: 'itemsCooked' }, value: { unsignedInt: 10 } },
            { key: { string: 'monstersKilled' }, value: { unsignedInt: 100 } },
            { key: { string: 'questsCompleted' }, value: { unsignedInt: 15 } },
            { key: { string: 'geodesCracked' }, value: { unsignedInt: 25 } },
            { key: { string: 'giftsGiven' }, value: { unsignedInt: 80 } },
            { key: { string: 'timesFished' }, value: { unsignedInt: 60 } },
            { key: { string: 'timesUnconscious' }, value: { unsignedInt: 3 } },
            { key: { string: 'seedsSown' }, value: { unsignedInt: 300 } },
            { key: { string: 'TreesChopped' }, value: { unsignedInt: 45 } },
            { key: { string: 'rocksCrushed' }, value: { unsignedInt: 120 } },
          ],
        },
      },
    };

    const result = parseStats(player);
    expect(result.daysPlayed).toBe(56);
    expect(result.stepsTaken).toBe(5000);
    expect(result.fishCaught).toBe(30);
    expect(result.itemsShipped).toBe(200);
    expect(result.itemsForaged).toBe(50);
    expect(result.itemsCrafted).toBe(40);
    expect(result.itemsCooked).toBe(10);
    expect(result.monstersKilled).toBe(100);
    expect(result.questsCompleted).toBe(15);
    expect(result.geodesCracked).toBe(25);
    expect(result.giftsGiven).toBe(80);
    expect(result.timesFished).toBe(60);
    expect(result.timesUnconscious).toBe(3);
    expect(result.seedsSown).toBe(300);
    expect(result.treesChopped).toBe(45);
    expect(result.rocksCrushed).toBe(120);
  });

  it('defaults all stats to 0 when player has no stats', () => {
    const result = parseStats({});
    expect(result.daysPlayed).toBe(0);
    expect(result.stepsTaken).toBe(0);
    expect(result.fishCaught).toBe(0);
    expect(result.itemsShipped).toBe(0);
    expect(result.itemsForaged).toBe(0);
    expect(result.itemsCrafted).toBe(0);
    expect(result.itemsCooked).toBe(0);
    expect(result.monstersKilled).toBe(0);
    expect(result.questsCompleted).toBe(0);
    expect(result.geodesCracked).toBe(0);
    expect(result.giftsGiven).toBe(0);
    expect(result.timesFished).toBe(0);
    expect(result.timesUnconscious).toBe(0);
    expect(result.seedsSown).toBe(0);
    expect(result.treesChopped).toBe(0);
    expect(result.rocksCrushed).toBe(0);
    expect(result.raw).toEqual({});
  });

  it('skips items with missing key string', () => {
    const player = {
      stats: {
        Values: {
          item: [
            { key: {}, value: { unsignedInt: 100 } },
            { key: { string: '' }, value: { unsignedInt: 200 } },
            { key: { string: 'daysPlayed' }, value: { unsignedInt: 56 } },
          ],
        },
      },
    };

    const result = parseStats(player);
    expect(result.daysPlayed).toBe(56);
    expect(result.raw).toEqual({ daysPlayed: 56 });
  });

  it('includes all parsed stats in raw object', () => {
    const player = {
      stats: {
        Values: {
          item: [
            { key: { string: 'daysPlayed' }, value: { unsignedInt: 10 } },
            { key: { string: 'customStat' }, value: { unsignedInt: 42 } },
          ],
        },
      },
    };

    const result = parseStats(player);
    expect(result.raw.daysPlayed).toBe(10);
    expect(result.raw.customStat).toBe(42);
  });

  it('handles single item (not array)', () => {
    const player = {
      stats: {
        Values: {
          item: { key: { string: 'daysPlayed' }, value: { unsignedInt: 7 } },
        },
      },
    };

    const result = parseStats(player);
    expect(result.daysPlayed).toBe(7);
  });
});
