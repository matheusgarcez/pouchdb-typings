/// <reference path="pouchdb-core.d.ts" types="pouchdb-core" />

declare namespace PouchDB {
  export interface Database {
    /**
     * Cleans up any stale map/reduce indexes.
     *
     * As design docs are deleted or modified, their associated index
     * files(in CouchDB) or companion databases (in local PouchDBs) continue
     * to take up space on disk. viewCleanup() removes these unnecessary
     * index files.
     */
    viewCleanup(callback: PouchDB.Core.Callback<any, void>): void;
    viewCleanup(): Promise<void>;
  }
}

declare module 'pouchdb-adapter-mapreduce' {
  const plugin: PouchDB.Plugin;
  export = plugin;
}
