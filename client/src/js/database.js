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
  
  //connect to correct version of the database
  const jateDb = await openDB('jate', 1); 
  
  //create new transaction with jate database with read-write privileges
  const tx = jateDb.transaction('jate', 'readwrite');
  
  //open object store
  const store = tx.objectStore('jate');
  
  //pass in new content
  const request = store.put(
    {
      content,
    });
    
    // confirm request
    const result = await request;
    console.log('content saved to database', result);
    return result;
  };


// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  
  //connect to database and version
  const jateDb = await openDB('jate', 1);
  
  //create new transaction, specify database and privileges
  const tx = jateDb.transaction('jate', 'readonly');
  
  //open the object store
  const store = tx.objectStore('jate');
  
  //use .getAll() to get all data in the database
  const request = store.getAll();
  
  //confirm request
  const result = await request;
  console.log('result.value', result);
  return result;
};

// call the initialize database function
initdb();
