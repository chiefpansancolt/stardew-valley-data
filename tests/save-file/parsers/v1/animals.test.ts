import { parseAnimals } from '../../../../src/save-file/parsers/v1/animals';

describe('parseAnimals()', () => {
  it('parses animals from farm buildings', () => {
    const root = {
      locations: {
        GameLocation: [
          {
            name: 'Farm',
            buildings: {
              Building: [
                {
                  indoors: {
                    animals: {
                      item: [
                        {
                          value: {
                            FarmAnimal: {
                              myID: '12345',
                              name: 'Bessie',
                              type: 'White Cow',
                              buildingTypeILiveIn: 'Barn',
                              friendshipTowardFarmer: 800,
                              happiness: 200,
                              age: 30,
                              hasEatenAnimalCracker: true,
                            },
                          },
                        },
                      ],
                    },
                  },
                },
              ],
            },
          },
        ],
      },
    };

    const animals = parseAnimals(root);
    expect(animals).toHaveLength(1);
    expect(animals[0]).toEqual({
      id: '12345',
      name: 'Bessie',
      type: 'White Cow',
      buildingType: 'Barn',
      friendship: 800,
      happiness: 200,
      age: 30,
      hasAnimalCracker: true,
    });
  });

  it('handles FarmAnimal as array (fast-xml-parser)', () => {
    const root = {
      locations: {
        GameLocation: [
          {
            name: 'Farm',
            buildings: {
              Building: [
                {
                  indoors: {
                    animals: {
                      item: [
                        {
                          value: {
                            FarmAnimal: [
                              {
                                myID: '111',
                                name: 'Clucky',
                                type: 'White Chicken',
                                buildingTypeILiveIn: 'Coop',
                                friendshipTowardFarmer: 500,
                                happiness: 150,
                                age: 10,
                                hasEatenAnimalCracker: 'true',
                              },
                            ],
                          },
                        },
                      ],
                    },
                  },
                },
              ],
            },
          },
        ],
      },
    };

    const animals = parseAnimals(root);
    expect(animals).toHaveLength(1);
    expect(animals[0].name).toBe('Clucky');
    expect(animals[0].hasAnimalCracker).toBe(true);
  });

  it('skips buildings without indoors', () => {
    const root = {
      locations: {
        GameLocation: [
          {
            name: 'Farm',
            buildings: {
              Building: [{ buildingType: 'Silo' }],
            },
          },
        ],
      },
    };

    expect(parseAnimals(root)).toEqual([]);
  });

  it('skips animal items without FarmAnimal data', () => {
    const root = {
      locations: {
        GameLocation: [
          {
            name: 'Farm',
            buildings: {
              Building: [
                {
                  indoors: {
                    animals: {
                      item: [{ value: {} }],
                    },
                  },
                },
              ],
            },
          },
        ],
      },
    };

    expect(parseAnimals(root)).toEqual([]);
  });

  it('returns empty array when no Farm location', () => {
    const root = {
      locations: {
        GameLocation: [{ name: 'Town' }],
      },
    };

    expect(parseAnimals(root)).toEqual([]);
  });

  it('returns empty array for empty root', () => {
    expect(parseAnimals({})).toEqual([]);
  });

  it('handles hasEatenAnimalCracker as false', () => {
    const root = {
      locations: {
        GameLocation: [
          {
            name: 'Farm',
            buildings: {
              Building: [
                {
                  indoors: {
                    animals: {
                      item: [
                        {
                          value: {
                            FarmAnimal: {
                              myID: '999',
                              name: 'Daisy',
                              type: 'Goat',
                              buildingTypeILiveIn: 'Barn',
                              friendshipTowardFarmer: 100,
                              happiness: 50,
                              age: 5,
                              hasEatenAnimalCracker: false,
                            },
                          },
                        },
                      ],
                    },
                  },
                },
              ],
            },
          },
        ],
      },
    };

    const animals = parseAnimals(root);
    expect(animals[0].hasAnimalCracker).toBe(false);
  });

  it('parses multiple animals across multiple buildings', () => {
    const root = {
      locations: {
        GameLocation: [
          {
            name: 'Farm',
            buildings: {
              Building: [
                {
                  indoors: {
                    animals: {
                      item: [
                        {
                          value: {
                            FarmAnimal: {
                              myID: '1',
                              name: 'A',
                              type: 'Cow',
                              buildingTypeILiveIn: 'Barn',
                              friendshipTowardFarmer: 0,
                              happiness: 0,
                              age: 0,
                              hasEatenAnimalCracker: false,
                            },
                          },
                        },
                      ],
                    },
                  },
                },
                {
                  indoors: {
                    animals: {
                      item: [
                        {
                          value: {
                            FarmAnimal: {
                              myID: '2',
                              name: 'B',
                              type: 'Chicken',
                              buildingTypeILiveIn: 'Coop',
                              friendshipTowardFarmer: 0,
                              happiness: 0,
                              age: 0,
                              hasEatenAnimalCracker: false,
                            },
                          },
                        },
                      ],
                    },
                  },
                },
              ],
            },
          },
        ],
      },
    };

    const animals = parseAnimals(root);
    expect(animals).toHaveLength(2);
    expect(animals[0].name).toBe('A');
    expect(animals[1].name).toBe('B');
  });
});
