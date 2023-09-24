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
  // Open the 'jate' database with version 1.
  const jateDB = await openDB('jate', 1);
  // Start a new transaction for the 'jate' object store in readwrite mode.
  const tx = jateDB.transaction('jate', 'readwrite');
  // Get the object store from the transaction.
  const store = tx.objectStore('jate');
  // Put a new object with id: 1 and value: content into the object store.
  const request = store.put({ id: 1, value: content });
  // Wait for the put operation to complete and get the result.
  const result = await request;
  // Log the result of the put operation.
  console.log('Saved successfully to database', result);
};

// Logic for a method that gets all the content from the database.
export const getDb = async () => {
  // Open the 'jate' database with version 1.
  const jateDB = await openDB('jate', 1);
  // Start a new transaction for the 'jate' object store in readonly mode.
  const tx = jateDB.transaction('jate', 'readonly');
  // Get the object store from the transaction.
  const store = tx.objectStore('jate');
  // Get the object with id: 1 from the object store.
  const request = store.get(1);
  // Wait for the get operation to complete and get the result.
  const result =  await request;
  // Log the value of the retrieved object.
  console.log('result.value', result);
  console.log('Get Successful');
  // Return the value of the retrieved object or null if not found.
  return result?.value;
};

initdb();


// Template Structure and Code Snippets from Mini Project 19.