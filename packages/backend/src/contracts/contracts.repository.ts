import { Injectable } from '@nestjs/common';

/**
 * Repository for Contractss.
 */
@Injectable()
export class ContractsRepository {
  /**
   * Hashmap storing data in-memory.
   */
  private _data = new Map();

  constructor() {
    const foo = {
      _id: 'foo',
      name: 'Foo!',
      conditions: [],
      actions: [],
    };

    this._data.set(foo._id, foo);
    const bar = {
      _id: 'bar',
      name: 'Bar!',
      conditions: [],
      actions: [],
    };
    this._data.set(bar._id, bar);
  }

  /**
   * Find all instances of stored data.
   */
  public async findAll() {
    return Array.from(this._data.values());
  }

  /**
   * Find single instance of data by id.
   * @param id Id of instance to find.
   */
  public async findOneById(id) {
    const instance = this._data.get(id);
    return instance;
  }

  /**
   * Store instance to hashmap.
   * @param instance Instance to store.
   */
  public async save(instance) {
    this._data.set(instance._id, instance);
  }
}
