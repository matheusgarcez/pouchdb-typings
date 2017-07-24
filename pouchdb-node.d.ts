/// <reference path="pouchdb-core.d.ts" types="pouchdb-core" />
/// <reference path="pouchdb-adapter-leveldb.d.ts" types="pouchdb-adapter-leveldb" />
/// <reference path="pouchdb-adapter-http.d.ts" types="pouchdb-adapter-http" />
/// <reference path="pouchdb-mapreduce.d.ts" types="pouchdb-mapreduce" />
/// <reference path="pouchdb-replication.d.ts" types="pouchdb-replication" />

declare namespace PouchDB {
  namespace Core {
    interface DatabaseInfo {
      /** The backend *DOWN adapter being used (MemDOWN, RiakDOWN, …). */
      backend_adapter?: string;
    }
  }
}

declare module 'pouchdb-node' {
  const PouchDb: PouchDB.Static;
  export = PouchDb;
}
