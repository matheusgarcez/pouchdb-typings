/// <reference path="pouchdb-core.d.ts" types="pouchdb-core" />
/// <reference path="pouchdb-adapter-idb.d.ts" types="pouchdb-adapter-idb" />
/// <reference path="pouchdb-adapter-http.d.ts" types="pouchdb-adapter-http" />
/// <reference path="pouchdb-mapreduce.d.ts" types="pouchdb-mapreduce" />
/// <reference path="pouchdb-replication.d.ts" types="pouchdb-replication" />

declare module 'pouchdb-browser' {
  const PouchDb: PouchDB.Static;
  export = PouchDb;
}