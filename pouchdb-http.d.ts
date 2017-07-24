/// <reference path="pouchdb-core.d.ts" types="pouchdb-core" />
/// <reference path="pouchdb-adapter-http.d.ts" types="pouchdb-adapter-http" />

declare module 'pouchdb-http' {
  const PouchDb: PouchDB.Static;
  export = PouchDb;
}
