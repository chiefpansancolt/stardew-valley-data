# grandpa

Calculate Grandpa's end-of-Year-2 evaluation score. Pass your progress values and get back the total
score (0–21), candle count (1–4), and a full per-criterion breakdown.

Note: The evaluation occurs at the start of Year 3. Place a Diamond at Grandpa's Shrine at any time
after to trigger a re-evaluation the following day.

## Usage

```ts
import { grandpaEvaluator } from "stardew-valley-data";

const evaluator = grandpaEvaluator();

const result = evaluator.evaluate({
  totalEarnings: 500000,
  totalSkillLevels: 42,
  museumCompleted: true,
  masterAngler: false,
  fullShipment: false,
  married: true,
  villagersAt8Hearts: 8,
  petFriendship: true,
  communityCenterCompleted: true,
  communityCenterCeremonyAttended: true,
  skullKeyObtained: true,
  rustyKeyObtained: true,
});

result.score; // 16
result.candles; // 4
result.maxScore; // 21
result.breakdown; // per-criterion entries
```

## Factory function

```ts
function grandpaEvaluator(): GrandpaEvaluator;
```

## GrandpaEvaluator methods

| Method          | Returns       | Description                      |
| --------------- | ------------- | -------------------------------- |
| evaluate(input) | GrandpaResult | Calculate score and candle count |

## Candle thresholds

| Score | Candles | Reward               |
| ----- | ------- | -------------------- |
| 0–3   | 1       | —                    |
| 4–7   | 2       | —                    |
| 8–11  | 3       | —                    |
| 12+   | 4       | Statue of Perfection |

## Scoring criteria (21 points total)

### Earnings (0–7 pts)

| Threshold  | Points |
| ---------- | ------ |
| 50,000g    | 1      |
| 100,000g   | 2      |
| 200,000g   | 3      |
| 300,000g   | 4      |
| 500,000g   | 5      |
| 1,000,000g | 7      |

### Skills (0–2 pts)

| Criterion              | Points |
| ---------------------- | ------ |
| Total skill levels ≥30 | 1      |
| Total skill levels ≥50 | 1      |

### Achievements (0–3 pts)

| Criterion             | Points |
| --------------------- | ------ |
| A Complete Collection | 1      |
| Master Angler         | 1      |
| Full Shipment         | 1      |

### Friendship (0–4 pts)

| Criterion                      | Points |
| ------------------------------ | ------ |
| Married with kitchen + nursery | 1      |
| 5+ villagers at 8 hearts       | 1      |
| 10+ villagers at 8 hearts      | 1      |
| Pet at max friendship          | 1      |

### Community Center (0–3 pts)

| Criterion                  | Points |
| -------------------------- | ------ |
| Community Center completed | 1      |
| Ceremony attended          | 2      |

Note: Taking the Joja route blocks all 3 Community Center points.

### Exploration (0–2 pts)

| Criterion          | Points |
| ------------------ | ------ |
| Skull Key obtained | 1      |
| Rusty Key obtained | 1      |

## GrandpaInput fields

| Field                           | Type    | Description                                             |
| ------------------------------- | ------- | ------------------------------------------------------- |
| totalEarnings                   | number  | Lifetime earnings in gold                               |
| totalSkillLevels                | number  | Sum of all 5 skill levels (0–50)                        |
| museumCompleted                 | boolean | A Complete Collection achievement                       |
| masterAngler                    | boolean | Master Angler achievement (all fish caught)             |
| fullShipment                    | boolean | Full Shipment achievement (all items shipped)           |
| married                         | boolean | Married with kitchen and nursery upgrades               |
| villagersAt8Hearts              | number  | Count of villagers with 8+ hearts                       |
| petFriendship                   | boolean | Pet at maximum friendship (~1,975+ relationship points) |
| communityCenterCompleted        | boolean | Community Center completed                              |
| communityCenterCeremonyAttended | boolean | Watched the completion ceremony cutscene                |
| skullKeyObtained                | boolean | Skull Key obtained                                      |
| rustyKeyObtained                | boolean | Rusty Key obtained                                      |

## GrandpaResult fields

| Field     | Type                | Description                     |
| --------- | ------------------- | ------------------------------- |
| score     | number              | Total points earned (0–21)      |
| maxScore  | number              | Always 21                       |
| candles   | 1 \| 2 \| 3 \| 4    | Candles lit on Grandpa's shrine |
| breakdown | GrandpaScoreEntry[] | Per-criterion score entries     |

## GrandpaScoreEntry fields

| Field     | Type            | Description                      |
| --------- | --------------- | -------------------------------- |
| criterion | string          | Criterion name                   |
| points    | number          | Points earned for this criterion |
| maxPoints | number          | Maximum possible points          |
| category  | GrandpaCategory | Scoring category                 |

## GrandpaCategory values

`"earnings"` | `"skills"` | `"achievements"` | `"friendship"` | `"community-center"` |
`"exploration"`
