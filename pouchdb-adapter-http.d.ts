/// <reference path="pouchdb-core.d.ts" types="pouchdb-core" />

declare namespace PouchDB {

  namespace HttpAdapter {
    interface HttpAdapterConfiguration extends Configuration.RemoteDatabaseConfiguration {
      adapter: 'http';
    }
  }

  interface Static {
    new (name: string | void, options: HttpAdapter.HttpAdapterConfiguration): Database;
  }
}

declare module 'pouchdb-adapter-http' {
  const plugin: PouchDB.Plugin;
  export = plugin;
}
