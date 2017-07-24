/// <reference path="../pouchdb-core.d.ts" types="pouchdb-core" />

declare namespace PouchDB {

  namespace FruitDOWNAdapter {
    interface FruitDOWNAdapterConfiguration extends Configuration.LocalDatabaseConfiguration {
      adapter: 'fruitdown';
    }
  }

  interface Static {
    new (name: string | void, options: FruitDOWNAdapter.FruitDOWNAdapterConfiguration): Database;
  }
}

declare module 'pouchdb-adapter-fruitdown' {
  const plugin: PouchDB.Plugin;
  export = plugin;
}
