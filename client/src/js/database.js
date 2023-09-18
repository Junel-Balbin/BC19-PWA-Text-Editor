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

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => console.error('putDb not implemented');

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => console.error('getDb not implemented');

initdb();




/* INSTRUCTOR
export const postDb = async (name, home, cell, email)  => {
    const db = await openDB(databaseName, 1);
    const tx = db.transaction(databaseName, 'readwrite');
    const store = tx.objectStore(databaseName);
    const request = store.add({ name, home, cell, email });
    const result = await request;
    console.log('Data saved to the database', result);
};

export const getDb = async () => {
    const db = await openDB(databaseName, 1);
    const tx = db.transaction(databaseName, 'readwrite');
    const store = tx.objectStore(databaseName);
    const request = store.getAll();
    return await request;
};

initdb();
*/

/* SOLVED
const initdb = async () =>
// We are creating a new database named 'contact' which will be using version 1 of the database.
  openDB('contact', 1, {
    // Add our database schema if it has not already been initialized.
    upgrade(db) {
      if (db.objectStoreNames.contains('contact')) {
        console.log('contact database already exists');
        return;
      }
      // Create a new object store for the data and give it an key name of 'id' which needs to increment automatically.
      db.createObjectStore('contact', { keyPath: 'id', autoIncrement: true });
      console.log('contact database created');
    },
  });

// Export a function we will use to POST to the database.
export const postDb = async (name, home, cell, email)  => {
  console.log('Post to the database');

  // Create a connection to the database database and version we want to use.
  const contactDb = await openDB('contact', 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = contactDb.transaction('contact', 'readwrite');

  // Open up the desired object store.
  const store = tx.objectStore('contact');

  // Use the .add() method on the store and pass in the content.
  const request = store.add({ name: name, home_phone: home, cell_phone: cell, email: email });

  // Get confirmation of the request.
  const result = await request;
  console.log('🚀 - data saved to the database', result);
};
;

// Export a function we will use to GET to the database.
export const getDb = async () => {
  console.log('GET from the database');

  // Create a connection to the database database and version we want to use.
  const contactDb = await openDB('contact', 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = contactDb.transaction('contact', 'readonly');

  // Open up the desired object store.
  const store = tx.objectStore('contact');

  // Use the .getAll() method to get all data in the database.
  const request = store.getAll();

  // Get confirmation of the request.
  const result = await request;
  console.log('result.value', result);
  return result;
};

// Start the database.
initdb();
*/


// Template Structure and Code Snippets from Mini Project 19.