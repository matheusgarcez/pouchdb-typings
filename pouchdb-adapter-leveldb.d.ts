/// <reference path="pouchdb-core.d.ts" types="pouchdb-core" />

declare namespace PouchDB {

  namespace LevelDbAdapter {
    interface LevelDbAdapterConfiguration extends Configuration.LocalDatabaseConfiguration {
      adapter: 'leveldb';
    }
  }

  interface Static {
    new (name: string | void, options: LevelDbAdapter.LevelDbAdapterConfiguration): Database;
  }
}

declare module 'pouchdb-adapter-leveldb' {
  const plugin: PouchDB.Plugin;
  export = plugin;
}
