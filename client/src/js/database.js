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

// Add content to database
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
      content: content,
    });
    
    // confirm request
    const result = await request;
    console.log('content saved to database', result);
    return result;
  };


// Gets all the content from the database
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
  return result[result.length - 1].content;
};

// call the initialize database function
initdb();
