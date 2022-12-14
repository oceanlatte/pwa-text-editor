import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// (X) Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('โ PUT to database');
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const request = store.put({ id: 1, content: content });

  const result = await request;
  console.log('๐result.value from DB', result)
  return result?.value;
};
  

// (X) Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('๐ซ GET ALL from the database!');
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const request = store.getAll();

  const result = await request;
  console.log('๐ result.value in GET:', result);
  return result;
};

initdb();
