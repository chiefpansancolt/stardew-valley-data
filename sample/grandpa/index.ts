import { grandpaEvaluator } from '../../src/modules/grandpa';

export function run(): { passed: number; failed: number } {
  const evaluator = grandpaEvaluator();

  console.log('\n=== GRANDPA EVALUATOR ===');

  function printResult(label: string, input: Parameters<typeof evaluator.evaluate>[0]) {
    const result = evaluator.evaluate(input);
    console.log(`\n  [${label}]`);
    console.log(`  Score: ${result.score}/${result.maxScore} → ${result.candles} candle(s)`);
    for (const entry of result.breakdown) {
      if (entry.points > 0) {
        console.log(`    ✓ ${entry.criterion.padEnd(38)} +${entry.points}`);
      }
    }
    const missed = result.breakdown.filter((e) => e.points === 0);
    if (missed.length > 0) {
      console.log(`  Missed (${missed.length}):`);
      for (const entry of missed) {
        console.log(`    ✗ ${entry.criterion} (max ${entry.maxPoints})`);
      }
    }
  }

  // Perfect score
  printResult('Perfect run (4 candles)', {
    totalEarnings: 1000000,
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
  });

  // Mid-progress Year 3 (3 candles — 9 pts)
  printResult('Mid-progress Year 3 (3 candles)', {
    totalEarnings: 200000,
    totalSkillLevels: 32,
    museumCompleted: false,
    masterAngler: false,
    fullShipment: false,
    married: true,
    villagersAt8Hearts: 5,
    petFriendship: true,
    communityCenterCompleted: false,
    communityCenterCeremonyAttended: false,
    skullKeyObtained: true,
    rustyKeyObtained: true,
  });

  // Minimal run
  printResult('Minimal run (1 candle)', {
    totalEarnings: 40000,
    totalSkillLevels: 20,
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
  });

  console.log('\n' + '─'.repeat(60));
  // No images to validate
  return { passed: 0, failed: 0 };
}
