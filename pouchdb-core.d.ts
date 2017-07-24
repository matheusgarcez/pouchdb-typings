declare namespace PouchDB {
  namespace Core {

    interface Callback<E, R> {
      (error: E | void, result: R | void): void;
    }

    type AnyCallback = Callback<any, any>;
    type DocumentId = string | number;
    type DocumentKey = string | number;
    type RevisionId = string;
    type Availability = 'available' | 'compacted' | 'not compacted' | 'missing';
    type Attachment = string | ArrayBuffer;
    type Encodable = { [propertyName: string]: any };

    interface Error {
      reason?: string;
      name?: string;
      error?: any;
    }

    interface Debug {
      enable(opt: string): void;
      disable(): void;
    }

    interface Options {
      ajax?: Configuration.RemoteRequesterConfiguration;
    }

    interface BasicResponse {
      /** `true` if the operation was successful; `false` otherwise */
      ok: boolean;
    }

    interface Response extends BasicResponse {
      /** id of the targeted document */
      id: DocumentId;
      /** resulting revision of the targeted document */
      rev: RevisionId;
    }

    interface DatabaseInfo {
    }

    interface Revision<Content> {
      ok: Document<Content> & RevisionIdMeta;
    }

    interface RevisionInfo {
      rev: RevisionId;
      status: Availability;
    }

    interface IdMeta {
      _id: DocumentId;
    }

    interface RevisionIdMeta {
      _rev: RevisionId;
    }

    interface GetMeta {

      /**
       * Conflicting leaf revisions.
       *
       * Only present if `GetOptions.conflicts` is `true`
       */
      _conflicts?: RevisionId[];

      _rev?: RevisionId;

      /**
       * Only present if `GetOptions.revs` is `true`
       */
      _revs_info?: RevisionInfo[];

      /**
       * Only present if `GetOptions.revs_info` is `true`
       */
      _revisions?: {
        ids: RevisionId[];
        start: number;
      }
    }

    type NewDocument<Content extends Encodable> = Content;
    type Document<Content extends Encodable> = Content & IdMeta;
    type ExistingDocument<Content extends Encodable> = Document<Content> & RevisionIdMeta;

    interface AllDocsOptions extends Options {

      /**
       * Include attachment data for each document.
       *
       * Requires `include_docs` to be `true`.
       *
       * By default, attachments are Base64-encoded.
       * @see binary
       */
      attachments?: boolean;

      /**
       * Return attachments as Buffers.
       *
       * Requires `include_docs` to be `true`.
       * Requires `attachments` to be `true`.
       */
      binary?: boolean;

      /**
       * Include conflict information for each document.
       *
       * Requires `include_docs` to be `true`.
       */
      conflicts?: boolean;

      /** Reverse ordering of results. */
      descending?: boolean;

      /** Include contents for each document. */
      include_docs?: boolean;

      /** Maximum number of documents to return. */
      limit?: number;

      /**
       * Number of documents to skip before returning.
       *
       * Causes poor performance on IndexedDB and LevelDB.
       */
      skip?: number;

      /** Low end of range, or high end if `descending` is `true`. */
      startkey?: DocumentKey;

      /** High end of range, or low end if `descending` is `true`. */
      endkey?: DocumentKey;

      /** Constrains results to documents matching any of these keys. */
      keys?: DocumentId[];

      /** Constrain results to documents matching this key. */
      key?: DocumentKey;
    }

    interface AllDocsWithKeyOptions extends AllDocsOptions {

      /** Constrain results to documents matching this key. */
      key: DocumentKey;
    }

    interface AllDocsWithKeysOptions extends AllDocsOptions {

      /** Constrains results to documents matching any of these keys. */
      keys: DocumentId[];
    }

    interface AllDocsWithinRangeOptions extends AllDocsOptions {

      /** Low end of range, or high end if `descending` is `true`. */
      startkey: DocumentKey;

      /** High end of range, or low end if `descending` is `true`. */
      endkey: DocumentKey;

      /** Include any documents identified by `endkey`.
       *
       * Defaults to `true`. */
      inclusive_end?: boolean;
    }

    interface AllDocsMeta {
      _attachments?: {
        [attachmentId: string]: Attachment;
      };
    }

    interface ResponseRow<Content extends Core.Encodable> {
      /** Only present if `include_docs` was `true`. */
      doc?: Document<Content & AllDocsMeta> & Core.GetMeta;
      id: DocumentId;
      key: DocumentKey;
      /** @todo check real value */
      value: Document<Content & AllDocsMeta> & Core.GetMeta;
      // {
      //    rev?: RevisionId;
      // }
    }

    interface AllDocsResponse<Content extends Core.Encodable> {
      /** The `skip` if provided, or in CouchDB the actual offset */
      offset: number;
      total_rows: number;
      rows: ResponseRow<Content>[];
    }

    interface QueryResponse<Content extends Core.Encodable> {
      /** The `skip` if provided, or in CouchDB the actual offset */
      offset: number;
      total_rows: number;
      rows: ResponseRow<Content>[];
    }

    interface DestroyOptions extends Options {
    }

    interface GetOptions extends Options {

      /** Include list of conflicting leaf revisions. */
      conflicts?: boolean;

      /** Specific revision to fetch */
      rev?: RevisionId;

      /** Include revision history of the document. */
      revs?: boolean;

      /**
       * Include a list of revisions of the document, and their
       * availability.
       */
      revs_info?: boolean;
    }

    interface GetOpenRevisions extends Options {

      /**
       * Fetch all leaf revisions if open_revs="all" or fetch all leaf
       * revisions specified in open_revs array. Leaves will be returned
       * in the same order as specified in input array.
       */
      open_revs: 'all' | Core.RevisionId[];
    }

    /** @todo does this have any other properties? */
    interface PutOptions extends Options {
    }

    interface PostOptions extends PutOptions {
    }

    interface CompactOptions extends Core.Options {
      interval?: number;
    }

    interface QueryOptions {

      /** Reduce function, or the string name of a built-in function: '_sum', '_count', or '_stats'. Defaults to false (no reduce). */
      reduce?: ((...args: any[]) => void) | string;

      /** Include the document in each row in the doc field. */
      include_docs?: boolean;

      /** Include conflicts in the _conflicts field of a doc. */
      conflicts?: boolean;

      /** Include attachment data. */
      attachments?: boolean;

      /** Return attachment data as Blobs/Buffers, instead of as base64-encoded strings. */
      binary?: boolean

      /** Get rows with keys in a certain range (inclusive/inclusive).*/
      startkey?: string;

      /** Get rows with keys in a certain range (inclusive/inclusive).*/
      endkey?: string;

      /** Include rows having a key equal to the given options.endkey. Default: true. */
      inclusive_end?: boolean;

      /** Maximum number of rows to return. */
      limit?: number;

      /** Number of rows to skip before returning (warning: poor performance on IndexedDB/LevelDB!). */
      skip?: number;

      /** Reverse the order of the output rows. */
      descending?: string;

      /** Only return rows matching this key.*/
      key?: string | number;

      /** Array of keys to fetch in a single shot.
       * - Neither startkey nor endkey can be specified with this option.
       * - The rows are returned in the same order as the supplied keys array.
       * - The row for a deleted document will have the revision ID of the deletion, and an extra key "deleted":true in the value property.
       * - The row for a nonexistent document will just contain an "error" property with the value "not_found".
       */
      keys?: any[];

      /** rue if you want the reduce function to group results by keys, rather than returning a single result.
       Defaults to false.*/
      group?: boolean;

      /** Number of elements in a key to group by, assuming the keys are arrays. Defaults to the full length of the array.*/
      group_level?: number;

      /** options.stale: One of 'ok' or 'update_after'. Only applies to saved views. Can be one of:
       * - unspecified (default): Returns the latest results, waiting for the view to build if necessary.
       * - 'ok': Returns results immediately, even if they’re out-of-date.
       * - 'update_after': Returns results immediately, but kicks off a build afterwards.
       */
      stale?: string;
    }

    interface BulkGetDoc {

      /**
       * ID of the document to fetch.
       */
      id: string;

      /**
       * Revision of the document to fetch. If this is not specified, all available revisions are fetched.
       */
      rev: string;

      /**
       * Optional and supported by the http adapter only. Includes attachments only since specified revisions. Doesn’t includes attachments for specified revisions.
       */
      atts_since?: any;
    }

    interface BulkGetOptions {

      /** An array of id and rev pairs representing the revisions to fetch. */
      docs: BulkGetDoc[];

      /** Each returned revision body will include its revision history as a _revisions property. Default is false. */
      revs?: boolean;

      /** Include attachment data in the response. Default is false, resulting in only stubs being returned. */
      attachments?: boolean;

      /** Return attachment data as Blobs/Buffers, instead of as base64-encoded strings. Default is false. */
      binary?: boolean;
    }

    interface InfoOptions extends Options {
    }

    namespace Listener {
      interface OnChangeEvent {
        on(event: "change" | "complete" | "error", callback: (Object: Error) => void): OnEvent;
        cancel(): void;
      }
      interface OnEvent {
        on(event: "change"
             | "paused"
             | "active"
             | "denied"
             | "complete"
             | "error"
             | "destroyed", callback: (Object: any) => void): OnEvent;
        cancel(): void;
      }
    }
  }

  /**
   * Pass this to `PouchDB.plugin()`.
   */
  export type Plugin = any;

  namespace Configuration {

    interface CommonDatabaseConfiguration {

      /**
       * Database name.
       */
      name?: string;

      /**
       * Database adapter to use.
       *
       * If unspecified, PouchDB will infer this automatically, preferring
       * IndexedDB to WebSQL in browsers that support both (i.e. Chrome,
       * Opera and Android 4.4+).
       */
      adapter?: string;

      location?: string;
    }

    interface LocalDatabaseConfiguration extends CommonDatabaseConfiguration {

      /**
       * Enables auto compaction, which means compact() is called after
       * every change to the database.
       *
       * Defaults to false.
       */
      auto_compaction?: boolean;

      /**
       * How many old revisions we keep track (not a copy) of.
       */
      revs_limit?: number;
    }

    interface RemoteRequesterConfiguration {

      /**
       * Time before HTTP requests time out (in ms).
       */
      timeout?: number;

      /**
       * Appends a random string to the end of all HTTP GET requests to avoid
       * them being cached on IE. Set this to true to prevent this happening.
       */
      cache?: boolean;

      /**
       * HTTP headers to add to requests.
       */
      headers?: {
        [name: string]: string;
      }

      username?: string;
      password?: string;

      /**
       * Enables transferring cookies and HTTP Authorization information.
       *
       * Defaults to true.
       */
      withCredentials?: boolean;

      /**
       * Disables automatic creation of databases.
       */
      skip_setup?: boolean;
    }

    interface ChangesConfiguration {

      /**
       * Does "live"" changes, using CouchDB’s _longpoll_ feed if remote.
       */
      live?: boolean;

      /**
       * Include the document in each row in the doc field.
       */
      include_docs?: boolean;

      /**
       * Include conflicts in the _conflicts field of a doc.
       */
      conflicts?: boolean;

      /**
       * Include attachment data.
       */
      attachments?: boolean;

      /**
       * Return attachment data as Blobs/Buffers, instead of as base64-encoded strings.
       */
      binary?: boolean;

      /**
       * Reverse the order of the output rows.
       */
      descending?: string;

      /**
       * Start the results from the change immediately after the given sequence number.
       * You can also pass 'now' if you want only new changes (when live is true).
       */
      since?: any;

      /**
       * Maximum number of rows to return.
       */
      limit?: number;

      /**
       * Request timeout (in milliseconds).
       */
      timeout?: any;

      /**
       * For http adapter only, time in milliseconds for server to give a heartbeat to keep long connections open.
       * Defaults to 10000 (10 seconds), use false to disable the default.
       */
      heartbeat?: number | boolean;

      /**
       * Reference a filter function from a design document to selectively get updates.
       * To use a view function, pass _view here and provide a reference to the view function
       * in options.view.
       *
       * See https://pouchdb.com/api.html#filtered-changes for details.
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
       * Documents counted as “passed” for a view filter if a map function emits at least one record for them.
       *
       * Note: options.filter must be set to '_view' for this option to work.
       */
      view?: any;

      /**
       * (previously options.returnDocs):
       * Is available for non-http databases and defaults to true.
       * Passing false prevents the changes feed from keeping all the documents in memory –
       * in other words complete always has an empty results array,
       * and the change event is the only way to get the event.
       * Useful for large change sets where otherwise you would run out of memory.
       */
      return_docs?: boolean;

      /**
       * Only available for http databases, this configures how many changes to fetch at a time.
       * Increasing this can reduce the number of requests made. Default is 25.
       */
      batch_size?: number;

      /**
       * Specifies how many revisions are returned in the changes array.
       *
       * The default, 'main_only', will only return the current “winning” revision;
       * 'all_docs' will return all leaf revisions (including conflicts and deleted former conflicts).
       *
       * Most likely you won’t need this unless you’re writing a replicator.
       */
      style?: string;
    }

    interface RemoteDatabaseConfiguration extends CommonDatabaseConfiguration {
      ajax?: RemoteRequesterConfiguration;
    }

    type DatabaseConfiguration = LocalDatabaseConfiguration | RemoteDatabaseConfiguration;
    type GenericDatabaseConfiguration = LocalDatabaseConfiguration & RemoteDatabaseConfiguration;
  }

  interface Static {
    plugin(plugin: Plugin): Static;

    defaults(): Database;
    defaults(options: Configuration.DatabaseConfiguration): Database;

    debug: Core.Debug;

    new (name?: string, options?: Configuration.DatabaseConfiguration): Database;
    new <Content extends Core.Encodable>(name?: string, options?: Configuration.DatabaseConfiguration): Database;
  }

  interface Database {

    name: string;

    /** Fetch all documents matching the given key. */
    allDocs<Model>(options: Core.AllDocsWithKeyOptions
                     | Core.AllDocsWithKeysOptions
                     | Core.AllDocsWithinRangeOptions): Promise<Core.AllDocsResponse<Model>>;

    /** Fetch all documents matching any of the given keys. */
    // allDocs<Model>(options: Core.AllDocsWithKeysOptions): Promise<Core.AllDocsResponse<Model>>;

    // /** Fetch all documents matching the given key range. */
    // allDocs<Model>(options: Core.AllDocsWithinRangeOptions): Promise<Core.AllDocsResponse<Model>>;

    /** Fetch all documents. */
    allDocs<Model>(options?: Core.AllDocsOptions): Promise<Core.AllDocsResponse<Model>>;

    bulkDocs<Model>(docs: Core.Document<Model>[], options: Core.PutOptions
                      | void, callback: Core.Callback<Core.Error, Core.Response[]>): void;
    bulkDocs<Model>(docs: Core.Document<Model>[], options?: Core.PutOptions): Promise<Core.Response[]>;

    /** Compact the database */
    compact(options?: Core.CompactOptions): Promise<Core.Response>;
    compact(options: Core.CompactOptions, callback: Core.Callback<Core.Error, Core.Response>): void;

    /** Destroy the database */
    destroy(options: Core.DestroyOptions | void, callback: Core.AnyCallback): void;
    destroy(options?: Core.DestroyOptions | void): Promise<void>;

    /** Non Generic (@todo waiting typescript 2.3) */
    get(docId: Core.DocumentId, options: Core.GetOpenRevisions): Promise<Core.Revision<any>[]>;
    get(docId: Core.DocumentId, options: Core.GetOpenRevisions, callback: Core.Callback<any, Core.Revision<any>[]>): void;
    get(docId: Core.DocumentId, options: Core.GetOptions): Promise<Core.Document<any> & Core.GetMeta>;
    get(docId: Core.DocumentId, options: Core.GetOptions, callback: Core.Callback<any,
          Core.Document<any>
          & Core.RevisionIdMeta>): void;
    get(docId: Core.DocumentId, options: void, callback: Core.Callback<any,
          Core.Document<any>
          & Core.RevisionIdMeta>): void;
    get(docId: Core.DocumentId): Promise<Core.Document<any> & Core.RevisionIdMeta>;

    /** Fetch a document */
    get<Model>(docId: Core.DocumentId, options: Core.GetOpenRevisions): Promise<Core.Revision<Model>[]>;
    get<Model>(docId: Core.DocumentId, options: Core.GetOpenRevisions, callback: Core.Callback<any, Core.Revision<Model>[]>): void;
    get<Model>(docId: Core.DocumentId, options: Core.GetOptions): Promise<Core.Document<Model> & Core.GetMeta>;
    get<Model>(docId: Core.DocumentId, options: Core.GetOptions, callback: Core.Callback<any,
                 Core.Document<Model>
                 & Core.RevisionIdMeta>): void;
    get<Model>(docId: Core.DocumentId, options: void, callback: Core.Callback<any,
                 Core.Document<Model>
                 & Core.RevisionIdMeta>): void;
    get<Model>(docId: Core.DocumentId): Promise<Core.Document<Model> & Core.RevisionIdMeta>;

    /**
     * Create a new document without providing an id.
     *
     * You should prefer put() to post(), because when you post(), you are
     * missing an opportunity to use allDocs() to sort documents by _id
     * (because your _ids are random).
     *
     * @see {@link https://pouchdb.com/2014/06/17/12-pro-tips-for-better-code-with-pouchdb.html|PouchDB Pro Tips}
     */
    post<Model>(doc: Core.NewDocument<Model>, options: Core.PostOptions
                  | void, callback: Core.Callback<Core.Error, Core.Response>): void;
    post<Model>(doc: Core.NewDocument<Model>, options?: Core.PostOptions): Promise<Core.Response>;

    /**
     * Create a new document or update an existing document.
     *
     * If the document already exists, you must specify its revision _rev,
     * otherwise a conflict will occur.
     * There are some restrictions on valid property names of the documents.
     *
     * If you try to store non-JSON data (for instance Date objects) you may
     * see inconsistent results.
     */
    put<Model>(doc: Core.Document<Model>,
               id: Core.DocumentId | void,
               revision: Core.RevisionId | void,
               options: Core.PutOptions | void,
               callback: Core.Callback<Core.Error, Core.Response>): void;

    put<Model>(doc: Core.Document<Model>,
               id?: Core.DocumentId,
               revision?: Core.RevisionId,
               options?: Core.PutOptions): Promise<Core.Response>;

    /** Remove a doc from the database */
    remove<Model>(doc: Core.Document<Model>, options: Core.Options, callback: Core.Callback<Core.Error, Core.Response>): void;
    remove(docId: Core.DocumentId, revision: Core.RevisionId, options: Core.Options, callback: Core.Callback<Core.Error, Core.Response>): void;

    remove<Model>(doc: Core.Document<Model>, options?: Core.Options): Promise<Core.Response>;
    remove(docId: Core.DocumentId, revision: Core.RevisionId, options?: Core.Options): Promise<Core.Response>;

    /** Get database information */
    info(options: Core.InfoOptions | void, callback: Core.Callback<any, Core.DatabaseInfo>): void;
    info(options?: Core.InfoOptions): Promise<Core.DatabaseInfo>;

    changes(options: Configuration.ChangesConfiguration): Core.Listener.OnChangeEvent;

    /** Non Generic (@todo waiting typescript 2.3) */
    query(query: ((doc: any) => void) | string): Promise<Core.QueryResponse<any>>;
    query(query: ((doc: any) => void)
            | string, callback: (err: Error, res: Promise<Core.QueryResponse<any>>) => void): any;
    query(query: ((doc: any) => void) | string, options: Core.QueryOptions): Promise<Core.QueryResponse<any>>;
    query(query: ((doc: any) => void)
            | string, options: Core.QueryOptions, callback: (err: Error, res: Promise<Core.QueryResponse<any>>) => void): any;

    query<Model>(query: ((doc: any) => void) | string): Promise<Core.AllDocsResponse<Model>>;
    query<Model>(query: ((doc: any) => void)
                   | string, callback: (err: Error, res: Promise<Core.QueryResponse<Model>>) => void): any;
    query<Model>(query: ((doc: any) => void) | string, options: Core.QueryOptions): Promise<Core.QueryResponse<Model>>;
    query<Model>(query: ((doc: any) => void)
                   | string, options: Core.QueryOptions, callback: (err: Error, res: Promise<Core.QueryResponse<Model>>) => void): any;

    revsDiff(diff: any): Promise<any>;
    revsDiff(diff: any, callback: (err: Error, res: any) => void): void;

    bulkGet(options: Core.BulkGetOptions): Promise<any>;
    bulkGet(options: Core.BulkGetOptions, callback: (err: Error, res: any) => void): any;

    on(event: "changed"
         | "paused"
         | "active"
         | "denied"
         | "complete"
         | "error"
         | "destroyed", callback: (Object: any) => void): Database;
  }
}

declare module 'pouchdb-core' {
  const PouchDb: PouchDB.Static;
  export = PouchDb;
}

declare let PouchDB: PouchDB.Static;
