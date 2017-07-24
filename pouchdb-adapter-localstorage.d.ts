/// <reference path="pouchdb-core.d.ts" types="pouchdb-core" />

declare namespace PouchDB {

  namespace LocalStorageAdapter {
    interface LocalStorageAdapterConfiguration extends Configuration.LocalDatabaseConfiguration {
      adapter: 'localstorage';
    }
  }

  interface Static {
    new (name: string | void, options: LocalStorageAdapter.LocalStorageAdapterConfiguration): Database;
  }
}

declare module 'pouchdb-adapter-localstorage' {
  const plugin: PouchDB.Plugin;
  export = plugin;
}
