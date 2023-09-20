import { openDB } from 'idb';

// Create a new database named 'jate' which will be using version 1 of the database.
// Add our database schema if it has not already been initialized.
// Create a new object store for the data & give it an key name of 'id' which needs to increment automatically.
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

// Logic to a method that accepts some content and adds it to the database.
export const putDb = async (content) => {
  const jateDB = await openDB('jate', 1);
  const tx = jateDB.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const request = store.put({ id: 1, value: content });
  const result = await request;
  console.log(result);
};

// Logic for a method that gets all the content from the database.
export const getDb = async () => {
  const jateDB = await openDB('jate', 1);
  const tx = jateDB.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const request = store.get(1);
  const result =  await request;
  console.log('result.value', result);
  return result?.value;
};

initdb();


// Template Structure and Code Snippets from Mini Project 19.