/// <reference path="pouchdb-adapter-fruitdown.d.ts" types='pouchdb-adapter-fruitdown' />
/// <reference path="pouchdb-adapter-http.d.ts" types='pouchdb-adapter-http' />
/// <reference path="pouchdb-adapter-idb.d.ts" types='pouchdb-adapter-idb' />
/// <reference path="pouchdb-adapter-leveldb.d.ts" types='pouchdb-adapter-leveldb' />
/// <reference path="pouchdb-adapter-localstorage.d.ts" types='pouchdb-adapter-localstorage' />
/// <reference path="pouchdb-adapter-memory.d.ts" types='pouchdb-adapter-memory' />
/// <reference path="pouchdb-adapter-node-websql.d.ts" types='pouchdb-adapter-node-websql' />
/// <reference path="pouchdb-adapter-websql.d.ts" types='pouchdb-adapter-websql' />
/// <reference path="pouchdb-browser.d.ts" types='pouchdb-browser' />
/// <reference path="pouchdb-core.d.ts" types='pouchdb-core' />
/// <reference path="pouchdb-http.d.ts" types='pouchdb-http' />
/// <reference path="pouchdb-mapreduce.d.ts" types='pouchdb-mapreduce' />
/// <reference path="pouchdb-node.d.ts" types='pouchdb-node' />
/// <reference path="pouchdb-replication.d.ts" types='pouchdb-replication' />

declare module 'pouchdb' {
  const plugin: PouchDB.Static;
  export = plugin;
}
