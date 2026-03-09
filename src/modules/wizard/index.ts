import { QueryBase } from '@/common/query-base';
import wizardData from '@/data/wizard.json';
import { WizardBuilding } from '@/types';

const allWizardData: WizardBuilding[] = wizardData as WizardBuilding[];

/** Query builder for the Wizard's magical constructions. All sort methods return a new WizardQuery for chaining. */
export class WizardQuery extends QueryBase<WizardBuilding> {
  constructor(data: WizardBuilding[] = allWizardData) {
    super(data);
  }

  /** Filter to buildings with no special availability condition. */
  alwaysAvailable(): WizardQuery {
    return new WizardQuery(this.data.filter((b) => b.availability === undefined));
  }

  /** Sort by build cost ascending or descending. */
  sortByCost(order: 'asc' | 'desc' = 'asc'): WizardQuery {
    return new WizardQuery(
      [...this.data].sort((a, b) =>
        order === 'asc' ? a.buildCost - b.buildCost : b.buildCost - a.buildCost,
      ),
    );
  }

  /** Sort by name alphabetically. */
  sortByName(order: 'asc' | 'desc' = 'asc'): WizardQuery {
    return new WizardQuery(
      [...this.data].sort((a, b) => {
        const cmp = a.name.localeCompare(b.name);
        return order === 'asc' ? cmp : -cmp;
      }),
    );
  }
}

/** Returns a WizardQuery for all magical constructions at the Wizard's Tower. Pass `source` to wrap a pre-filtered array. */
export function wizard(source: WizardBuilding[] = allWizardData): WizardQuery {
  return new WizardQuery(source);
}
