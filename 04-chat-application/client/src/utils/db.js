import { openDB } from 'idb';
import { uid } from 'uid';

const db = (async () => {
  const initDB = async () => {
    const promiseDB = await openDB('Chat', 1, {
      upgrade(db) {
        // Create a store of objects
        if (!db.objectStoreNames.contains('conversation')) {
          const conversationSO = db.createObjectStore('conversation', {
            keyPath: 'id',
          });
          conversationSO.createIndex('date', 'date');
        }
        if (!db.objectStoreNames.contains('message')) {
          const messageSO = db.createObjectStore('message', {
            keyPath: 'id',
          });
          messageSO.createIndex('parent_id', 'parent_id');
          messageSO.createIndex('date', 'date');
        }
      },
    });
    return promiseDB;
  };
  const db = await initDB();
  return db;
})();

const ChatIDB = {
  // Checking for support
  checkIDBSupport: function () {
    if (!('indexedDB' in window)) {
      console.warn("This browser doesn't support IndexedDB.");
      return;
    }
  },

  // Read: conversationsOS
  getAllConversations: async function () {
    const promiseDB = await db;

    const result = await promiseDB
      .transaction('conversation')
      .objectStore('conversation')
      .getAll();
    return result;
  },
  // Read: messagesOS
  getMessagesByParentID: async function (activeId) {
    const promiseDB = await db;

    const result = await promiseDB
      .transaction('message')
      .store.index('parent_id')
      .getAll(IDBKeyRange.only(activeId));
    return result;
  },
  getMessageByID: async function (id) {
    const promiseDB = await db;
    return await promiseDB.transaction('message', 'readwrite').store.get(id);
  },

  // Create: conversationsOS
  initConversations: async function (data) {
    const promiseDB = await db;
    const tx = promiseDB.transaction('conversation', 'readwrite');
    await Promise.all([
      ...data.map((c) =>
        tx.store.add({
          id: c.id,
          name: c.name,
          last_updated: new Date(c.last_updated),
        })
      ),
      tx.done,
    ]);
  },
  // Create: messagesOS
  initMessages: async function (data) {
    const promiseDB = await db;
    const tx = promiseDB.transaction('message', 'readwrite');
    await Promise.all([
      ...data.map((c) => {
        return c.messages.map((m) =>
          tx.store.add({
            parent_id: c.id,
            id: m.id,
            text: m.text,
            last_updated: new Date(m.last_updated),
          })
        );
      }),
      tx.done,
    ]);
  },
  addMessage: async function ({ parent_id, text }) {
    const promiseDB = await db;
    const tx = promiseDB.transaction('message', 'readwrite');
    await tx.store.add({
      parent_id,
      id: uid(24),
      text,
      last_updated: new Date(),
    });
  },
  editMessage: async function (item) {
    const dbPromise = await db;
    const tx = dbPromise.transaction('message', 'readwrite');
    await tx.store.put(item);
    await tx.done;
  },
};

export default ChatIDB;
