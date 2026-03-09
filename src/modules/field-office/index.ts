import { QueryBase } from '@/common/query-base';
import fieldOfficeData from '@/data/field-office.json';
import { FieldOfficeCollection, FieldOfficeCollectionData, FieldOfficeDonation } from '@/types';

const allFieldOfficeData: FieldOfficeCollectionData[] =
  fieldOfficeData as FieldOfficeCollectionData[];

const allDonations: FieldOfficeDonation[] = allFieldOfficeData.flatMap((c) => c.donations);

/** Query builder for Island Field Office fossil collection data. All filter and sort methods return a new FieldOfficeQuery for chaining. */
export class FieldOfficeQuery extends QueryBase<FieldOfficeCollectionData> {
  constructor(data: FieldOfficeCollectionData[] = allFieldOfficeData) {
    super(data);
  }

  /** Filter to a specific collection by ID. */
  byCollection(id: FieldOfficeCollection): FieldOfficeQuery {
    return new FieldOfficeQuery(this.data.filter((c) => c.id === id));
  }

  /** Sort by name alphabetically. */
  sortByName(order: 'asc' | 'desc' = 'asc'): FieldOfficeQuery {
    return new FieldOfficeQuery(
      [...this.data].sort((a, b) => {
        const cmp = a.name.localeCompare(b.name);
        return order === 'asc' ? cmp : -cmp;
      }),
    );
  }
}

/** Query builder for individual Island Field Office donation items. All filter and sort methods return a new FieldOfficeDonationQuery for chaining. */
export class FieldOfficeDonationQuery extends QueryBase<FieldOfficeDonation> {
  constructor(data: FieldOfficeDonation[] = allDonations) {
    super(data);
  }

  /** Filter to donations belonging to the specified collection. */
  byCollection(id: FieldOfficeCollection): FieldOfficeDonationQuery {
    return new FieldOfficeDonationQuery(this.data.filter((d) => d.collection === id));
  }

  /** Sort by name alphabetically. */
  sortByName(order: 'asc' | 'desc' = 'asc'): FieldOfficeDonationQuery {
    return new FieldOfficeDonationQuery(
      [...this.data].sort((a, b) => {
        const cmp = a.name.localeCompare(b.name);
        return order === 'asc' ? cmp : -cmp;
      }),
    );
  }
}

/** Returns a FieldOfficeQuery for all Island Field Office collections. Pass `source` to wrap a pre-filtered array. */
export function fieldOffice(
  source: FieldOfficeCollectionData[] = allFieldOfficeData,
): FieldOfficeQuery {
  return new FieldOfficeQuery(source);
}

/** Returns a FieldOfficeDonationQuery for all individual fossil donation items. Pass `source` to wrap a pre-filtered array. */
export function fieldOfficeDonations(
  source: FieldOfficeDonation[] = allDonations,
): FieldOfficeDonationQuery {
  return new FieldOfficeDonationQuery(source);
}
