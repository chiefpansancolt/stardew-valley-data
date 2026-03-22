import { parseChildren, parseHorse, parsePet } from '../../../../src/save-file/parsers/v1/family';

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

describe('parsePet()', () => {
  it('parses a Pet from Farm', () => {
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

    const pet = parsePet(root);
    expect(pet).toEqual({
      name: 'Rufus',
      type: 'Dog',
      breed: 2,
      friendship: 1000,
    });
  });

  it('parses a Cat type NPC', () => {
    const root = {
      locations: {
        GameLocation: [
          {
            name: 'FarmHouse',
            characters: {
              NPC: [
                {
                  '@_xsi:type': 'Cat',
                  name: 'Whiskers',
                  petType: 'Cat',
                  whichBreed: 0,
                  friendshipTowardFarmer: 500,
                },
              ],
            },
          },
        ],
      },
    };

    const pet = parsePet(root);
    expect(pet).not.toBeNull();
    expect(pet!.name).toBe('Whiskers');
    expect(pet!.type).toBe('Cat');
  });

  it('parses a Dog type NPC', () => {
    const root = {
      locations: {
        GameLocation: [
          {
            name: 'Farm',
            characters: {
              NPC: [
                {
                  '@_xsi:type': 'Dog',
                  name: 'Buddy',
                  whichBreed: 1,
                  friendshipTowardFarmer: 750,
                },
              ],
            },
          },
        ],
      },
    };

    const pet = parsePet(root);
    expect(pet).not.toBeNull();
    expect(pet!.type).toBe('Dog');
  });

  it('uses xsiType as fallback for petType when missing', () => {
    const root = {
      locations: {
        GameLocation: [
          {
            name: 'Farm',
            characters: {
              NPC: [
                {
                  '@_xsi:type': 'Cat',
                  name: 'Kitty',
                  whichBreed: 0,
                  friendshipTowardFarmer: 200,
                },
              ],
            },
          },
        ],
      },
    };

    const pet = parsePet(root);
    expect(pet!.type).toBe('Cat');
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

    const pet = parsePet(root);
    expect(pet).not.toBeNull();
    expect(pet!.name).toBe('Rex');
  });

  it('returns null when no pet found', () => {
    const root = {
      locations: {
        GameLocation: [
          {
            name: 'Farm',
            characters: {
              NPC: [{ '@_xsi:type': 'NPC', name: 'Robin' }],
            },
          },
        ],
      },
    };

    expect(parsePet(root)).toBeNull();
  });

  it('returns null when no Farm or FarmHouse locations', () => {
    const root = {
      locations: {
        GameLocation: [{ name: 'Town' }],
      },
    };

    expect(parsePet(root)).toBeNull();
  });

  it('returns null for empty root', () => {
    expect(parsePet({})).toBeNull();
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
