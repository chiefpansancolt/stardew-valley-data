import { getParserSet } from '../../src/save-file/parser-registry';

describe('getParserSet()', () => {
  it('returns the v1 parser set for API version 1', () => {
    const parserSet = getParserSet(1);
    expect(typeof parserSet).toBe('function');
  });

  it('falls back to the latest parser set for an unknown API version', () => {
    const parserSet = getParserSet(999);
    expect(typeof parserSet).toBe('function');

    const v1ParserSet = getParserSet(1);
    expect(parserSet).toBe(v1ParserSet);
  });

  it('falls back to the latest parser set for API version 0', () => {
    const parserSet = getParserSet(0);
    const v1ParserSet = getParserSet(1);
    expect(parserSet).toBe(v1ParserSet);
  });
});
