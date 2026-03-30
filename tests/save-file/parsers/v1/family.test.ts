import { parseChildren, parseHorse, parsePets } from '../../../../src/save-file/parsers/v1/family';

describe('parseChildren()', () => {
  it('parses children from FarmHouse', () => {
    const root = {
      locations: {
        GameLocation: [
          {
            name: 'FarmHouse',
            characters: {
              NPC: [
                {
                  '@_xsi:type': 'Child',
                  name: 'Timmy',
                  daysOld: 56,
                  Gender: 'Male',
                },
                {
                  '@_xsi:type': 'Child',
                  name: 'Sally',
                  daysOld: 28,
                  Gender: 'Female',
                },
              ],
            },
          },
        ],
      },
    };

    const children = parseChildren(root);
    expect(children).toHaveLength(2);
    expect(children[0]).toEqual({ name: 'Timmy', age: 56, gender: 'Male' });
    expect(children[1]).toEqual({ name: 'Sally', age: 28, gender: 'Female' });
  });

  it('filters out non-Child NPCs', () => {
    const root = {
      locations: {
        GameLocation: [
          {
            name: 'FarmHouse',
            characters: {
              NPC: [
                {
                  '@_xsi:type': 'NPC',
                  name: 'Emily',
                },
                {
                  '@_xsi:type': 'Child',
                  name: 'Junior',
                  daysOld: 10,
                  Gender: 'Male',
                },
              ],
            },
          },
        ],
      },
    };

    const children = parseChildren(root);
    expect(children).toHaveLength(1);
    expect(children[0].name).toBe('Junior');
  });

  it('uses @_type fallback for type detection', () => {
    const root = {
      locations: {
        GameLocation: [
          {
            name: 'FarmHouse',
            characters: {
              NPC: [
                {
                  '@_type': 'Child',
                  name: 'Baby',
                  daysOld: 5,
                  Gender: 'Female',
                },
              ],
            },
          },
        ],
      },
    };

    const children = parseChildren(root);
    expect(children).toHaveLength(1);
  });

  it('returns empty array when no FarmHouse location', () => {
    const root = {
      locations: {
        GameLocation: [{ name: 'Town' }],
      },
    };

    expect(parseChildren(root)).toEqual([]);
  });

  it('returns empty array for empty root', () => {
    expect(parseChildren({})).toEqual([]);
  });

  it('skips NPCs with no type attribute at all', () => {
    const root = {
      locations: {
        GameLocation: [
          {
            name: 'FarmHouse',
            characters: {
              NPC: [
                {
                  name: 'NoType',
                  daysOld: 10,
                  Gender: 'Male',
                },
              ],
            },
          },
        ],
      },
    };

    const children = parseChildren(root);
    expect(children).toHaveLength(0);
  });

  it('defaults gender to Unknown when missing', () => {
    const root = {
      locations: {
        GameLocation: [
          {
            name: 'FarmHouse',
            characters: {
              NPC: [
                {
                  '@_xsi:type': 'Child',
                  name: 'NoGender',
                  daysOld: 1,
                },
              ],
            },
          },
        ],
      },
    };

    const children = parseChildren(root);
    expect(children[0].gender).toBe('Unknown');
  });
});

describe('parsePets()', () => {
  const makePlayer = (type = 'Dog', breed = 2) => ({ whichPetType: type, whichPetBreed: breed });

  it('returns all pets from Farm as an array', () => {
    const root = {
      locations: {
        GameLocation: [
          {
            name: 'Farm',
            characters: {
              NPC: [
                {
                  '@_xsi:type': 'Pet',
                  name: 'Rufus',
                  petType: 'Dog',
                  whichBreed: 2,
                  friendshipTowardFarmer: 1000,
                },
                {
                  '@_xsi:type': 'Pet',
                  name: 'Gimi',
                  petType: 'Turtle',
                  whichBreed: 0,
                  friendshipTowardFarmer: 500,
                },
              ],
            },
          },
        ],
      },
    };

    const pets = parsePets(root, makePlayer('Dog', 2));
    expect(pets).toHaveLength(2);
    expect(pets[0]).toEqual({
      name: 'Rufus',
      type: 'Dog',
      breed: 2,
      friendship: 1000,
      starter: true,
    });
    expect(pets[1]).toEqual({
      name: 'Gimi',
      type: 'Turtle',
      breed: 0,
      friendship: 500,
      starter: false,
    });
  });

  it('tags starter pet by matching whichPetType and whichPetBreed', () => {
    const root = {
      locations: {
        GameLocation: [
          {
            name: 'Farm',
            characters: {
              NPC: [
                {
                  '@_xsi:type': 'Pet',
                  name: 'Yogi',
                  petType: 'Dog',
                  whichBreed: 2,
                  friendshipTowardFarmer: 1000,
                },
                {
                  '@_xsi:type': 'Pet',
                  name: 'Gimi',
                  petType: 'Turtle',
                  whichBreed: 0,
                  friendshipTowardFarmer: 200,
                },
              ],
            },
          },
        ],
      },
    };

    const pets = parsePets(root, makePlayer('Dog', 2));
    expect(pets.find((p) => p.name === 'Yogi')?.starter).toBe(true);
    expect(pets.find((p) => p.name === 'Gimi')?.starter).toBe(false);
  });

  it('finds pets across Farm and FarmHouse locations', () => {
    const root = {
      locations: {
        GameLocation: [
          {
            name: 'Farm',
            characters: {
              NPC: [
                {
                  '@_xsi:type': 'Pet',
                  name: 'Rufus',
                  petType: 'Dog',
                  whichBreed: 2,
                  friendshipTowardFarmer: 1000,
                },
              ],
            },
          },
          {
            name: 'FarmHouse',
            characters: {
              NPC: [
                {
                  '@_xsi:type': 'Pet',
                  name: 'Kitty',
                  petType: 'Cat',
                  whichBreed: 0,
                  friendshipTowardFarmer: 300,
                },
              ],
            },
          },
        ],
      },
    };

    const pets = parsePets(root, makePlayer('Cat', 0));
    expect(pets).toHaveLength(2);
    expect(pets.find((p) => p.name === 'Kitty')?.starter).toBe(true);
  });

  it('uses xsiType as fallback for petType when missing', () => {
    const root = {
      locations: {
        GameLocation: [
          {
            name: 'Farm',
            characters: {
              NPC: [
                { '@_xsi:type': 'Cat', name: 'Kitty', whichBreed: 0, friendshipTowardFarmer: 200 },
              ],
            },
          },
        ],
      },
    };

    const pets = parsePets(root, makePlayer('Cat', 0));
    expect(pets[0].type).toBe('Cat');
    expect(pets[0].starter).toBe(true);
  });

  it('uses @_type fallback', () => {
    const root = {
      locations: {
        GameLocation: [
          {
            name: 'Farm',
            characters: {
              NPC: [
                {
                  '@_type': 'Pet',
                  name: 'Rex',
                  petType: 'Dog',
                  whichBreed: 3,
                  friendshipTowardFarmer: 100,
                },
              ],
            },
          },
        ],
      },
    };

    const pets = parsePets(root, makePlayer('Dog', 3));
    expect(pets[0].name).toBe('Rex');
    expect(pets[0].starter).toBe(true);
  });

  it('returns empty array when no pets found', () => {
    const root = {
      locations: {
        GameLocation: [
          { name: 'Farm', characters: { NPC: [{ '@_xsi:type': 'NPC', name: 'Robin' }] } },
        ],
      },
    };
    expect(parsePets(root, makePlayer())).toEqual([]);
  });

  it('returns empty array when no Farm or FarmHouse locations', () => {
    const root = { locations: { GameLocation: [{ name: 'Town' }] } };
    expect(parsePets(root, makePlayer())).toEqual([]);
  });

  it('returns empty array for empty root', () => {
    expect(parsePets({}, makePlayer())).toEqual([]);
  });

  it('marks no pet as starter when player data missing', () => {
    const root = {
      locations: {
        GameLocation: [
          {
            name: 'Farm',
            characters: {
              NPC: [
                {
                  '@_xsi:type': 'Pet',
                  name: 'Rufus',
                  petType: 'Dog',
                  whichBreed: 2,
                  friendshipTowardFarmer: 1000,
                },
              ],
            },
          },
        ],
      },
    };
    const pets = parsePets(root, {});
    expect(pets[0].starter).toBe(false);
  });
});

describe('parseHorse()', () => {
  it('parses a horse from Farm', () => {
    const root = {
      locations: {
        GameLocation: [
          {
            name: 'Farm',
            characters: {
              NPC: [
                {
                  '@_xsi:type': 'Horse',
                  name: 'Grover',
                  HorseId: '5813e9f9-393b-45da-99de-dc07e3164d14',
                },
              ],
            },
          },
        ],
      },
    };

    const horse = parseHorse(root);
    expect(horse).toEqual({
      name: 'Grover',
      type: 'horse',
      id: '5813e9f9-393b-45da-99de-dc07e3164d14',
    });
  });

  it('uses @_type fallback', () => {
    const root = {
      locations: {
        GameLocation: [
          {
            name: 'Farm',
            characters: {
              NPC: [
                {
                  '@_type': 'Horse',
                  name: 'Spirit',
                  HorseId: 'abc-123',
                },
              ],
            },
          },
        ],
      },
    };

    const horse = parseHorse(root);
    expect(horse).not.toBeNull();
    expect(horse!.name).toBe('Spirit');
  });

  it('returns null when no horse found', () => {
    const root = {
      locations: {
        GameLocation: [
          {
            name: 'Farm',
            characters: {
              NPC: [{ '@_xsi:type': 'Pet', name: 'Rufus' }],
            },
          },
        ],
      },
    };

    expect(parseHorse(root)).toBeNull();
  });

  it('returns null when no Farm location', () => {
    const root = {
      locations: {
        GameLocation: [{ name: 'Town' }],
      },
    };

    expect(parseHorse(root)).toBeNull();
  });

  it('returns null for empty root', () => {
    expect(parseHorse({})).toBeNull();
  });

  it('ignores horses in non-Farm locations', () => {
    const root = {
      locations: {
        GameLocation: [
          {
            name: 'Town',
            characters: {
              NPC: [
                {
                  '@_xsi:type': 'Horse',
                  name: 'Stray',
                  HorseId: 'xyz-789',
                },
              ],
            },
          },
        ],
      },
    };

    expect(parseHorse(root)).toBeNull();
  });
});
