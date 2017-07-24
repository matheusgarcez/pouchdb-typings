/// <reference path="pouchdb-core.d.ts" types="pouchdb-core" />

declare namespace PouchDB {

  namespace Replication {

    /** @todo When is this present? */
    interface ReplicationMeta {
      _replication_id: string;
      _replication_state: string;
      _replication_state_time: number;
      _replication_stats: {};
    }

    interface SyncOptions {

      /**
       * If true, starts subscribing to future changes in the source database and continue
       * replicating them.
       */
      live?: boolean;

      /**
       * If true will attempt to retry replications in the case of failure (due to being offline),
       * using a backoff algorithm that retries at longer and longer intervals until a connection is re-
       * established.
       *
       * Only applicable if options.live is also true.
       */
      retry?: boolean;

      /**
       * Reference a filter function from a design document to selectively get updates.
       *
       * To use a view function, pass _view here and provide a reference to the view function
       * in options.view. See filtered replication for details.
       */
      filter?: any;

      /**
       * Only show changes for docs with these ids (array of strings).
       */
      doc_ids?: string | string[];

      /**
       * Object containing properties that are passed to the filter function,
       * e.g. {"foo:"bar"}, where "bar" will be available in the filter function
       * as params.query.foo. To access the params, define your filter function
       * like function (doc, params) { ... }
       */
      query_param?: any;

      /**
       * Specify a view function (e.g. 'design_doc_name/view_name') to act as a filter.
       *
       * Documents counted as “passed” for a view filter if a map function emits at least one record for them.
       * Note: options.filter must be set to '_view' for this option to work.
       */
      view?: any;

      /**
       * Replicate changes after the given sequence number.
       */
      since?: any;

      /**
       * Number of documents to process at a time. Defaults to 100.
       *
       * This affects the number of docs held in memory and the number sent at a time to the target server.
       * You may need to adjust downward if targeting devices with low amounts of memory (e.g. phones)
       * or if the documents are large in size (e.g. with attachments).
       *
       * If your documents are small in size, then increasing this number will probably speed replication up.
       *
       * @default 100
       */
      batch_size?: number;

      /**
       * Number of batches to process at a time. Defaults to 10.
       *
       * This (along wtih batch_size) controls how many docs are kept in memory at a time,
       * so the maximum docs in memory at once would equal batch_size × batches_limit
       *
       * @default 10
       */
      batches_limit?: number;

      /**
       * Backoff function to be used in retry replication.
       *
       * This is a function that takes the current backoff as input (or 0 the first time)
       * and returns a new backoff in milliseconds. You can use this to tweak when and
       * how replication will try to reconnect to a remote database when the user goes offline.
       *
       * Defaults to a function that chooses a random backoff between 0 and 2 seconds
       * and doubles every time it fails to connect.
       */
      back_off_function?: any;

      include_docs?: boolean
    }

  }

  interface Replicate {
    to(remoteDB: string | Database): Core.Listener.OnEvent;
    to(remoteDB: string | Database, options: Replication.SyncOptions): Core.Listener.OnEvent;
    from(remoteDB: string | Database): Core.Listener.OnEvent;
    from(remoteDB: string | Database, options: Replication.SyncOptions): Core.Listener.OnEvent;
    (src: string | Database, target: string | Database): Database;
    (src: string | Database, target: string | Database, options: Replication.SyncOptions): Database;
  }

  export interface Database {
    replicate: Replicate;

    sync(src: string | Database, target: string): Core.Listener.OnEvent;
    sync(src: string | Database, target: string, options: Replication.SyncOptions): Core.Listener.OnEvent;
    sync(remoteDB: string | Database): Core.Listener.OnEvent;
    sync(remoteDB: string | Database, options: Replication.SyncOptions): Core.Listener.OnEvent;
  }
}

declare module 'pouchdb-replication' {
  const plugin: PouchDB.Plugin;
  export = plugin;
}
