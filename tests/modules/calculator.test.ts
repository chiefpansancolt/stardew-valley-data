import {
  artisanCalculator,
  knowledgeCalculator,
  professionCalculator,
  qualityCalculator,
} from '@/modules/calculator';

describe('QualityCalculator', () => {
  const calc = qualityCalculator();

  describe('sellPrices()', () => {
    it('returns silver, gold, iridium prices', () => {
      const prices = calc.sellPrices(100);
      expect(prices).toHaveLength(3);
      expect(prices.map((p) => p.quality)).toEqual(['silver', 'gold', 'iridium']);
    });

    it('applies correct multipliers (floor)', () => {
      const prices = calc.sellPrices(100);
      expect(prices[0].value).toBe(125); // 100 * 1.25
      expect(prices[1].value).toBe(150); // 100 * 1.5
      expect(prices[2].value).toBe(200); // 100 * 2
    });

    it('floors fractional results', () => {
      const prices = calc.sellPrices(33);
      expect(prices[0].value).toBe(41); // floor(33 * 1.25) = 41
      expect(prices[1].value).toBe(49); // floor(33 * 1.5) = 49
      expect(prices[2].value).toBe(66); // floor(33 * 2) = 66
    });

    it('handles zero base price', () => {
      const prices = calc.sellPrices(0);
      for (const p of prices) {
        expect(p.value).toBe(0);
      }
    });

    it('includes quality icon paths', () => {
      const prices = calc.sellPrices(100);
      for (const p of prices) {
        expect(p.icon).toContain('Quality.png');
      }
    });
  });

  describe('energyHealth()', () => {
    it('returns silver, gold, iridium values', () => {
      const values = calc.energyHealth(100, 45);
      expect(values).toHaveLength(3);
      expect(values.map((v) => v.quality)).toEqual(['silver', 'gold', 'iridium']);
    });

    it('applies correct multipliers (floor)', () => {
      const values = calc.energyHealth(100, 45);
      expect(values[0].energy).toBe(140); // floor(100 * 1.4)
      expect(values[0].health).toBe(Math.floor(45 * 1.4));
      expect(values[1].energy).toBe(Math.floor(100 * 1.8));
      expect(values[1].health).toBe(Math.floor(45 * 1.8));
      expect(values[2].energy).toBe(Math.floor(100 * 2.6));
      expect(values[2].health).toBe(Math.floor(45 * 2.6));
    });
  });
});

describe('artisanCalculator()', () => {
  const calc = artisanCalculator();

  it('roe(): 30 + floor(baseFishPrice / 2)', () => {
    expect(calc.roe(200).sellPrice).toBe(130); // 30 + floor(200/2) = 130
    expect(calc.roe(100).sellPrice).toBe(80);
    expect(calc.roe(101).sellPrice).toBe(80); // floor(101/2) = 50
  });

  it('agedRoe(): 60 + baseFishPrice', () => {
    expect(calc.agedRoe(200).sellPrice).toBe(260);
    expect(calc.agedRoe(0).sellPrice).toBe(60);
  });

  it('honey(): 100 + baseFlowerPrice * 2', () => {
    expect(calc.honey(0).sellPrice).toBe(100); // wild honey
    expect(calc.honey(80).sellPrice).toBe(260); // tulip honey
  });

  it('wine(): floor(baseFruitPrice * 3) with energy/health x1.75', () => {
    const result = calc.wine(100, 40, 18);
    expect(result.sellPrice).toBe(300); // floor(100 * 3)
    expect(result.energy).toBe(70); // floor(40 * 1.75)
    expect(result.health).toBe(31); // floor(18 * 1.75)
  });

  it('juice(): floor(basePrice * 2.25) with energy/health x2', () => {
    const result = calc.juice(100, 40, 18);
    expect(result.sellPrice).toBe(225); // floor(100 * 2.25)
    expect(result.energy).toBe(80); // floor(40 * 2)
    expect(result.health).toBe(36); // floor(18 * 2)
  });

  it('pickles(): floor(basePrice * 2) + 50 with energy/health x1.75', () => {
    const result = calc.pickles(100, 40, 18);
    expect(result.sellPrice).toBe(250); // floor(100 * 2) + 50
    expect(result.energy).toBe(70); // floor(40 * 1.75)
    expect(result.health).toBe(31); // floor(18 * 1.75)
  });

  it('jelly(): floor(baseFruitPrice * 2) + 50 with energy/health x2', () => {
    const result = calc.jelly(100, 40, 18);
    expect(result.sellPrice).toBe(250); // floor(100 * 2) + 50
    expect(result.energy).toBe(80);
    expect(result.health).toBe(36);
  });

  it('driedMushrooms(): floor(basePrice * 7.5) + 25 with energy/health x3', () => {
    const result = calc.driedMushrooms(40, 20, 9);
    expect(result.sellPrice).toBe(325); // floor(40 * 7.5) + 25
    expect(result.energy).toBe(60); // floor(20 * 3)
    expect(result.health).toBe(27); // floor(9 * 3)
  });

  it('driedFruit(): floor(baseFruitPrice * 7.5) with energy/health x3', () => {
    const result = calc.driedFruit(40, 20, 9);
    expect(result.sellPrice).toBe(300); // floor(40 * 7.5)
    expect(result.energy).toBe(60);
    expect(result.health).toBe(27);
  });

  it('smokedFish(): floor(baseFishPrice * 2) with energy/health x1.5', () => {
    const result = calc.smokedFish(100, 40, 18);
    expect(result.sellPrice).toBe(200); // floor(100 * 2)
    expect(result.energy).toBe(60); // floor(40 * 1.5)
    expect(result.health).toBe(27); // floor(18 * 1.5)
  });

  it('artisanCalculator() factory returns an ArtisanCalculator', () => {
    const ac = artisanCalculator();
    expect(ac.roe(100).sellPrice).toBe(80);
  });
});

describe('ProfessionCalculator', () => {
  const calc = professionCalculator();

  it('artisan(): floor(price * 1.4)', () => {
    expect(calc.artisan(100)).toBe(140);
    expect(calc.artisan(2250)).toBe(3150); // Starfruit Wine
    expect(calc.artisan(33)).toBe(46); // floor(33 * 1.4) = 46
  });

  it('rancher(): floor(price * 1.2)', () => {
    expect(calc.rancher(100)).toBe(120);
    expect(calc.rancher(625)).toBe(750); // Truffle
    expect(calc.rancher(33)).toBe(39); // floor(33 * 1.2) = 39
  });

  it('tiller(): floor(price * 1.1)', () => {
    expect(calc.tiller(100)).toBe(110);
    expect(calc.tiller(750)).toBe(825); // Starfruit
    expect(calc.tiller(33)).toBe(36); // floor(33 * 1.1) = 36
  });

  it('blacksmith(): floor(price * 1.5)', () => {
    expect(calc.blacksmith(100)).toBe(150);
    expect(calc.blacksmith(250)).toBe(375); // Gold Bar
    expect(calc.blacksmith(33)).toBe(49); // floor(33 * 1.5) = 49
  });

  it('gemologist(): floor(price * 1.3)', () => {
    expect(calc.gemologist(100)).toBe(130);
    expect(calc.gemologist(750)).toBe(975); // Diamond
    expect(calc.gemologist(33)).toBe(42); // floor(33 * 1.3) = 42
  });

  it('tapper(): floor(price * 1.25)', () => {
    expect(calc.tapper(100)).toBe(125);
    expect(calc.tapper(150)).toBe(187); // Oak Resin
    expect(calc.tapper(33)).toBe(41); // floor(33 * 1.25) = 41
  });

  it('fisher(): floor(price * 1.25)', () => {
    expect(calc.fisher(100)).toBe(125);
    expect(calc.fisher(200)).toBe(250); // Catfish
    expect(calc.fisher(33)).toBe(41); // floor(33 * 1.25) = 41
  });

  it('angler(): floor(price * 1.5)', () => {
    expect(calc.angler(100)).toBe(150);
    expect(calc.angler(5000)).toBe(7500); // Legend
    expect(calc.angler(33)).toBe(49); // floor(33 * 1.5) = 49
  });

  it('handles zero price', () => {
    expect(calc.artisan(0)).toBe(0);
    expect(calc.rancher(0)).toBe(0);
    expect(calc.tiller(0)).toBe(0);
    expect(calc.blacksmith(0)).toBe(0);
    expect(calc.gemologist(0)).toBe(0);
    expect(calc.tapper(0)).toBe(0);
    expect(calc.fisher(0)).toBe(0);
    expect(calc.angler(0)).toBe(0);
  });

  it('professionCalculator() factory returns a ProfessionCalculator', () => {
    const pc = professionCalculator();
    expect(pc.artisan(100)).toBe(140);
  });
});

describe('KnowledgeCalculator', () => {
  const calc = knowledgeCalculator();

  it('springOnionMastery(): floor(price * 5)', () => {
    expect(calc.springOnionMastery(8)).toBe(40); // Spring Onion: 8 * 5
    expect(calc.springOnionMastery(100)).toBe(500);
    expect(calc.springOnionMastery(33)).toBe(165); // floor(33 * 5) = 165
  });

  it('bearsKnowledge(): floor(price * 3)', () => {
    expect(calc.bearsKnowledge(20)).toBe(60); // Blackberry: 20 * 3
    expect(calc.bearsKnowledge(5)).toBe(15); // Salmonberry: 5 * 3
    expect(calc.bearsKnowledge(33)).toBe(99); // floor(33 * 3) = 99
  });

  it('handles zero price', () => {
    expect(calc.springOnionMastery(0)).toBe(0);
    expect(calc.bearsKnowledge(0)).toBe(0);
  });

  it('knowledgeCalculator() factory returns a KnowledgeCalculator', () => {
    const kc = knowledgeCalculator();
    expect(kc.springOnionMastery(8)).toBe(40);
  });
});
