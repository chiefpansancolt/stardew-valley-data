import { grandpaEvaluator } from '@/modules/grandpa';

const evaluator = grandpaEvaluator();

const ZERO_INPUT = {
  totalEarnings: 0,
  totalSkillLevels: 0,
  museumCompleted: false,
  masterAngler: false,
  fullShipment: false,
  married: false,
  villagersAt8Hearts: 0,
  petFriendship: false,
  communityCenterCompleted: false,
  communityCenterCeremonyAttended: false,
  skullKeyObtained: false,
  rustyKeyObtained: false,
};

const PERFECT_INPUT = {
  totalEarnings: 1_000_000,
  totalSkillLevels: 50,
  museumCompleted: true,
  masterAngler: true,
  fullShipment: true,
  married: true,
  villagersAt8Hearts: 10,
  petFriendship: true,
  communityCenterCompleted: true,
  communityCenterCeremonyAttended: true,
  skullKeyObtained: true,
  rustyKeyObtained: true,
};

describe('GrandpaEvaluator', () => {
  it('zero input gives score 0, candles 1', () => {
    const result = evaluator.evaluate(ZERO_INPUT);
    expect(result.score).toBe(0);
    expect(result.candles).toBe(1);
    expect(result.maxScore).toBe(21);
  });

  it('perfect input gives score 21, candles 4', () => {
    const result = evaluator.evaluate(PERFECT_INPUT);
    expect(result.score).toBe(21);
    expect(result.candles).toBe(4);
  });

  it('candle boundaries: 4→12, 3→8, 2→4, 1→0', () => {
    const score12 = evaluator.evaluate({
      ...ZERO_INPUT,
      totalEarnings: 1_000_000,
      totalSkillLevels: 50,
      museumCompleted: true,
      masterAngler: true,
      fullShipment: true,
    });
    expect(score12.score).toBe(12);
    expect(score12.candles).toBe(4);

    const score8 = evaluator.evaluate({
      ...ZERO_INPUT,
      totalEarnings: 1_000_000,
      totalSkillLevels: 30,
    });
    expect(score8.score).toBe(8);
    expect(score8.candles).toBe(3);

    const score4 = evaluator.evaluate({
      ...ZERO_INPUT,
      totalEarnings: 300_000,
    });
    expect(score4.score).toBe(4);
    expect(score4.candles).toBe(2);
  });

  it('breakdown has consistent number of entries', () => {
    const r1 = evaluator.evaluate(ZERO_INPUT);
    const r2 = evaluator.evaluate(PERFECT_INPUT);
    expect(r1.breakdown.length).toBe(r2.breakdown.length);
  });

  it('breakdown points sum to score', () => {
    const result = evaluator.evaluate(PERFECT_INPUT);
    const sum = result.breakdown.reduce((s, e) => s + e.points, 0);
    expect(sum).toBe(result.score);
  });

  it('earnings tiers are correct', () => {
    expect(evaluator.evaluate({ ...ZERO_INPUT, totalEarnings: 50_000 }).score).toBe(1);
    expect(evaluator.evaluate({ ...ZERO_INPUT, totalEarnings: 100_000 }).score).toBe(2);
    expect(evaluator.evaluate({ ...ZERO_INPUT, totalEarnings: 200_000 }).score).toBe(3);
    expect(evaluator.evaluate({ ...ZERO_INPUT, totalEarnings: 300_000 }).score).toBe(4);
    expect(evaluator.evaluate({ ...ZERO_INPUT, totalEarnings: 500_000 }).score).toBe(5);
    expect(evaluator.evaluate({ ...ZERO_INPUT, totalEarnings: 1_000_000 }).score).toBe(7);
  });
});
