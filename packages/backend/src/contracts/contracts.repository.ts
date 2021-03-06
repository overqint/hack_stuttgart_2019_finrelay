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
    let foo: any = {
      _id: 'test1',
      name: 'Test Contract #1',
      conditions: [],
      accounts: [],
      actions: [
        {
          type: 'e-mail',
          data: {
            fromEmail: 'ralph.greschner.dev@gmail.com',
            toEmail: 'ralph.greschner.dev@gmail.com',
            subject: 'Test',
            text: `=Transaktion '{{$node["Start"].data.paymentReference}}' am {{$node["Start"].data.valueDate}} ÃƒÂ¼ber {{$node["Start"].data.amount}} EUR.`,
          },
        },
      ],
    };
    foo = {
      _id: 'test1',
      name: 'Test Contract #1',
      conditions: [
        { type: 'check-amount', data: { operation: 'gt', amount: 8000 } },
      ],
      accounts: [],
      actions: [
        {
          type: 'internal-transfer',
          data: {
            paymentReference: 'Gehalt',
            amount: 2000,
            usePercentage: false,
          },
        },
      ],
    };
    this._data.set(foo._id, foo);
    /*
    const foobar = {
      _id: 'bar',
      name: 'Bar!',
      conditions: [],
      actions: [],
      accounts: [],
    };
    this._data.set(foobar._id, foobar);
    */
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
  /**
   * Delete instance from hashmap.
   * @param instance Instance to  delete.
   */
  public async delete(instance_id) {
    return this._data.delete(instance_id);
  }
}
