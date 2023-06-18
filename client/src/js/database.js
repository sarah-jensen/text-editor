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
export const putDb = async (content) => {
  console.error('putDb not implemented');

  //connect to correct version of the database
  const contactDb = await openDB('jate', 1); 

  //create new transaction with jate database with read-write privileges
  const tx = contactDb.transaction('jate', 'readwrite');

  //open object store
  const store = tx.objectStore('jate');

  //pass in new content
  const request = store.add(
    {
      content,
    });

  // confirm request
  const result = await request;
  console.log('content saved to database', result);
};


// TODO: Add logic for a method that gets all the content from the database
console.error('getDb not implemented');
export const getDb = async () => {
  
  //connect to database and version
  const contactDb = await openDB('jate', 1);
  
//create new transaction, specify database and privileges
const tx = contactDb.transaction('jate', 'readonly');

//open the object store
const store = tx.objectStore('jate');

//use .getAll() to get all data in the database
const request = store.getAll();

//confirm request
const result = await request;
console.log('result.value', result);l
return result;
};



//start the database
initdb();
