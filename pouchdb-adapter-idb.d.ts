/// <reference path="pouchdb-core.d.ts" types="pouchdb-core" />

declare namespace PouchDB {

  namespace Core {
    interface DatabaseInfo {
      idb_attachment_format?: 'base64' | 'binary';
    }
  }

  namespace IdbAdapter {
    interface IdbAdapterConfiguration extends Configuration.LocalDatabaseConfiguration {
      /**
       * Configures storage persistence.
       *
       * Only works in Firefox 26+.
       */
      storage?: 'persistent' | 'temporary';
      adapter: 'idb';
    }
  }

  interface Static {
    new (name: string | void, options: IdbAdapter.IdbAdapterConfiguration): Database;
  }
}

declare module 'pouchdb-adapter-idb' {
  const plugin: PouchDB.Plugin;
  export = plugin;
}
