# secret-notes

Secret Notes and Journal Scraps found throughout Stardew Valley and Ginger Island.

## Usage

```ts
import { secretNotes } from "stardew-valley-data";

secretNotes().get();
secretNotes().notes().get();
secretNotes().journalScraps().get();
secretNotes().find("secret-note-15");
```

## Factory function

```ts
function secretNotes(source?: SecretNote[]): SecretNoteQuery;
```

## SecretNoteQuery — filter methods

| Method          | Returns         | Description                                       |
| --------------- | --------------- | ------------------------------------------------- |
| byType(type)    | SecretNoteQuery | Filter by note type                               |
| notes()         | SecretNoteQuery | Filter to Secret Notes only (found in The Valley) |
| journalScraps() | SecretNoteQuery | Filter to Journal Scraps only (Ginger Island)     |

## SecretNoteQuery — terminal methods

| Method           | Returns                 | Description                     |
| ---------------- | ----------------------- | ------------------------------- |
| get()            | SecretNote[]            | All notes in current query      |
| first()          | SecretNote \| undefined | First note                      |
| find(id)         | SecretNote \| undefined | Find by ID                      |
| findByName(name) | SecretNote \| undefined | Find by name (case-insensitive) |
| count()          | number                  | Number of notes                 |

## Examples

```ts
// All secret notes
secretNotes().notes().get();

// All journal scraps
secretNotes().journalScraps().get();

// Find a specific note
secretNotes().find("secret-note-15"); // Mermaid Show code
secretNotes().find("journal-scrap-7"); // Forging table
```

## Secret Notes (27 total)

Found in The Valley by obtaining a Magnifying Glass.

| Name            | Description (excerpt)                               |
| --------------- | --------------------------------------------------- |
| Secret Note #1  | Abigail's diary — her favorite gifts                |
| Secret Note #2  | Sam's holiday shopping list — gift preferences      |
| Secret Note #3  | Leah's handwriting — her favorite foods             |
| Secret Note #4  | Maru's parts list — her favorite items              |
| Secret Note #5  | Penny's gift list — preferences for family members  |
| Secret Note #6  | Stardrop Saloon special orders — gift preferences   |
| Secret Note #7  | Diary page about Harvey, Elliott, and Shane         |
| Secret Note #8  | Letter to Haley and Emily about their favorites     |
| Secret Note #9  | Alex's strength training diet                       |
| Secret Note #10 | Someone is waiting on level 100 of the Skull Cavern |
| Secret Note #11 | Image-only note — crow on a doormat                 |
| Secret Note #12 | Tips for finding items in garbage cans              |
| Secret Note #13 | Seasonal hint — check the bush above the playground |
| Secret Note #14 | Something hidden behind the Community Center        |
| Secret Note #15 | Mermaid Show code: 1-5-4-2-3                        |
| Secret Note #16 | Image-only note — fishing illustrations             |
| Secret Note #17 | Image-only note — crop growth stages                |
| Secret Note #18 | Image-only note — mining sequence                   |
| Secret Note #19 | Image-only note — puzzle scene                      |
| Secret Note #20 | Image-only note — puzzle scene                      |
| Secret Note #21 | Image-only note — puzzle scene                      |
| Secret Note #22 | Note from Mr. Qi about a secret in the dark tunnel  |
| Secret Note #23 | Phonetically spelled note about the Secret Woods    |
| Secret Note #24 | M. Jasper's book — lore about Junimos               |
| Secret Note #25 | A borrowed necklace lost near the bath house        |
| Secret Note #26 | Ancient Farming Secrets — raisin-fed Junimos        |
| Secret Note #27 | Grandpa's letter and hint about a hidden secret     |

## Journal Scraps (11 total)

Found on Ginger Island. Written by a shipwrecked sailor.

| Name              | Description (excerpt)                               |
| ----------------- | --------------------------------------------------- |
| Journal Scrap #1  | Day 1 — shipwreck and arrival on the island         |
| Journal Scrap #2  | Day 6 — fishing and golden walnuts                  |
| Journal Scrap #3  | Day 14 — finding golden walnuts                     |
| Journal Scrap #4  | Image-only — island map                             |
| Journal Scrap #5  | Day 23 — the volcano and the forge                  |
| Journal Scrap #6  | Image-only — island map                             |
| Journal Scrap #7  | Forging table — gem and enchantment reference       |
| Journal Scrap #8  | Weapon and tool enchantments reference              |
| Journal Scrap #9  | Poem about a mermaid and a stone arrangement puzzle |
| Journal Scrap #10 | Image-only — stone arrangement puzzle               |
| Journal Scrap #11 | Day 37 — combining rings in the forge               |

## SecretNote fields

| Field       | Type           | Description                                              |
| ----------- | -------------- | -------------------------------------------------------- |
| id          | string         | Unique kebab-case identifier                             |
| name        | string         | Display name (e.g. "Secret Note #1")                     |
| type        | SecretNoteType | Whether this is a secret-note or journal-scrap           |
| description | string         | Text content (image-only notes have a brief description) |

## SecretNoteType values

`"secret-note"` | `"journal-scrap"`
