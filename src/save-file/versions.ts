/** A mapping from a game version range to an API version. */
export interface VersionRange {
  minVersion: string;
  maxVersion: string | null;
  apiVersion: number;
}

/**
 * Game version ranges and their corresponding API versions.
 * Ranges are checked in order — the first match wins.
 * A `null` maxVersion means "up to any future version" (open-ended).
 */
const VERSION_RANGES: VersionRange[] = [{ minVersion: '1.0.0', maxVersion: null, apiVersion: 1 }];

/** The latest API version supported by this package. */
export const LATEST_API_VERSION = 1;

/**
 * Compare two semver-style version strings (e.g. "1.6.14").
 * Returns -1 if a < b, 0 if equal, 1 if a > b.
 */
function compareVersions(a: string, b: string): number {
  const pa = a.split('.').map(Number);
  const pb = b.split('.').map(Number);
  const len = Math.max(pa.length, pb.length);
  for (let i = 0; i < len; i++) {
    const na = pa[i] ?? 0;
    const nb = pb[i] ?? 0;
    if (na < nb) return -1;
    if (na > nb) return 1;
  }
  return 0;
}

/**
 * Resolve a game version string to the corresponding API version number.
 * Returns the API version for the first matching range, or the latest API version
 * if no range matches (forward-compatible default).
 */
export function resolveApiVersion(gameVersion: string): number {
  for (const range of VERSION_RANGES) {
    const aboveMin = compareVersions(gameVersion, range.minVersion) >= 0;
    const belowMax =
      range.maxVersion === null || compareVersions(gameVersion, range.maxVersion) <= 0;
    if (aboveMin && belowMax) {
      return range.apiVersion;
    }
  }
  return LATEST_API_VERSION;
}
