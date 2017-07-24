/// <reference path="pouchdb-core.d.ts" types="pouchdb-core" />

declare namespace PouchDB {

  namespace Core {
    interface DatabaseInfo {
      sqlite_plugin?: boolean;
      websql_encoding?: 'UTF-8' | 'UTF-16';
    }
  }

  namespace AdapterWebSql {
    interface Configuration extends Configuration.LocalDatabaseConfiguration {
      /**
       * Amount in MB to request for storage.
       */
      size?: number;
      adapter: 'websql';
    }
  }

  interface Static {
    new (name: string | void, options: AdapterWebSql.Configuration): Database;
  }
}

declare module 'pouchdb-adapter-websql' {
  const plugin: PouchDB.Plugin;
  export = plugin;
}
