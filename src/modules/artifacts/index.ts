import { QueryBase } from '@/common/query-base';
import artifactData from '@/data/artifacts.json';
import { Artifact } from '@/types';

const allArtifactData: Artifact[] = artifactData as Artifact[];

/** Query builder for artifact data. All filter and sort methods return a new ArtifactQuery for chaining. */
export class ArtifactQuery extends QueryBase<Artifact> {
  constructor(data: Artifact[] = allArtifactData) {
    super(data);
  }

  /** Filter to artifacts with donation notes (most artifacts can be donated; these have additional reward notes). */
  withDonationNotes(): ArtifactQuery {
    return new ArtifactQuery(this.data.filter((a) => a.donationNotes !== null));
  }

  /** Filter to artifacts found via fishing treasure chests. */
  fromFishing(): ArtifactQuery {
    return new ArtifactQuery(
      this.data.filter((a) => a.locations.some((l) => l.toLowerCase().includes('fishing'))),
    );
  }

  /** Sort alphabetically by name. Default: 'asc'. */
  sortByName(order: 'asc' | 'desc' = 'asc'): ArtifactQuery {
    return new ArtifactQuery(
      [...this.data].sort((a, b) =>
        order === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name),
      ),
    );
  }

  /** Sort by sell price. Default: 'desc' (highest first). */
  sortBySellPrice(order: 'asc' | 'desc' = 'desc'): ArtifactQuery {
    return new ArtifactQuery(
      [...this.data].sort((a, b) =>
        order === 'asc' ? a.sellPrice - b.sellPrice : b.sellPrice - a.sellPrice,
      ),
    );
  }
}

/** Returns an ArtifactQuery for all artifact data. Pass `source` to wrap a pre-filtered array. */
export function artifacts(source: Artifact[] = allArtifactData): ArtifactQuery {
  return new ArtifactQuery(source);
}
