import { QueryBase } from '@/common/query-base';
import medicalSuppliesData from '@/data/medical-supplies.json';
import { MedicalSupply } from '@/types';

const allMedicalSuppliesData: MedicalSupply[] = medicalSuppliesData as MedicalSupply[];

/** Query builder for Harvey's Clinic medical supplies. All filter and sort methods return a new MedicalSupplyQuery for chaining. */
export class MedicalSupplyQuery extends QueryBase<MedicalSupply> {
  constructor(data: MedicalSupply[] = allMedicalSuppliesData) {
    super(data);
  }

  /** Sort by purchase price ascending or descending. */
  sortByPrice(order: 'asc' | 'desc' = 'asc'): MedicalSupplyQuery {
    return new MedicalSupplyQuery(
      [...this.data].sort((a, b) => (order === 'asc' ? a.price - b.price : b.price - a.price)),
    );
  }

  /** Sort by name alphabetically. */
  sortByName(order: 'asc' | 'desc' = 'asc'): MedicalSupplyQuery {
    return new MedicalSupplyQuery(
      [...this.data].sort((a, b) => {
        const cmp = a.name.localeCompare(b.name);
        return order === 'asc' ? cmp : -cmp;
      }),
    );
  }
}

/** Returns a MedicalSupplyQuery for all items sold at Harvey's Clinic. Pass `source` to wrap a pre-filtered array. */
export function medicalSupplies(
  source: MedicalSupply[] = allMedicalSuppliesData,
): MedicalSupplyQuery {
  return new MedicalSupplyQuery(source);
}
