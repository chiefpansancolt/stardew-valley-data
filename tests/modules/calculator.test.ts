import { qualityCalculator } from '@/modules/calculator';

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
