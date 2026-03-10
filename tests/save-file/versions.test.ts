import {
  LATEST_API_VERSION,
  resolveApiVersion,
  VERSION_RANGES,
} from '../../src/save-file/versions';

describe('resolveApiVersion()', () => {
  it('returns 1 for game version 1.6.0', () => {
    expect(resolveApiVersion('1.6.0')).toBe(1);
  });

  it('returns 1 for game version 1.5.0', () => {
    expect(resolveApiVersion('1.5.0')).toBe(1);
  });

  it('returns 1 for game version 1.0.0', () => {
    expect(resolveApiVersion('1.0.0')).toBe(1);
  });

  it('returns 1 for a future version like 2.0.0', () => {
    expect(resolveApiVersion('2.0.0')).toBe(1);
  });

  it('returns LATEST_API_VERSION for a version below all ranges', () => {
    expect(resolveApiVersion('0.0.1')).toBe(LATEST_API_VERSION);
  });

  it('returns LATEST_API_VERSION for version 0.0.0', () => {
    expect(resolveApiVersion('0.0.0')).toBe(LATEST_API_VERSION);
  });

  it('handles version strings with fewer segments than the range', () => {
    expect(resolveApiVersion('1.6')).toBe(1);
    expect(resolveApiVersion('1')).toBe(1);
  });

  it('handles version strings with more segments than the range', () => {
    expect(resolveApiVersion('1.0.0.1')).toBe(1);
  });
});

describe('LATEST_API_VERSION', () => {
  it('is 1', () => {
    expect(LATEST_API_VERSION).toBe(1);
  });
});

describe('bounded version range (maxVersion !== null)', () => {
  it('matches a version within a bounded range', () => {
    const original = [...VERSION_RANGES];
    VERSION_RANGES.length = 0;
    VERSION_RANGES.push({ minVersion: '1.0.0', maxVersion: '1.5.99', apiVersion: 1 });
    VERSION_RANGES.push({ minVersion: '1.6.0', maxVersion: null, apiVersion: 2 });
    try {
      expect(resolveApiVersion('1.4.0')).toBe(1);
      expect(resolveApiVersion('1.6.0')).toBe(2);
      expect(resolveApiVersion('1.6.14')).toBe(2);
    } finally {
      VERSION_RANGES.length = 0;
      VERSION_RANGES.push(...original);
    }
  });

  it('falls back when version exceeds bounded range', () => {
    const original = [...VERSION_RANGES];
    VERSION_RANGES.length = 0;
    VERSION_RANGES.push({ minVersion: '1.0.0', maxVersion: '1.5.99', apiVersion: 1 });
    try {
      expect(resolveApiVersion('1.6.0')).toBe(LATEST_API_VERSION);
    } finally {
      VERSION_RANGES.length = 0;
      VERSION_RANGES.push(...original);
    }
  });
});
