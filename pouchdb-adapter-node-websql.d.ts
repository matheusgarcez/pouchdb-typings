/// <reference path="pouchdb-core.d.ts" types="pouchdb-core" />
/// <reference path="pouchdb-adapter-websql.d.ts" types="pouchdb-adapter-websql" />

declare module 'pouchdb-adapter-node-websql' {
  const plugin: PouchDB.Plugin;
  export = plugin;
}
