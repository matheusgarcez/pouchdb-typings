/// <reference path="pouchdb-core.d.ts" types="pouchdb-core" />

declare namespace PouchDB {

  namespace MemoryAdapter {
    interface MemoryAdapterConfiguration extends Configuration.LocalDatabaseConfiguration {
      adapter: 'memory';
    }
  }

  interface Static {
    new (name: string | void, options: MemoryAdapter.MemoryAdapterConfiguration): Database;
  }
}

declare module 'pouchdb-adapter-memory' {
  const plugin: PouchDB.Plugin;
  export = plugin;
}
