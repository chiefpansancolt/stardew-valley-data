import { parseCommunityCenter } from '../../../../src/save-file/parsers/v1/community-center';

describe('parseCommunityCenter()', () => {
  it('returns all false when no mail flags or events are present', () => {
    const result = parseCommunityCenter(new Set(), new Set());
    expect(result.unlocked).toBe(false);
    expect(result.bundlesActive).toBe(false);
    expect(result.completed).toBe(false);
    expect(result.ceremonyAttended).toBe(false);
    expect(result.jojaAbandoned).toBe(false);
    expect(result.rooms.boilerRoom).toBe(false);
    expect(result.rooms.craftsRoom).toBe(false);
    expect(result.rooms.pantry).toBe(false);
    expect(result.rooms.fishTank).toBe(false);
    expect(result.rooms.vault).toBe(false);
    expect(result.rooms.bulletin).toBe(false);
  });

  it('detects unlocked from ccDoorUnlock mail flag', () => {
    const result = parseCommunityCenter(new Set(['ccDoorUnlock']), new Set());
    expect(result.unlocked).toBe(true);
  });

  it('detects bundlesActive from wizardJunimoNote mail flag', () => {
    const result = parseCommunityCenter(new Set(['wizardJunimoNote']), new Set());
    expect(result.bundlesActive).toBe(true);
  });

  it('detects completed from ccIsComplete mail flag', () => {
    const result = parseCommunityCenter(new Set(['ccIsComplete']), new Set());
    expect(result.completed).toBe(true);
  });

  it('detects ceremonyAttended from event 191393', () => {
    const result = parseCommunityCenter(new Set(), new Set(['191393']));
    expect(result.ceremonyAttended).toBe(true);
  });

  it('detects jojaAbandoned from abandonedJojaMartAccessible mail flag', () => {
    const result = parseCommunityCenter(new Set(['abandonedJojaMartAccessible']), new Set());
    expect(result.jojaAbandoned).toBe(true);
  });

  it('parses all room completions', () => {
    const mail = new Set([
      'ccBoilerRoom',
      'ccCraftsRoom',
      'ccPantry',
      'ccFishTank',
      'ccVault',
      'ccBulletin',
    ]);
    const result = parseCommunityCenter(mail, new Set());
    expect(result.rooms.boilerRoom).toBe(true);
    expect(result.rooms.craftsRoom).toBe(true);
    expect(result.rooms.pantry).toBe(true);
    expect(result.rooms.fishTank).toBe(true);
    expect(result.rooms.vault).toBe(true);
    expect(result.rooms.bulletin).toBe(true);
  });

  it('parses partial room completions', () => {
    const mail = new Set(['ccPantry', 'ccVault']);
    const result = parseCommunityCenter(mail, new Set());
    expect(result.rooms.pantry).toBe(true);
    expect(result.rooms.vault).toBe(true);
    expect(result.rooms.boilerRoom).toBe(false);
    expect(result.rooms.craftsRoom).toBe(false);
    expect(result.rooms.fishTank).toBe(false);
    expect(result.rooms.bulletin).toBe(false);
  });

  it('parses a fully completed community center', () => {
    const mail = new Set([
      'ccDoorUnlock',
      'wizardJunimoNote',
      'ccIsComplete',
      'ccBoilerRoom',
      'ccCraftsRoom',
      'ccPantry',
      'ccFishTank',
      'ccVault',
      'ccBulletin',
    ]);
    const events = new Set(['191393']);
    const result = parseCommunityCenter(mail, events);
    expect(result.unlocked).toBe(true);
    expect(result.bundlesActive).toBe(true);
    expect(result.completed).toBe(true);
    expect(result.ceremonyAttended).toBe(true);
    expect(result.jojaAbandoned).toBe(false);
  });
});
