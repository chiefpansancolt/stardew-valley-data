import { GrandpaCategory, GrandpaInput, GrandpaResult, GrandpaScoreEntry } from '@/types';

const MAX_SCORE = 21;

const EARNINGS_TIERS: { threshold: number; points: number }[] = [
  { threshold: 1_000_000, points: 7 },
  { threshold: 500_000, points: 5 },
  { threshold: 300_000, points: 4 },
  { threshold: 200_000, points: 3 },
  { threshold: 100_000, points: 2 },
  { threshold: 50_000, points: 1 },
];

function candlesForScore(score: number): 1 | 2 | 3 | 4 {
  if (score >= 12) return 4;
  if (score >= 8) return 3;
  if (score >= 4) return 2;
  return 1;
}

function entry(
  criterion: string,
  points: number,
  maxPoints: number,
  category: GrandpaCategory,
): GrandpaScoreEntry {
  return { criterion, points, maxPoints, category };
}

/** Calculates Grandpa's evaluation score based on end-of-Year-2 progress. */
export class GrandpaEvaluator {
  /**
   * Calculate the Grandpa evaluation result for the given input.
   * Returns the total score (0–21), candle count (1–4), and a full breakdown
   * of points earned per criterion.
   */
  evaluate(input: GrandpaInput): GrandpaResult {
    const breakdown: GrandpaScoreEntry[] = [];

    // Earnings (0–7 pts)
    const earningsTier = EARNINGS_TIERS.find((t) => input.totalEarnings >= t.threshold);
    breakdown.push(entry('Total Earnings', earningsTier?.points ?? 0, 7, 'earnings'));

    // Skills (0–2 pts)
    breakdown.push(
      entry('Total Skill Levels ≥30', input.totalSkillLevels >= 30 ? 1 : 0, 1, 'skills'),
    );
    breakdown.push(
      entry('Total Skill Levels ≥50', input.totalSkillLevels >= 50 ? 1 : 0, 1, 'skills'),
    );

    // Achievements (0–3 pts)
    breakdown.push(
      entry('A Complete Collection', input.museumCompleted ? 1 : 0, 1, 'achievements'),
    );
    breakdown.push(entry('Master Angler', input.masterAngler ? 1 : 0, 1, 'achievements'));
    breakdown.push(entry('Full Shipment', input.fullShipment ? 1 : 0, 1, 'achievements'));

    // Friendship (0–4 pts)
    breakdown.push(entry('Married with Kitchen & Nursery', input.married ? 1 : 0, 1, 'friendship'));
    breakdown.push(
      entry('5+ Villagers at 8 Hearts', input.villagersAt8Hearts >= 5 ? 1 : 0, 1, 'friendship'),
    );
    breakdown.push(
      entry('10+ Villagers at 8 Hearts', input.villagersAt8Hearts >= 10 ? 1 : 0, 1, 'friendship'),
    );
    breakdown.push(entry('Pet at Max Friendship', input.petFriendship ? 1 : 0, 1, 'friendship'));

    // Community Center (0–3 pts)
    breakdown.push(
      entry(
        'Community Center Completed',
        input.communityCenterCompleted ? 1 : 0,
        1,
        'community-center',
      ),
    );
    breakdown.push(
      entry(
        'Community Center Ceremony Attended',
        input.communityCenterCeremonyAttended ? 2 : 0,
        2,
        'community-center',
      ),
    );

    // Exploration (0–2 pts)
    breakdown.push(entry('Skull Key Obtained', input.skullKeyObtained ? 1 : 0, 1, 'exploration'));
    breakdown.push(entry('Rusty Key Obtained', input.rustyKeyObtained ? 1 : 0, 1, 'exploration'));

    const score = breakdown.reduce((sum, e) => sum + e.points, 0);

    return {
      score,
      maxScore: MAX_SCORE,
      candles: candlesForScore(score),
      breakdown,
    };
  }
}

/** Returns a GrandpaEvaluator for calculating Grandpa's end-of-Year-2 evaluation score. */
export function grandpaEvaluator(): GrandpaEvaluator {
  return new GrandpaEvaluator();
}
