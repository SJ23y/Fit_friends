import { Entity, EntityFactory, StorableEntity } from '@backend/shared-core';


export abstract class BasePostgresRepository<
  T extends Entity & StorableEntity<ReturnType<T['toPOJO']>>, P> {

    constructor(
      protected entityFactory: EntityFactory<T>
    ) {}

    protected createEntityFromDocument(document: P): T {
      return this.entityFactory.create(document as ReturnType<T['toPOJO']>);
    }
}
