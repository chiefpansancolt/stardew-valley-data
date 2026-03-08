/**
 * Abstract base class providing the five standard terminal methods shared by all query builders.
 * Subclasses hold a typed data array and implement domain-specific filter and sort methods.
 */
export abstract class QueryBase<T extends { id: string; name: string }> {
  constructor(protected readonly data: T[]) {}

  /** Return all results as an array. */
  get(): T[] {
    return this.data;
  }

  /** Return the first result, or `undefined` if there are none. */
  first(): T | undefined {
    return this.data[0];
  }

  /** Find an item by its exact ID. */
  find(id: string): T | undefined {
    return this.data.find((x) => x.id === id);
  }

  /** Find an item by name (case-insensitive exact match). */
  findByName(name: string): T | undefined {
    const q = name.toLowerCase();
    return this.data.find((x) => x.name.toLowerCase() === q);
  }

  /** Return the number of results. */
  count(): number {
    return this.data.length;
  }
}
