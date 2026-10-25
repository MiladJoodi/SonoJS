const DB_NAME = "endpoints-v1";
const DB_VERSION = 1;

export type StoreName =
  | "collections"
  | "requests"
  | "history"
  | "environments"
  | "meta";

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === "undefined") {
      reject(new Error("IndexedDB is not available"));
      return;
    }
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains("collections")) {
        db.createObjectStore("collections", { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains("requests")) {
        const store = db.createObjectStore("requests", { keyPath: "id" });
        store.createIndex("collectionId", "collectionId", { unique: false });
      }
      if (!db.objectStoreNames.contains("history")) {
        const store = db.createObjectStore("history", { keyPath: "id" });
        store.createIndex("createdAt", "createdAt", { unique: false });
      }
      if (!db.objectStoreNames.contains("environments")) {
        db.createObjectStore("environments", { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains("meta")) {
        db.createObjectStore("meta", { keyPath: "key" });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error ?? new Error("Failed to open IndexedDB"));
  });
}

function txDone(tx: IDBTransaction): Promise<void> {
  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error ?? new Error("Transaction failed"));
    tx.onabort = () => reject(tx.error ?? new Error("Transaction aborted"));
  });
}

export async function getAll<T>(store: StoreName): Promise<T[]> {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(store, "readonly");
    const req = transaction.objectStore(store).getAll();
    req.onsuccess = () => resolve(req.result as T[]);
    req.onerror = () => reject(req.error);
  });
}

export async function getById<T>(store: StoreName, id: string): Promise<T | undefined> {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(store, "readonly");
    const req = transaction.objectStore(store).get(id);
    req.onsuccess = () => resolve(req.result as T | undefined);
    req.onerror = () => reject(req.error);
  });
}

export async function put<T>(store: StoreName, value: T): Promise<void> {
  const db = await openDb();
  const transaction = db.transaction(store, "readwrite");
  transaction.objectStore(store).put(value);
  await txDone(transaction);
}

export async function putMany<T>(store: StoreName, values: T[]): Promise<void> {
  const db = await openDb();
  const transaction = db.transaction(store, "readwrite");
  const os = transaction.objectStore(store);
  for (const v of values) os.put(v);
  await txDone(transaction);
}

export async function remove(store: StoreName, id: string): Promise<void> {
  const db = await openDb();
  const transaction = db.transaction(store, "readwrite");
  transaction.objectStore(store).delete(id);
  await txDone(transaction);
}

export async function clearStore(store: StoreName): Promise<void> {
  const db = await openDb();
  const transaction = db.transaction(store, "readwrite");
  transaction.objectStore(store).clear();
  await txDone(transaction);
}

export async function clearAllStores(): Promise<void> {
  await Promise.all([
    clearStore("collections"),
    clearStore("requests"),
    clearStore("history"),
    clearStore("environments"),
    clearStore("meta"),
  ]);
}

export async function getMeta<T>(key: string): Promise<T | undefined> {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("meta", "readonly");
    const req = transaction.objectStore("meta").get(key);
    req.onsuccess = () => {
      const row = req.result as { key: string; value: T } | undefined;
      resolve(row?.value);
    };
    req.onerror = () => reject(req.error);
  });
}

export async function setMeta<T>(key: string, value: T): Promise<void> {
  const db = await openDb();
  const transaction = db.transaction("meta", "readwrite");
  transaction.objectStore("meta").put({ key, value });
  await txDone(transaction);
}
